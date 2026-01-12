#!/bin/bash

# Test /auth/me endpoint
# First login to get a token, then use it to access /auth/me

BASE_URL="http://localhost:4000"

echo -e "\033[36mTesting /auth/me endpoint...\033[0m"
echo ""

# Login first
echo -e "\033[33m1. Logging in...\033[0m"
LOGIN_RESPONSE=$(curl -s -X POST "$BASE_URL/auth/login" \
    -H "Content-Type: application/json" \
    -d '{
        "email": "test@example.com",
        "password": "password123"
    }')

# Check if login was successful
if echo "$LOGIN_RESPONSE" | grep -q "access_token"; then
    TOKEN=$(echo "$LOGIN_RESPONSE" | grep -o '"access_token":"[^"]*' | sed 's/"access_token":"//')
    echo -e "\033[32mLogin successful\033[0m"
    echo -e "\033[90mToken: ${TOKEN:0:20}...\033[0m"
    echo ""
    
    # Test /auth/me endpoint
    echo -e "\033[33m2. Testing GET /auth/me...\033[0m"
    ME_RESPONSE=$(curl -s -X GET "$BASE_URL/auth/me" \
        -H "Authorization: Bearer $TOKEN")
    
    if echo "$ME_RESPONSE" | grep -q "email"; then
        echo -e "\033[32m/auth/me successful\033[0m"
        echo ""
        echo -e "\033[36mUser Data:\033[0m"
        echo "$ME_RESPONSE" | jq '.' 2>/dev/null || echo "$ME_RESPONSE"
        echo ""
        
        # Verify password is not in response
        if echo "$ME_RESPONSE" | grep -q "passwordHash"; then
            echo -e "\033[31mERROR: Password hash found in response!\033[0m"
        else
            echo -e "\033[32mPassword hash correctly excluded from response\033[0m"
        fi
    else
        echo -e "\033[31mError accessing /auth/me\033[0m"
        echo "$ME_RESPONSE"
    fi
else
    echo -e "\033[31mLogin failed\033[0m"
    echo "$LOGIN_RESPONSE"
fi

echo ""
echo -e "\033[90mNote: Make sure you have a test user registered first:\033[0m"
echo -e "\033[90m  Email: test@example.com\033[0m"
echo -e "\033[90m  Password: password123\033[0m"
