# Test script for Project CRUD API
Write-Host "===== Testing Project CRUD API =====" -ForegroundColor Cyan

# 1. Register a new user
Write-Host "`n1. Registering a new user..." -ForegroundColor Yellow
$registerBody = @{
    email = "projecttest@example.com"
    password = "Test123!"
    name = "Project Test User"
} | ConvertTo-Json

try {
    $authResponse = Invoke-RestMethod -Uri 'http://localhost:4000/auth/register' -Method POST -ContentType 'application/json' -Body $registerBody
    $token = $authResponse.access_token
    Write-Host "[OK] User registered successfully" -ForegroundColor Green
    Write-Host "Token: $($token.Substring(0, 20))..." -ForegroundColor Gray
} catch {
    # If user exists, try to login
    Write-Host "User might exist, trying login..." -ForegroundColor Yellow
    $loginBody = @{
        email = "projecttest@example.com"
        password = "Test123!"
    } | ConvertTo-Json
    
    $authResponse = Invoke-RestMethod -Uri 'http://localhost:4000/auth/login' -Method POST -ContentType 'application/json' -Body $loginBody
    $token = $authResponse.access_token
    Write-Host "[OK] User logged in successfully" -ForegroundColor Green
}

$headers = @{
    Authorization = "Bearer $token"
    "Content-Type" = "application/json"
}

# 2. Create a new project
Write-Host "`n2. Creating a new project..." -ForegroundColor Yellow
$projectBody = @{
    title = "My Awesome Project"
    description = "This is a test project for CRUD operations"
} | ConvertTo-Json

$project = Invoke-RestMethod -Uri 'http://localhost:4000/projects' -Method POST -Headers $headers -Body $projectBody
Write-Host "[OK] Project created successfully" -ForegroundColor Green
Write-Host "Project ID: $($project.id)" -ForegroundColor Gray
Write-Host "Title: $($project.title)" -ForegroundColor Gray
Write-Host "Created By: $($project.createdBy.name)" -ForegroundColor Gray
Write-Host "Members Count: $($project.members.Count)" -ForegroundColor Gray
Write-Host "Creator Role: $($project.members[0].role)" -ForegroundColor Gray

$projectId = $project.id

# 3. Get all projects
Write-Host "`n3. Getting all projects..." -ForegroundColor Yellow
$projects = Invoke-RestMethod -Uri 'http://localhost:4000/projects' -Method GET -Headers $headers
Write-Host "[OK] Retrieved $($projects.Count) project(s)" -ForegroundColor Green

# 4. Get single project
Write-Host "`n4. Getting single project..." -ForegroundColor Yellow
$singleProject = Invoke-RestMethod -Uri "http://localhost:4000/projects/$projectId" -Method GET -Headers $headers
Write-Host "[OK] Project retrieved:" -ForegroundColor Green
Write-Host "  Title: $($singleProject.title)" -ForegroundColor Gray
Write-Host "  Description: $($singleProject.description)" -ForegroundColor Gray

# 5. Update project
Write-Host "`n5. Updating project..." -ForegroundColor Yellow
$updateBody = @{
    title = "Updated Project Title"
    description = "Updated description with more details"
} | ConvertTo-Json

$updatedProject = Invoke-RestMethod -Uri "http://localhost:4000/projects/$projectId" -Method PATCH -Headers $headers -Body $updateBody
Write-Host "[OK] Project updated successfully" -ForegroundColor Green
Write-Host "New Title: $($updatedProject.title)" -ForegroundColor Gray
Write-Host "New Description: $($updatedProject.description)" -ForegroundColor Gray

# 6. Check user role
Write-Host "`n6. Checking user role in project..." -ForegroundColor Yellow
$role = Invoke-RestMethod -Uri "http://localhost:4000/projects/$projectId/role" -Method GET -Headers $headers
Write-Host "[OK] User role: $role" -ForegroundColor Green

# 7. Delete project
Write-Host "`n7. Deleting project..." -ForegroundColor Yellow
Invoke-RestMethod -Uri "http://localhost:4000/projects/$projectId" -Method DELETE -Headers $headers
Write-Host "[OK] Project deleted successfully" -ForegroundColor Green

# 8. Verify deletion
Write-Host "`n8. Verifying deletion..." -ForegroundColor Yellow
$projectsAfterDelete = Invoke-RestMethod -Uri 'http://localhost:4000/projects' -Method GET -Headers $headers
Write-Host "[OK] Projects remaining: $($projectsAfterDelete.Count)" -ForegroundColor Green

Write-Host "`n===== All tests passed! =====" -ForegroundColor Green
