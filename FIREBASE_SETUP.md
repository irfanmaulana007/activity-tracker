# Firebase Setup Guide

## 1. Create Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click "Create a project"
3. Enter project name: `activity-tracker-pro`
4. Enable Google Analytics (optional)
5. Create project

## 2. Setup Authentication

1. In Firebase Console, go to "Authentication"
2. Click "Get started"
3. Go to "Sign-in method" tab
4. Enable "Email/Password" provider
5. Save

## 3. Setup Firestore Database

1. In Firebase Console, go to "Firestore Database"
2. Click "Create database"
3. Choose "Start in test mode" (we'll secure it later)
4. Select a location close to your users
5. Done

## 4. Get Firebase Configuration

1. Go to Project Settings (gear icon)
2. Scroll down to "Your apps"
3. Click "Add app" and select Web (</>) 
4. Register app with nickname: "ActivityTracker Pro"
5. Copy the Firebase configuration object

## 5. Setup Environment Variables

Create a `.env` file in the project root with your Firebase configuration:

```bash
# Create .env file in project root
touch .env
```

Add your Firebase configuration to the `.env` file:

```env
# Firebase Configuration
FIREBASE_API_KEY=your-actual-api-key
FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
FIREBASE_PROJECT_ID=your-project-id
FIREBASE_STORAGE_BUCKET=your-project.appspot.com
FIREBASE_MESSAGING_SENDER_ID=123456789
FIREBASE_APP_ID=your-app-id
```

The app is configured to read these environment variables through `app.config.js` and consume them in `src/services/firebase.ts`.

**Important**: The project uses `app.config.js` instead of `app.json` because JSON files cannot dynamically load environment variables. JavaScript configuration files can execute code to read from `process.env`.

## 6. Deploy Security Rules

1. Install Firebase CLI: `npm install -g firebase-tools`
2. Login: `firebase login`
3. Initialize: `firebase init firestore`
4. Select your project
5. Use the existing `firestore.rules` file
6. Deploy: `firebase deploy --only firestore:rules`

## 7. Test Configuration

1. Start your app: `npm start`
2. Try to create an account
3. Check Firebase Console to see if user was created
4. Try creating a project and check Firestore data

## Security Rules Explanation

The provided `firestore.rules` file ensures:
- Users can only read/write their own data
- All operations require authentication
- Data is properly scoped to user IDs

## Troubleshooting

### Common Issues:

1. **"Firebase not initialized"**: Check if config is correct
2. **"Permission denied"**: Ensure security rules are deployed
3. **"Network error"**: Check internet connection and Firebase project status

### Debug Tips:

1. Enable Firebase debug mode in development
2. Check Firebase Console for authentication and database activity
3. Use browser dev tools to inspect network requests