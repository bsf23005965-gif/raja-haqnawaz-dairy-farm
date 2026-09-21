# Windows PowerShell Repair Script for Expo Environment
# Usage: .\repair-expo.ps1

Write-Host ""
Write-Host "======================================================" -ForegroundColor Green
Write-Host "   Raja Haqnawaz Dairy Farm - Expo Repair Utility     " -ForegroundColor Cyan
Write-Host "======================================================" -ForegroundColor Green
Write-Host ""

# 1. Kill any hung node or metro processes
Write-Host "[1/6] Stopping any background Node processes..." -ForegroundColor Yellow
try {
    Stop-Process -Name "node" -Force -ErrorAction SilentlyContinue
    Write-Host "      Done." -ForegroundColor Gray
} catch {
    # Ignore
}

# 2. Uninstall legacy global expo-cli that causes the 'unable to find expo' error
Write-Host "[2/6] Uninstalling deprecated global expo-cli..." -ForegroundColor Yellow
try {
    npm uninstall -g expo-cli | Out-Null
    Write-Host "      Done." -ForegroundColor Gray
} catch {
    # Ignore
}

# 3. Remove node_modules, package-lock.json, and .expo cache
Write-Host "[3/6] Removing corrupted node_modules & cache..." -ForegroundColor Yellow
if (Test-Path "node_modules") {
    Remove-Item -Recurse -Force "node_modules" -ErrorAction SilentlyContinue
    Write-Host "      Removed node_modules" -ForegroundColor Gray
}
if (Test-Path "package-lock.json") {
    Remove-Item -Force "package-lock.json" -ErrorAction SilentlyContinue
    Write-Host "      Removed package-lock.json" -ForegroundColor Gray
}
if (Test-Path ".expo") {
    Remove-Item -Recurse -Force ".expo" -ErrorAction SilentlyContinue
    Write-Host "      Removed .expo cache" -ForegroundColor Gray
}

# 4. Clean npm cache
Write-Host "[4/6] Verifying npm cache..." -ForegroundColor Yellow
npm cache verify

# 5. Clean install dependencies
Write-Host "[5/6] Reinstalling dependencies via npm install..." -ForegroundColor Green
Write-Host "      Please wait, downloading packages..." -ForegroundColor Gray
npm install

if ($LASTEXITCODE -ne 0) {
    Write-Host "Standard install encountered an issue. Retrying with --force..." -ForegroundColor Yellow
    npm install --force
}

# 6. Start Expo with cache clearing
Write-Host ""
Write-Host "======================================================" -ForegroundColor Green
Write-Host " Environment Repaired! Starting Expo Metro Bundler... " -ForegroundColor Cyan
Write-Host "======================================================" -ForegroundColor Green
Write-Host ""

npx expo start -c
