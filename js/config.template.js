// Configuration template for Firebase
// Copy this file to config.js and fill in your actual Firebase values
// This template can be safely committed to git

const config = {
    firebase: {
        apiKey: "YOUR_API_KEY_HERE",
        authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
        projectId: "YOUR_PROJECT_ID",
        storageBucket: "YOUR_PROJECT_ID.appspot.com",
        messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
        appId: "YOUR_APP_ID"
    },
    // Add other environment-specific settings here
    environment: "development", // or "production"
    debug: true
};

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = config;
} 