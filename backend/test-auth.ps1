# Simple PowerShell Test Script for Authentication API
$API_URL = "http://localhost:4000"

Write-Host ""
Write-Host "=== Collab Task Hub - Authentication API Test ===" -ForegroundColor Cyan
Write-Host ""

# Test 1: Register a new user
Write-Host "1. Testing User Registration..." -ForegroundColor Cyan
$registerBody = '{"email":"testuser@example.com","name":"Test User","password":"securePassword123"}'

try {
    $registerResponse = Invoke-RestMethod -Uri "$API_URL/auth/register" -Method Post -Body $registerBody -ContentType "application/json"
    Write-Host ($registerResponse | ConvertTo-Json)
    $token = $registerResponse.access_token
    Write-Host "Success: Registration successful" -ForegroundColor Green
    Write-Host ""
} 
catch {
    if ($_.Exception.Response.StatusCode -eq 409) {
        Write-Host "User already exists, proceeding to login..." -ForegroundColor Yellow
        Write-Host ""
    } 
    else {
        Write-Host "Error: Registration failed" -ForegroundColor Red
        Write-Host ($_.ErrorDetails.Message | ConvertFrom-Json | ConvertTo-Json)
        Write-Host ""
    }
}

# Test 2: Login with correct credentials
Write-Host "2. Testing Login with Correct Credentials..." -ForegroundColor Cyan
$loginBody = '{"email":"testuser@example.com","password":"securePassword123"}'

try {
    $loginResponse = Invoke-RestMethod -Uri "$API_URL/auth/login" -Method Post -Body $loginBody -ContentType "application/json"
    Write-Host ($loginResponse | ConvertTo-Json)
    $token = $loginResponse.access_token
    Write-Host "Success: Login successful" -ForegroundColor Green
    Write-Host ""
}
catch {
    Write-Host "Error: Login failed" -ForegroundColor Red
    Write-Host ($_.ErrorDetails.Message | ConvertFrom-Json | ConvertTo-Json)
    Write-Host ""
    exit 1
}

# Test 3: Login with wrong password
Write-Host "3. Testing Login with Wrong Password (should fail)..." -ForegroundColor Cyan
$wrongLoginBody = '{"email":"testuser@example.com","password":"wrongPassword"}'

try {
    $wrongResponse = Invoke-RestMethod -Uri "$API_URL/auth/login" -Method Post -Body $wrongLoginBody -ContentType "application/json"
    Write-Host "Error: Invalid password check failed" -ForegroundColor Red
    Write-Host ""
}
catch {
    if ($_.Exception.Response.StatusCode -eq 401) {
        Write-Host "Success: Invalid password rejected" -ForegroundColor Green
    }
    Write-Host ($_.ErrorDetails.Message | ConvertFrom-Json | ConvertTo-Json)
    Write-Host ""
}

# Test 4: Access protected route without token
Write-Host "4. Testing Protected Route WITHOUT Token (should fail)..." -ForegroundColor Cyan
try {
    $noTokenResponse = Invoke-RestMethod -Uri "$API_URL/protected" -Method Get
    Write-Host "Error: Protected route security check failed" -ForegroundColor Red
    Write-Host ""
}
catch {
    if ($_.Exception.Response.StatusCode -eq 401) {
        Write-Host "Success: Protected route correctly requires authentication" -ForegroundColor Green
    }
    Write-Host ($_.ErrorDetails.Message | ConvertFrom-Json | ConvertTo-Json)
    Write-Host ""
}

# Test 5: Access protected route with valid token
Write-Host "5. Testing Protected Route WITH Valid Token..." -ForegroundColor Cyan
$headers = @{
    Authorization = "Bearer $token"
}

try {
    $protectedResponse = Invoke-RestMethod -Uri "$API_URL/protected" -Method Get -Headers $headers
    Write-Host ($protectedResponse | ConvertTo-Json)
    Write-Host "Success: Protected route access successful" -ForegroundColor Green
    Write-Host ""
}
catch {
    Write-Host "Error: Protected route access failed" -ForegroundColor Red
    Write-Host ($_.ErrorDetails.Message | ConvertFrom-Json | ConvertTo-Json)
    Write-Host ""
}

Write-Host ""
Write-Host "=== All Tests Complete ===" -ForegroundColor Green
Write-Host ""
