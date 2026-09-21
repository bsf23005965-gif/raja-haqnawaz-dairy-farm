@echo off
title Raja Haqnawaz Dairy Farm - Expo Repair Utility
echo ======================================================
echo    Raja Haqnawaz Dairy Farm - Expo Repair Utility
echo ======================================================
echo.

echo [1/5] Stopping any hung Node processes...
taskkill /F /IM node.exe 2>nul

echo [2/5] Removing deprecated global expo-cli...
call npm uninstall -g expo-cli 2>nul

echo [3/5] Cleaning corrupted node_modules and cache...
if exist node_modules rmdir /s /q node_modules
if exist .expo rmdir /s /q .expo
if exist package-lock.json del /f /q package-lock.json

echo [4/5] Verifying npm cache...
call npm cache verify

echo [5/5] Installing dependencies with npm install...
echo Please wait while packages are installed...
call npm install

echo.
echo ======================================================
echo  Repair Complete! Starting Expo Metro Bundler...
echo ======================================================
echo.
call npx expo start -c
pause
