// Firebase configuration
// Replace these values with your actual Firebase project configuration
// Get these values from: Firebase Console > Project Settings > General > Your Apps > Web App
const firebaseConfig = {
    apiKey: "AIzaSyAW34DhEC1Mp8q7YTz-BJgTYFbnxQhK2cA",
  authDomain: "custom-meal-ordering.firebaseapp.com",
  projectId: "custom-meal-ordering",
  storageBucket: "custom-meal-ordering.firebasestorage.app",
  messagingSenderId: "535402029547",
  appId: "1:535402029547:web:487c011752f07020ceb9ae"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Initialize Firestore
const db = firebase.firestore();

// Initialize Authentication
const auth = firebase.auth(); 