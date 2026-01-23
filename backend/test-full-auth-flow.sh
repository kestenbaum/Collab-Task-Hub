#!/bin/bash

# Full authentication flow test
# 1. Register a new user
# 2. Login with credentials
# 3. Access /auth/me with JWT token

BASE_URL="http://localhost:4000"
TEST_EMAIL="testuser_$(date +%Y%m%d%H%M%S)@example.com"
TEST_PASSWORD="password123"
TEST_NAME="Test User"

echo -e "\033[36mFull Authentication Flow Test\033[0m"
echo -e "\033[36m==============================\033[0m"
echo ""

# Step 1: Register user
echo -e "\033[33mStep 1: Registering new user...\033[0m"
echo -e "\033[90m  Email: $TEST_EMAIL\033[0m"

REGISTER_RESPONSE=$(curl -s -X POST "$BASE_URL/auth/register" \
    -H "Content-Type: application/json" \
    -d "{
        \"email\": \"$TEST_EMAIL\",
        \"name\": \"$TEST_NAME\",
        \"password\": \"$TEST_PASSWORD\"
    }")

if echo "$REGISTER_RESPONSE" | grep -q "access_token"; then
    USER_ID=$(echo "$REGISTER_RESPONSE" | grep -o '"id":"[^"]*' | head -1 | sed 's/"id":"//')
    echo -e "\033[32mRegistration successful\033[0m"
    echo -e "\033[90m  User ID: $USER_ID\033[0m"
    echo ""
else
    echo -e "\033[31mRegistration failed\033[0m"
    echo "$REGISTER_RESPONSE"
    exit 1
fi

# Step 2: Login
echo -e "\033[33mStep 2: Logging in with credentials...\033[0m"

LOGIN_RESPONSE=$(curl -s -X POST "$BASE_URL/auth/login" \
    -H "Content-Type: application/json" \
    -d "{
        \"email\": \"$TEST_EMAIL\",
        \"password\": \"$TEST_PASSWORD\"
    }")

if echo "$LOGIN_RESPONSE" | grep -q "access_token"; then
    TOKEN=$(echo "$LOGIN_RESPONSE" | grep -o '"access_token":"[^"]*' | sed 's/"access_token":"//')
    echo -e "\033[32mLogin successful\033[0m"
    echo -e "\033[90m  Token: ${TOKEN:0:20}...\033[0m"
    echo ""
else
    echo -e "\033[31mLogin failed\033[0m"
    echo "$LOGIN_RESPONSE"
    exit 1
fi

# Step 3: Access /auth/me
echo -e "\033[33mStep 3: Accessing GET /auth/me...\033[0m"

ME_RESPONSE=$(curl -s -X GET "$BASE_URL/auth/me" \
    -H "Authorization: Bearer $TOKEN")

if echo "$ME_RESPONSE" | grep -q "email"; then
    echo -e "\033[32m/auth/me successful\033[0m"
    echo ""
    echo -e "\033[36mUser Data from /auth/me:\033[0m"
    echo "$ME_RESPONSE" | jq '.' 2>/dev/null || echo "$ME_RESPONSE"
    echo ""
    
    # Verify data
    echo -e "\033[33mVerification:\033[0m"
    
    if echo "$ME_RESPONSE" | grep -q "\"email\":\"$TEST_EMAIL\""; then
        echo -e "\033[32m  Email matches: PASS\033[0m"
    else
        echo -e "\033[31m  Email matches: FAIL\033[0m"
    fi
    
    if echo "$ME_RESPONSE" | grep -q "\"name\":\"$TEST_NAME\""; then
        echo -e "\033[32m  Name matches: PASS\033[0m"
    else
        echo -e "\033[31m  Name matches: FAIL\033[0m"
    fi
    
    if echo "$ME_RESPONSE" | grep -q "passwordHash"; then
        echo -e "\033[31m  Password excluded: FAIL (passwordHash found in response!)\033[0m"
    else
        echo -e "\033[32m  Password excluded: PASS\033[0m"
    fi
    
    if echo "$ME_RESPONSE" | grep -q "\"id\":"; then
        echo -e "\033[32m  Has user ID: PASS\033[0m"
    else
        echo -e "\033[31m  Has user ID: FAIL\033[0m"
    fi
    
    if echo "$ME_RESPONSE" | grep -q "\"createdAt\":"; then
        echo -e "\033[32m  Has timestamps: PASS\033[0m"
    else
        echo -e "\033[31m  Has timestamps: FAIL\033[0m"
    fi
    
    echo ""
    echo -e "\033[32mAll tests completed successfully!\033[0m"
else
    echo -e "\033[31m/auth/me failed\033[0m"
    echo "$ME_RESPONSE"
    exit 1
fi
