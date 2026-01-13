# Test /auth/me endpoint
# First login to get a token, then use it to access /auth/me

$baseUrl = "http://localhost:4000"

Write-Host "Testing /auth/me endpoint..." -ForegroundColor Cyan
Write-Host ""

# Login first
Write-Host "1. Logging in..." -ForegroundColor Yellow
$loginBody = @{
    email = "test@example.com"
    password = "password123"
} | ConvertTo-Json

try {
    $loginResponse = Invoke-RestMethod -Uri "$baseUrl/auth/login" `
        -Method Post `
        -ContentType "application/json" `
        -Body $loginBody

    $token = $loginResponse.access_token
    Write-Host "Login successful" -ForegroundColor Green
    Write-Host "Token: $($token.Substring(0, 20))..." -ForegroundColor Gray
    Write-Host ""

    # Test /auth/me endpoint
    Write-Host "2. Testing GET /auth/me..." -ForegroundColor Yellow
    $headers = @{
        Authorization = "Bearer $token"
    }

    $meResponse = Invoke-RestMethod -Uri "$baseUrl/auth/me" `
        -Method Get `
        -Headers $headers

    Write-Host "/auth/me successful" -ForegroundColor Green
    Write-Host ""
    Write-Host "User Data:" -ForegroundColor Cyan
    Write-Host ($meResponse | ConvertTo-Json -Depth 3)
    Write-Host ""
    
    # Verify password is not in response
    if ($meResponse.PSObject.Properties.Name -contains "passwordHash") {
        Write-Host "ERROR: Password hash found in response!" -ForegroundColor Red
    } else {
        Write-Host "Password hash correctly excluded from response" -ForegroundColor Green
    }

} catch {
    Write-Host "Error: $($_.Exception.Message)" -ForegroundColor Red
    Write-Host ""
    Write-Host "Response:" -ForegroundColor Yellow
    Write-Host $_.ErrorDetails.Message
}

Write-Host ""
Write-Host "Note: Make sure you have a test user registered first:" -ForegroundColor Gray
Write-Host "  Email: test@example.com" -ForegroundColor Gray
Write-Host "  Password: password123" -ForegroundColor Gray
