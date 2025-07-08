// Firebase configuration
// This file now uses the config from config.js
// Make sure config.js is loaded before this file

// Check if config is available
if (typeof config === 'undefined') {
    console.error('Config file not loaded. Make sure config.js is included before firebase-config.js');
    // Fallback to hardcoded values (remove in production)
    const firebaseConfig = {
        apiKey: "AIzaSyAW34DhEC1Mp8q7YTz-BJgTYFbnxQhK2cA",
        authDomain: "custom-meal-ordering.firebaseapp.com",
        projectId: "custom-meal-ordering",
        storageBucket: "custom-meal-ordering.firebasestorage.app",
        messagingSenderId: "535402029547",
        appId: "1:535402029547:web:487c011752f07020ceb9ae"
    };
} else {
    const firebaseConfig = config.firebase;
}

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Initialize Firestore
const db = firebase.firestore();

// Initialize Authentication
const auth = firebase.auth(); 