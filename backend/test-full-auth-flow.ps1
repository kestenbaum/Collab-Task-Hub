# Full authentication flow test
# 1. Register a new user
# 2. Login with credentials
# 3. Access /auth/me with JWT token

$baseUrl = "http://localhost:4000"
$testEmail = "testuser_$(Get-Date -Format 'yyyyMMddHHmmss')@example.com"
$testPassword = "password123"
$testName = "Test User"

Write-Host "Full Authentication Flow Test" -ForegroundColor Cyan
Write-Host "==============================" -ForegroundColor Cyan
Write-Host ""

# Step 1: Register user
Write-Host "Step 1: Registering new user..." -ForegroundColor Yellow
Write-Host "  Email: $testEmail" -ForegroundColor Gray
$registerBody = @{
    email = $testEmail
    name = $testName
    password = $testPassword
} | ConvertTo-Json

try {
    $registerResponse = Invoke-RestMethod -Uri "$baseUrl/auth/register" `
        -Method Post `
        -ContentType "application/json" `
        -Body $registerBody
    
    Write-Host "Registration successful" -ForegroundColor Green
    Write-Host "  User ID: $($registerResponse.user.id)" -ForegroundColor Gray
    Write-Host "  Token received: $($registerResponse.access_token.Substring(0, 20))..." -ForegroundColor Gray
    Write-Host ""
} catch {
    Write-Host "Registration failed: $($_.Exception.Message)" -ForegroundColor Red
    Write-Host $_.ErrorDetails.Message
    exit 1
}

# Step 2: Login
Write-Host "Step 2: Logging in with credentials..." -ForegroundColor Yellow
$loginBody = @{
    email = $testEmail
    password = $testPassword
} | ConvertTo-Json

try {
    $loginResponse = Invoke-RestMethod -Uri "$baseUrl/auth/login" `
        -Method Post `
        -ContentType "application/json" `
        -Body $loginBody
    
    $token = $loginResponse.access_token
    Write-Host "Login successful" -ForegroundColor Green
    Write-Host "  Token: $($token.Substring(0, 20))..." -ForegroundColor Gray
    Write-Host ""
} catch {
    Write-Host "Login failed: $($_.Exception.Message)" -ForegroundColor Red
    Write-Host $_.ErrorDetails.Message
    exit 1
}

# Step 3: Access /auth/me
Write-Host "Step 3: Accessing GET /auth/me..." -ForegroundColor Yellow
$headers = @{
    Authorization = "Bearer $token"
}

try {
    $meResponse = Invoke-RestMethod -Uri "$baseUrl/auth/me" `
        -Method Get `
        -Headers $headers
    
    Write-Host "/auth/me successful" -ForegroundColor Green
    Write-Host ""
    Write-Host "User Data from /auth/me:" -ForegroundColor Cyan
    Write-Host ($meResponse | ConvertTo-Json -Depth 3)
    Write-Host ""
    
    # Verify data
    Write-Host "Verification:" -ForegroundColor Yellow
    
    if ($meResponse.email -eq $testEmail) {
        Write-Host "  Email matches: PASS" -ForegroundColor Green
    } else {
        Write-Host "  Email matches: FAIL" -ForegroundColor Red
    }
    
    if ($meResponse.name -eq $testName) {
        Write-Host "  Name matches: PASS" -ForegroundColor Green
    } else {
        Write-Host "  Name matches: FAIL" -ForegroundColor Red
    }
    
    if ($meResponse.PSObject.Properties.Name -contains "passwordHash") {
        Write-Host "  Password excluded: FAIL (passwordHash found in response!)" -ForegroundColor Red
    } else {
        Write-Host "  Password excluded: PASS" -ForegroundColor Green
    }
    
    if ($meResponse.PSObject.Properties.Name -contains "id") {
        Write-Host "  Has user ID: PASS" -ForegroundColor Green
    } else {
        Write-Host "  Has user ID: FAIL" -ForegroundColor Red
    }
    
    if ($meResponse.PSObject.Properties.Name -contains "createdAt") {
        Write-Host "  Has timestamps: PASS" -ForegroundColor Green
    } else {
        Write-Host "  Has timestamps: FAIL" -ForegroundColor Red
    }
    
    Write-Host ""
    Write-Host "All tests completed successfully!" -ForegroundColor Green
    
} catch {
    Write-Host "/auth/me failed: $($_.Exception.Message)" -ForegroundColor Red
    Write-Host $_.ErrorDetails.Message
    exit 1
}
