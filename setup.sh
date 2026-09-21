#!/usr/bin/env bash
# ==============================================================================
# Raja Haqnawaz Dairy Farm - Comprehensive Setup & Recovery Script
# Cleans existing node_modules & package-lock.json across root and react-native-app,
# installs dependencies with --legacy-peer-deps, and initializes Expo cleanly.
# ==============================================================================

set -e

echo ""
echo "=================================================================="
echo "   Raja Haqnawaz Dairy Farm - Full Stack & Mobile Setup Script    "
echo "=================================================================="
echo ""

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
MOBILE_DIR="$ROOT_DIR/react-native-app"

# 1. Clean Root Directory
echo "[1/6] Cleaning root directory artifacts (node_modules, package-lock.json)..."
rm -rf "$ROOT_DIR/node_modules" "$ROOT_DIR/package-lock.json" "$ROOT_DIR/dist"
echo "      Root artifacts cleaned successfully."

# 2. Clean Mobile Directory
echo "[2/6] Cleaning mobile directory artifacts (node_modules, package-lock.json, .expo)..."
if [ -d "$MOBILE_DIR" ]; then
  rm -rf "$MOBILE_DIR/node_modules" "$MOBILE_DIR/package-lock.json" "$MOBILE_DIR/.expo"
  echo "      Mobile directory cleaned successfully."
else
  echo "      Warning: $MOBILE_DIR directory not found!"
fi

# 3. Uninstall any global deprecated expo-cli to prevent SDK version resolution bugs
echo "[3/6] Checking for legacy global expo-cli..."
npm uninstall -g expo-cli 2>/dev/null || true

# 4. Install Root Web / Server Dependencies
echo "[4/6] Installing root web application dependencies (--legacy-peer-deps)..."
cd "$ROOT_DIR"
npm install --legacy-peer-deps --no-audit

# 5. Install React Native / Expo Mobile Dependencies
echo "[5/6] Installing React Native & Expo mobile dependencies (--legacy-peer-deps)..."
if [ -d "$MOBILE_DIR" ]; then
  cd "$MOBILE_DIR"
  npm install --legacy-peer-deps --no-audit

  # Verify and validate Expo initialization
  echo "[6/6] Verifying Expo package initialization..."
  if [ -f "$MOBILE_DIR/node_modules/expo/package.json" ]; then
    EXPO_VERSION=$(node -p "require('./node_modules/expo/package.json').version")
    echo "       Expo SDK successfully initialized: v$EXPO_VERSION"
  else
    echo "       Warning: Expo package was not found in node_modules, performing fallback install..."
    npx expo install expo
  fi
fi

cd "$ROOT_DIR"

echo ""
echo "=================================================================="
echo "   SETUP COMPLETE! Environment is ready for Web & Mobile.        "
echo "=================================================================="
echo ""
echo "To run the Web application (Port 3000):"
echo "  npm run dev"
echo ""
echo "To run the Mobile application (Expo QR Code):"
echo "  cd react-native-app && npx expo start -c"
echo "  OR from root: npm run mobile"
echo "=================================================================="
echo ""
