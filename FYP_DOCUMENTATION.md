# Raja Haqnawaz Dairy Farm Management & Online Selling System
## BSCS Final Year Project (FYP) — Comprehensive System Specification & Viva Guide

### 1. Project Overview & Abstract
**Raja Haqnawaz Dairy Farm Management and Online Selling System** is an enterprise-grade mobile application designed to modernize traditional livestock commerce in Pakistan. Founded upon **30+ years of pedigree breeding experience** by **Raja Haqnawaz**, the platform bridges the gap between rural dairy breeders and urban dairy entrepreneurs by providing:
- High-transparency livestock marketplace with verified milk production, pedigree lineages, and veterinary health records.
- Secure order processing and climate-controlled transport logistics across Pakistan.
- AI-powered livestock health symptom analyzer and multi-factor weighted breed recommendation engine.
- Complete farm management and administrative console for real-time inventory and customer order tracking.

---

### 2. Official Farm Profile & Verified Contacts
* **Farm Name:** Raja Haqnawaz Dairy Farm
* **Founder & Patron:** Raja Haqnawaz (30+ Years of Dairy Breeding Experience)
* **Tagline:** Healthy Animals | Quality Dairy | Better Tomorrow
* **Established:** 1994 (30+ Years of continuous livestock service in Punjab, Pakistan)
* **Official WhatsApp:** `0345 2923974`
* **Direct Phone:** `0300 6072070`
* **Physical Address:** Raja Haqnawaz Dairy Farm, Naseem Colony near Imambargah, Jauharabad, District Khushab, Punjab, Pakistan
* **Coordinates:** Latitude `32.2855`, Longitude `72.3289` (Jauharabad, District Khushab)
* **Official Social Media:**
  - Facebook: `https://facebook.com/rajahaqnawazdairyfarm`
  - TikTok: `https://tiktok.com/@rajahaqnawazdairyfarm`

---

### 3. Technology Stack (Strictly JavaScript / Non-TypeScript)
* **Core Framework:** React Native / React 19 (JavaScript ES6+, JSX)
* **State Management:** Zustand (Modular stores: `authStore`, `animalStore`, `favoriteStore`, `cartStore`, `orderStore`, `chatStore`, `adminStore`)
* **Styling & UI:** Tailwind CSS v4, Lucide React Iconography, Custom responsive device simulator
* **Backend Microservice:** Express.js (`server.js`) on Port 3000
* **AI & Intelligence Engine:** Google Gemini AI (`@google/genai`) via secure backend proxy (`/api/ai/*`)
* **Database & Cloud Architecture:** Firebase Firestore, Firebase Authentication, Firebase Storage Rules
* **Payment Simulation:** `PaymentService.js`, `MockPaymentService.js`, `StripePaymentService.js`

---

