// Script to test environment variable loading
// Run with: node scripts/test-env.js

console.log('🔧 Testing environment variable loading...\n')

// Load environment variables
require('dotenv').config()

console.log('Environment Variables:')
console.log('FIREBASE_API_KEY:', process.env.FIREBASE_API_KEY ? '✅ Loaded' : '❌ Missing')
console.log('FIREBASE_AUTH_DOMAIN:', process.env.FIREBASE_AUTH_DOMAIN ? '✅ Loaded' : '❌ Missing')
console.log('FIREBASE_PROJECT_ID:', process.env.FIREBASE_PROJECT_ID ? '✅ Loaded' : '❌ Missing')
console.log(
  'FIREBASE_STORAGE_BUCKET:',
  process.env.FIREBASE_STORAGE_BUCKET ? '✅ Loaded' : '❌ Missing',
)
console.log(
  'FIREBASE_MESSAGING_SENDER_ID:',
  process.env.FIREBASE_MESSAGING_SENDER_ID ? '✅ Loaded' : '❌ Missing',
)
console.log('FIREBASE_APP_ID:', process.env.FIREBASE_APP_ID ? '✅ Loaded' : '❌ Missing')

console.log('\n📝 Note: Replace placeholder values in .env with your actual Firebase configuration')

// Test app.config.js loading
try {
  const appConfig = require('../app.config.js')
  console.log('\n🎯 app.config.js test:')
  console.log(
    'Firebase API Key from config:',
    appConfig.default.expo.extra.firebaseApiKey ? '✅ Available' : '❌ Missing',
  )
} catch (error) {
  console.log('❌ Error loading app.config.js:', error.message)
}
