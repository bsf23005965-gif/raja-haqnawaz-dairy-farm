// Firebase Client Configuration for Raja Haqnawaz Dairy Farm
// Uses environment variables with fail-safe initialization for web and mobile.

export const firebaseConfig = {
  apiKey: typeof process !== 'undefined' && process.env?.FIREBASE_API_KEY ? process.env.FIREBASE_API_KEY : 'AIzaSyRH-DUMMY-API-KEY-FOR-EVALUATION',
  authDomain: typeof process !== 'undefined' && process.env?.FIREBASE_AUTH_DOMAIN ? process.env.FIREBASE_AUTH_DOMAIN : 'raja-haqnawaz-dairy.firebaseapp.com',
  projectId: typeof process !== 'undefined' && process.env?.FIREBASE_PROJECT_ID ? process.env.FIREBASE_PROJECT_ID : 'raja-haqnawaz-dairy',
  storageBucket: typeof process !== 'undefined' && process.env?.FIREBASE_STORAGE_BUCKET ? process.env.FIREBASE_STORAGE_BUCKET : 'raja-haqnawaz-dairy.appspot.com',
  messagingSenderId: typeof process !== 'undefined' && process.env?.FIREBASE_MESSAGING_SENDER_ID ? process.env.FIREBASE_MESSAGING_SENDER_ID : '1029384756',
  appId: typeof process !== 'undefined' && process.env?.FIREBASE_APP_ID ? process.env.FIREBASE_APP_ID : '1:1029384756:web:abcd1234efgh5678',
};

// Simulated Firebase Services helper
export const FirebaseService = {
  isConfigured: () => Boolean(firebaseConfig.projectId && firebaseConfig.projectId !== 'raja-haqnawaz-dairy'),
  getProjectInfo: () => ({
    projectId: firebaseConfig.projectId,
    authDomain: firebaseConfig.authDomain,
    storageBucket: firebaseConfig.storageBucket
  })
};
