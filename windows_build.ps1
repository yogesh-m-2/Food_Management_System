# build-and-deploy.ps1
Set-ExecutionPolicy RemoteSigned -Scope CurrentUser
# Set paths
$backendPom = "backend\Neuro-Canteen-1\pom.xml"
$backendDockerPath = "backend"
$frontendDockerPath = "frontend"

Write-Host "Starting Maven build..." -ForegroundColor Cyan
mvn -f $backendPom clean package

if ($LASTEXITCODE -ne 0) {
    Write-Host "Maven build failed. ❌" -ForegroundColor Red
    exit 1
}

npm run build --prefix $frontendDockerPath
if ($LASTEXITCODE -ne 0) {
    Write-Host "Npm build failed. ❌" -ForegroundColor Red
    exit 1
}

Write-Host "Building backend Docker image..." -ForegroundColor Cyan
docker build -t crimsonowl/neuro-canteen-backend:latest $backendDockerPath

Write-Host "Pushing backend Docker image..." -ForegroundColor Cyan
docker push crimsonowl/neuro-canteen-backend:latest

Write-Host "Building frontend Docker image..." -ForegroundColor Cyan
docker build -t crimsonowl/neuro-canteen-frontend:latest $frontendDockerPath

Write-Host "Pushing frontend Docker image..." -ForegroundColor Cyan
docker push crimsonowl/neuro-canteen-frontend:latest

Write-Host "Deployment successful! 🚀" -ForegroundColor Green
