// Auto Repair & Reset Script for Expo & React Native Environment
// Works cross-platform (Windows, macOS, Linux) without PowerShell execution policy blocks.

const fs = require('fs');
const path = require('path');
const { execSync, spawn } = require('child_process');

const PROJECT_DIR = __dirname;
const NODE_MODULES = path.join(PROJECT_DIR, 'node_modules');
const PACKAGE_LOCK = path.join(PROJECT_DIR, 'package-lock.json');
const EXPO_DIR = path.join(PROJECT_DIR, '.expo');

console.log('\n======================================================');
console.log('   Raja Haqnawaz Dairy Farm - Expo Repair Utility   ');
console.log('======================================================\n');

function runCmd(cmd, description, ignoreError = true) {
  try {
    console.log(`[1/4] Running: ${description || cmd}...`);
    execSync(cmd, { cwd: PROJECT_DIR, stdio: 'inherit' });
    return true;
  } catch (err) {
    if (!ignoreError) {
      console.error(`Error during ${cmd}:`, err.message);
    }
    return false;
  }
}

// 1. Terminate any background node or metro processes on Windows
if (process.platform === 'win32') {
  console.log('[*] Checking for locked processes on Windows...');
  try {
    execSync('taskkill /F /IM node.exe /FI "WINDOWTITLE ne react-example*"', { stdio: 'ignore' });
  } catch (_) {
    // Process not found or ignore
  }
}

// 2. Remove deprecated global expo-cli if present
console.log('[*] Checking & removing deprecated global expo-cli...');
try {
  execSync('npm uninstall -g expo-cli', { stdio: 'ignore' });
} catch (_) {
  // Ignored if not installed
}

// 3. Remove node_modules, package-lock.json, and .expo
console.log('[*] Cleaning corrupted directories and locks...');

function removeDirectoryWithRetry(targetPath, maxRetries = 3) {
  if (!fs.existsSync(targetPath)) return;
  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      fs.rmSync(targetPath, { recursive: true, force: true, maxRetries: 3, retryDelay: 500 });
      console.log(`    Deleted: ${path.basename(targetPath)}`);
      return;
    } catch (err) {
      if (attempt === maxRetries) {
        console.warn(`    Warning: Could not remove ${targetPath} (${err.message}). Proceeding...`);
      } else {
        // Short pause before retry
        const end = Date.now() + 1000;
        while (Date.now() < end) {}
      }
    }
  }
}

removeDirectoryWithRetry(NODE_MODULES);
removeDirectoryWithRetry(EXPO_DIR);

if (fs.existsSync(PACKAGE_LOCK)) {
  try {
    fs.unlinkSync(PACKAGE_LOCK);
    console.log('    Deleted: package-lock.json');
  } catch (_) {}
}

// 4. Verify & clean npm cache
console.log('[*] Verifying npm cache...');
try {
  execSync('npm cache verify', { stdio: 'inherit' });
} catch (_) {}

// 5. Fresh installation of dependencies
console.log('\n[*] Reinstalling dependencies with npm install...');
console.log('    Please wait while packages download...\n');

try {
  execSync('npm install --prefer-offline --no-audit', {
    cwd: PROJECT_DIR,
    stdio: 'inherit',
  });
  console.log('\n Dependencies successfully installed!');
} catch (err) {
  console.log('\nRetrying with standard npm install...');
  try {
    execSync('npm install', { cwd: PROJECT_DIR, stdio: 'inherit' });
    console.log('\n Dependencies successfully installed!');
  } catch (retryErr) {
    console.error('\n Failed to install dependencies. Please run "npm install" manually.');
    process.exit(1);
  }
}

console.log('\n======================================================');
console.log(' Repair complete! Launching Expo Metro Bundler...');
console.log('======================================================\n');

// 6. Launch modern local Expo CLI with cleared cache
const expo = spawn('npx', ['expo', 'start', '-c'], {
  cwd: PROJECT_DIR,
  stdio: 'inherit',
  shell: true,
});

expo.on('close', (code) => {
  console.log(`Expo exited with code ${code}`);
});
