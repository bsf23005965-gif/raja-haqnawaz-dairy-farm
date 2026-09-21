# Windows PowerShell Setup Script
# Usage: .\setup.ps1

Write-Host ""
Write-Host "==================================================================" -ForegroundColor Green
Write-Host "   Raja Haqnawaz Dairy Farm - Full Stack & Mobile Setup Script    " -ForegroundColor Cyan
Write-Host "==================================================================" -ForegroundColor Green
Write-Host ""

$ROOT_DIR = Get-Location
$MOBILE_DIR = Join-Path $ROOT_DIR "react-native-app"

# 1. Terminate any hanging Node processes to prevent file locks
Write-Host "[1/6] Stopping any background Node processes..." -ForegroundColor Yellow
try {
    Stop-Process -Name "node" -Force -ErrorAction SilentlyContinue
    Write-Host "      Processes cleared." -ForegroundColor Gray
} catch {}

# 2. Clean Root Artifacts
Write-Host "[2/6] Cleaning root directory artifacts..." -ForegroundColor Yellow
Remove-Item -Recurse -Force (Join-Path $ROOT_DIR "node_modules") -ErrorAction SilentlyContinue
Remove-Item -Force (Join-Path $ROOT_DIR "package-lock.json") -ErrorAction SilentlyContinue
Remove-Item -Recurse -Force (Join-Path $ROOT_DIR "dist") -ErrorAction SilentlyContinue
Write-Host "      Root cleaned." -ForegroundColor Gray

# 3. Clean Mobile Directory Artifacts
Write-Host "[3/6] Cleaning mobile directory artifacts..." -ForegroundColor Yellow
if (Test-Path $MOBILE_DIR) {
    Remove-Item -Recurse -Force (Join-Path $MOBILE_DIR "node_modules") -ErrorAction SilentlyContinue
    Remove-Item -Force (Join-Path $MOBILE_DIR "package-lock.json") -ErrorAction SilentlyContinue
    Remove-Item -Recurse -Force (Join-Path $MOBILE_DIR ".expo") -ErrorAction SilentlyContinue
    Write-Host "      Mobile directory cleaned." -ForegroundColor Gray
}

# 4. Uninstall deprecated global expo-cli if present
Write-Host "[4/6] Checking for legacy global expo-cli..." -ForegroundColor Yellow
try {
    npm uninstall -g expo-cli | Out-Null
    Write-Host "      Checked." -ForegroundColor Gray
} catch {}

# 5. Install Root Dependencies
Write-Host "[5/6] Installing root dependencies (--legacy-peer-deps)..." -ForegroundColor Green
npm install --legacy-peer-deps --no-audit

# 6. Install Mobile Dependencies & Verify Expo
Write-Host "[6/6] Installing mobile dependencies (--legacy-peer-deps)..." -ForegroundColor Green
if (Test-Path $MOBILE_DIR) {
    Set-Location $MOBILE_DIR
    npm install --legacy-peer-deps --no-audit

    $EXPO_PKG = Join-Path $MOBILE_DIR "node_modules\expo\package.json"
    if (Test-Path $EXPO_PKG) {
        Write-Host "       Expo package initialized successfully!" -ForegroundColor Green
    } else {
        Write-Host "       Running fallback expo install..." -ForegroundColor Yellow
        npx expo install expo
    }
}

Set-Location $ROOT_DIR

Write-Host ""
Write-Host "==================================================================" -ForegroundColor Green
Write-Host "   SETUP COMPLETE! Environment is ready for Web & Mobile.        " -ForegroundColor Cyan
Write-Host "==================================================================" -ForegroundColor Green
Write-Host ""
Write-Host "To start the Mobile App (Expo QR Code):" -ForegroundColor Yellow
Write-Host "  cd react-native-app; npx expo start -c" -ForegroundColor White
Write-Host "  OR from root: npm run mobile" -ForegroundColor White
Write-Host ""
