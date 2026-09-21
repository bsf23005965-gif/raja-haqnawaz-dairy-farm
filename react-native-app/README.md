# Raja Haqnawaz Dairy Farm - React Native (Expo) Mobile App

یہ پروجیکٹ **Raja Haqnawaz Dairy Farm (نسیم کالونی نزد امام بارگاہ، جوہر آباد، ضلع خوشاب)** کی مکمل خالص **React Native (Expo)** موبائل ایپلیکیشن ہے۔

---

## 📱 شامل فیچرز اور اسکرینز (Features & Screens)

1. **App.js**:
   - نیویگیشن باٹم ٹیب بار (`Home`, `About`, `Livestock (33)`, `Contact Us`, `Location`)
   - ڈارک تھیم، اسٹیٹس بار، اور ایمرلڈ گرین برانڈنگ۔

2. **HomeScreen (`src/screens/HomeScreen.js`)**:
   - 1994 سے 30 سالہ تاریخ کا بیج
   - کوئیک ایکشنز (About, 33 Livestock, Contact, Location)
   - **About سیکشن** ہوم ایکشنز کے فوراً بعد
   - فیچرڈ جانوروں کی ہوریزونٹل اسکرولنگ
   - **Contact Us سیکشن** (سیکنڈ لاسٹ)
   - **Farm Location سیکشن** (سب سے آخر میں)

3. **LivestockScreen (`src/screens/LivestockScreen.js`)**:
   - تمام **33 جانوروں** کی لسٹ
   - سرچ بار اور فلٹر ٹیبس (Sahiwal, Nili Ravi, Cholistani, Buffalo, Cow)
   - وزن، دودھ کی پیداوار، قیمت اور واٹس ایپ پر براہ راست انکوائری

4. **AboutScreen (`src/screens/AboutScreen.js`)**:
   - راجہ حق نواز کی 30 سالہ فارمنگ ہسٹری
   - ساہیوال اور نیلی راوی نسل کی تفصیلات
   - بائیو سیکیورٹی اور ویکسینیشن انفارمیشن

5. **ContactScreen (`src/screens/ContactScreen.js`)**:
   - براہ راست کال (`0300 6072070`) اور واٹس ایپ (`0345 2923974`)
   - کسٹم میسجنگ فارم جو براہ راست واٹس ایپ پر ٹیکسٹ بھیجتا ہے

6. **LocationScreen (`src/screens/LocationScreen.js`)**:
   - نسیم کالونی، جوہر آباد، خوشاب کا پتہ
   - گوگل میپس (GPS) بٹن اور ٹرن بائی ٹرن ڈائریکشنز

---

## 🚀 اپنے کمپیوٹر یا موبائل پر چلانے کا طریقہ (How to Run)

### 1. تقاضے (Prerequisites):
- [Node.js](https://nodejs.org/) انسٹال ہو
- موبائل میں Google Play Store سے **Expo Go** ایپ انسٹال کریں

### 2. انسٹالیشن (Installation):
ٹرمینل یا VS Code میں اس ڈائریکٹری میں جائیں:
```bash
cd react-native-app
npm install
```

### 🛠️ اگر کوئی خرابی ہو یا Expo نہ ملے (Repair Utility):
اگر "unable to find expo" یا کوئی EPERM فائل لاکنگ کا مسئلہ آئے، تو آٹو ریپیئر اسکرپٹ چلائیں:
```bash
# کسی بھی آپریٹنگ سسٹم (Windows, Mac, Linux) پر:
node repair.js

# یا Windows PowerShell میں:
.\repair-expo.ps1

# یا روٹ فولڈر سے:
npm run mobile:repair
```
یہ اسکرپٹ پرانے پروسیس بند کرے گا، کیش اور کرپٹ فائلیں صاف کرے گا، تمام پیکیجز نئے سرے سے انسٹال کرے گا اور Expo خودکار طور پر لانچ کر دے گا۔

### 3. ایپ شروع کریں (Start App):
```bash
npx expo start
```

### 4. موبائل پر چلائیں:
- ٹرمینل میں ظاہر ہونے والا **QR Code** اپنے موبائل میں **Expo Go** ایپ سے اسکین کریں۔
- ایپ فوری طور پر آپ کے اصلی موبائل فون پر چل جائے گی۔

### 5. اصلی Android APK بنانا:
اگر آپ براہ راست انسٹال ہونے والی APK بنانا چاہتے ہیں:
```bash
npm install -g eas-cli
eas login
eas build -p android --profile preview
```
کچھ ہی منٹوں میں آپ کو ڈاؤنلوڈ کرنے کے لیے اصلی APK مل جائے گی!