### 4. System Architecture & Component Hierarchy
```
/
├── server.js                        # Express API & Gemini AI Proxy
├── index.html                       # HTML5 App Shell with Google Typography
├── vite.config.js                   # JavaScript Vite bundler configuration
├── metadata.json                    # Application metadata and capabilities
├── firestore.rules                  # Production Firebase security rules
├── storage.rules                    # Firebase Storage security rules
├── firebase.json                    # Firebase hosting & service descriptor
├── src/
│   ├── main.jsx                     # Application root entry
│   ├── App.jsx                      # Master navigation controller
│   ├── index.css                    # Tailwind CSS stylesheet
│   ├── constants/
│   │   ├── branding.js              # Farm identity, founder photo, slogans
│   │   ├── farmContact.js           # WhatsApp 0345 2923974 & Phone 0300 6072070
│   │   └── socialLinks.js           # Facebook & TikTok channels
│   ├── services/
│   │   ├── AIService.js             # AI chat, health assessment & recommendations
│   │   ├── PaymentService.js        # Unified payment orchestrator
│   │   ├── MockPaymentService.js    # FYP Viva demo payment simulator
│   │   ├── StripePaymentService.js  # Card processing integration
│   │   ├── WhatsAppService.js       # Pre-filled deep link generator
│   │   ├── PhoneService.js          # Direct tel: telephony integration
│   │   └── firebaseConfig.js        # Firebase SDK client initializer
│   ├── stores/
│   │   ├── authStore.js             # Role-based access (Customer / Admin)
│   │   ├── animalStore.js           # 32 verified Pakistani cattle records
│   │   ├── favoriteStore.js         # User bookmarks & persistence
│   │   ├── cartStore.js             # Checkout staging & transport choices
│   │   ├── orderStore.js            # Orders & status management
│   │   ├── chatStore.js             # AI conversation logs
│   │   └── adminStore.js            # Farm profile, about & contact updates
│   ├── components/
│   │   ├── Navbar.jsx               # Header with brand crest & role switcher
│   │   ├── BottomNav.jsx            # Mobile bottom tab navigation
│   │   └── MobileDeviceWrapper.jsx  # iPhone 16 Pro shell & evaluation controls
│   └── screens/
│       ├── splash/SplashScreen.jsx            # Animated intro & 30-year counter
│       ├── home/HomeScreen.jsx                # Marketplace dashboard
│       ├── marketplace/MarketplaceScreen.jsx  # 32 cattle with search/filter/sort
│       ├── animals/AnimalDetailsScreen.jsx    # Full animal specs & WhatsApp/Buy
│       ├── checkout/CheckoutScreen.jsx        # Atomic purchase & payment demo
│       ├── orders/OrdersScreen.jsx            # Order history & status tracker
│       ├── favorites/FavoritesScreen.jsx      # Bookmarked animals with Sold badges
│       ├── about/AboutFarmScreen.jsx          # 30-year heritage story & values
│       ├── contact/ContactScreen.jsx          # Official channels & links
│       ├── maps/FarmLocationScreen.jsx        # Interactive farm coordinates
│       ├── ai/AIConsultantScreen.jsx          # Gemini AI chat, health & recommender
│       └── admin/AdminDashboardScreen.jsx     # Full inventory & order admin console
```

---

### 5. Livestock Inventory & Breeds (32 Seed Records)
The application includes 32 realistic Pakistani livestock records:
* **Sahiwal Cows:** Renowned for heat tolerance, sweet milk, and high butterfat (16 - 28 L/day).
* **Nili-Ravi Buffaloes:** Punjab’s "Black Gold" producing rich, high-cream milk (16 - 24 L/day).
* **Cholistani Cows:** Hardy desert cattle known for disease resistance and steady lactation.
* **Red Sindhi Cows:** Compact, docile, high-efficiency milch breed.
* **Holstein Friesian & Cross Breeds:** High-volume commercial producers (up to 35 L/day).
* **Stud Bulls:** Pedigree-certified breeding males.

---

### 6. AI Multi-Factor Recommendation Algorithm
The recommendation engine uses a weighted scoring heuristic combined with Gemini commentary:
$$\text{Score} = (\text{Price} \times 30\%) + (\text{Breed} \times 20\%) + (\text{Milk Yield} \times 25\%) + (\text{Age} \times 10\%) + (\text{Health} \times 10\%) + (\text{Availability} \times 5\%)$$
* **Sold Exclusion Rule:** Any animal with status `Sold` is automatically filtered out.

---

### 7. Viva Preparation & University Defense Q&A
**Q1: Why did you choose React Native / JavaScript instead of TypeScript?**
*Answer:* JavaScript provides high agility, zero compilation overhead for dynamic JSX prototypes, universal compatibility with React Native tooling, and seamless integration with web previews for viva defense.

**Q2: How does the application prevent double-selling of cattle?**
*Answer:* When a buyer completes checkout, an atomic status transition marks the animal as `Sold` in `animalStore`. The details screen immediately disables the "Buy Now" button, displays a `SOLD` banner, and the recommendation engine removes it from buyer candidate pools.

**Q3: How are sensitive API credentials protected?**
*Answer:* All Gemini AI API requests and payment credentials are encapsulated strictly within `server.js` (Express backend) and exposed only via authenticated `/api/*` endpoints. Client-side code never embeds raw API keys.
