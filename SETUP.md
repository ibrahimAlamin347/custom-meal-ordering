# Firebase Configuration Setup

## Security Setup

This project uses a secure configuration approach to keep Firebase API keys safe.

### Files Structure:
- `js/config.template.js` - Template file (safe to commit)
- `js/config.js` - Actual config file (excluded from git)
- `js/firebase-config.js` - Firebase initialization

### Setup Steps:

1. **Copy the template:**
   ```bash
   cp js/config.template.js js/config.js
   ```

2. **Edit `js/config.js` with your Firebase values:**
   ```javascript
   const config = {
       firebase: {
           apiKey: "your-actual-api-key",
           authDomain: "your-project.firebaseapp.com",
           projectId: "your-project-id",
           storageBucket: "your-project.appspot.com",
           messagingSenderId: "your-sender-id",
           appId: "your-app-id"
       },
       environment: "development",
       debug: true
   };
   ```

3. **Get your Firebase config values:**
   - Go to [Firebase Console](https://console.firebase.google.com/)
   - Select your project
   - Click the gear icon ⚙️ → Project Settings
   - Scroll to "Your apps" section
   - Click the web app icon (</>)
   - Copy the configuration object

### Security Notes:

- ✅ `js/config.js` is in `.gitignore` - won't be committed
- ✅ `js/config.template.js` is safe to commit
- ✅ API keys are not exposed in public repositories

### For Production:

1. Create different config files for different environments:
   - `js/config.development.js`
   - `js/config.production.js`

2. Use environment variables if deploying to a server:
   ```javascript
   const config = {
       firebase: {
           apiKey: process.env.FIREBASE_API_KEY,
           // ... other values
       }
   };
   ```

### Troubleshooting:

If you see "Config file not loaded" error:
1. Make sure `js/config.js` exists
2. Check that `config.js` is loaded before `firebase-config.js` in HTML
3. Verify the config object structure matches the template 