# ActivityTracker Pro

A comprehensive iOS time tracking app built with React Native and Expo, designed for productivity-focused individuals who want to track time across different activities including coding, gaming, and sports.

## 🚀 Features

### Core Activities
- **Coding Projects**: Create and manage coding projects with language tracking
- **Gaming Library**: Maintain a library of games with platform and genre information
- **Sports Tracking**: Track running activities with GPS, distance, and heart rate data

### Smart Timer System
- Project/game context during active sessions
- Session notes and results tracking
- Quick start functionality for recent/favorite items
- Persistent timer state across app restarts

### Project Management
- Create, edit, and archive projects/games
- Automatic statistics calculation (total time, session count, average session length)
- Search and filter functionality
- Quick access to frequently used items

### Data & Analytics
- Comprehensive activity history
- Project and game statistics
- Time tracking insights
- Export capabilities (planned)

## 🛠 Tech Stack

- **Frontend**: React Native with Expo
- **Styling**: NativeWind (Tailwind CSS for React Native)
- **Backend**: Firebase (Firestore + Authentication)
- **Navigation**: React Navigation v6
- **Language**: TypeScript
- **Platform**: iOS-first design and optimization

## 📱 App Structure

```
ActivityTracker Pro/
├── Home (Quick start, recent activities, active timer)
├── New Activity (Start coding/gaming/running sessions)
├── Projects (Coding projects & Gaming library management)
├── History (Activity log with filtering)
└── Profile (User settings and preferences)
```

## 🔧 Installation & Setup

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn
- Expo CLI
- iOS Simulator (for iOS development)
- Firebase project

### 1. Clone the Repository
```bash
git clone <repository-url>
cd time-tracker
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Firebase Setup

1. Create a new Firebase project at [Firebase Console](https://console.firebase.google.com/)
2. Enable Authentication (Email/Password)
3. Create a Firestore database
4. Get your Firebase configuration

### 4. Environment Configuration

The project uses environment variables for Firebase configuration. A `.env` file has been created with placeholder values:

```env
FIREBASE_API_KEY=your-firebase-api-key
FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
FIREBASE_PROJECT_ID=your-project-id
FIREBASE_STORAGE_BUCKET=your-project.appspot.com
FIREBASE_MESSAGING_SENDER_ID=123456789
FIREBASE_APP_ID=your-app-id
```

Replace these placeholder values with your actual Firebase configuration.

**Test Environment Variables:**
```bash
npm run test-env
```

This will verify that all environment variables are loaded correctly.

### 5. Firebase Security Rules

Deploy the Firestore security rules from `firestore.rules`:

```bash
firebase deploy --only firestore:rules
```

### 6. Run the App

```bash
# Start the development server
npm start

# Run on iOS simulator
npm run ios

# Run on Android emulator
npm run android
```

## 📁 Project Structure

```
time-tracker/
├── .env                 # 🔑 Environment variables (Firebase config)
├── app.config.js        # 📱 Expo configuration (reads .env)
├── src/
│   ├── components/      # Reusable UI components
│   │   ├── common/      # Common components (Button, Input, Card, etc.)
│   │   ├── forms/       # Form-specific components
│   │   └── timer/       # Timer-related components
│   ├── screens/         # Screen components
│   │   ├── auth/        # Authentication screens
│   │   ├── home/        # Home screen
│   │   ├── activities/  # Activity-related screens
│   │   ├── projects/    # Project management screens
│   │   └── profile/     # Profile and settings screens
│   ├── hooks/           # Custom React hooks
│   ├── services/        # External service integrations
│   │   ├── firebase.ts  # Firebase configuration
│   │   ├── firestore.ts # Firestore service functions
│   │   └── auth.ts      # Authentication services
│   ├── navigation/      # Navigation configuration
│   ├── types/           # TypeScript type definitions
│   └── utils/           # Utility functions
├── scripts/             # Utility scripts
│   └── test-env.js      # Environment variable testing
└── firestore.rules      # Firebase security rules
```

## 🗃 Data Models

### Core Collections

#### Users
```typescript
{
  userId: string;
  email: string;
  createdAt: Timestamp;
  preferences: {
    favoriteProjects: string[];
    favoriteGames: string[];
    quickStartEnabled: boolean;
  };
}
```

#### Coding Projects
```typescript
{
  projectId: string;
  userId: string;
  name: string;
  language: string;
  description?: string;
  status: 'active' | 'paused' | 'completed';
  totalDuration: number;
  sessionCount: number;
  createdAt: Timestamp;
  updatedAt: Timestamp;
  lastUsed: Timestamp;
}
```

#### Gaming Projects
```typescript
{
  gameId: string;
  userId: string;
  name: string;
  platform?: 'PC' | 'Console' | 'Mobile';
  genre?: string;
  status: 'playing' | 'completed' | 'paused';
  totalDuration: number;
  sessionCount: number;
  createdAt: Timestamp;
  updatedAt: Timestamp;
  lastUsed: Timestamp;
}
```

#### Activities
```typescript
{
  activityId: string;
  userId: string;
  category: 'coding' | 'gaming' | 'sports';
  startTime: Timestamp;
  endTime: Timestamp;
  duration: number;
  // Category-specific fields
  projectId?: string;      // For coding
  sessionResult?: string;  // For coding
  gameId?: string;         // For gaming
  sessionNotes?: string;   // For gaming
  distance?: number;       // For sports
  pace?: number;           // For sports
  location?: Location;     // For sports
  avgHeartRate?: number;   // For sports
  maxHeartRate?: number;   // For sports
}
```

## 🎨 Design System

### Colors
- **Primary**: Blue (#3b82f6)
- **Secondary**: Green (#10b981)
- **Accent**: Amber (#f59e0b)
- **Background**: Gray shades
- **Text**: Gray-900 for primary, Gray-600 for secondary

### Components
- All components use NativeWind (Tailwind CSS) for styling
- Consistent padding, margins, and border radius
- iOS-first design patterns
- Light theme only

## 🔒 Security

- Firebase Authentication for user management
- Firestore security rules ensure data isolation
- User data is private and scoped to authenticated users
- All API calls require authentication

## 📊 Features Roadmap

### Phase 1 (MVP) ✅
- [x] User authentication
- [x] Basic project/game management
- [x] Timer functionality
- [x] Activity creation and history
- [x] Quick start functionality

### Phase 2 (Enhanced Features)
- [ ] Advanced statistics and analytics
- [ ] Data export functionality
- [ ] Push notifications for timer reminders
- [ ] Dark theme support
- [ ] Offline support

### Phase 3 (Advanced Features)
- [ ] Team collaboration features
- [ ] Integration with development tools (GitHub, VS Code)
- [ ] Advanced reporting and insights
- [ ] Goal setting and tracking
- [ ] Apple Health integration

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

If you encounter any issues or have questions:

1. Check the [Issues](../../issues) page
2. Create a new issue with detailed information
3. Include screenshots and error messages if applicable

## 🙏 Acknowledgments

- Built with [Expo](https://expo.dev/)
- UI components styled with [NativeWind](https://www.nativewind.dev/)
- Backend powered by [Firebase](https://firebase.google.com/)
- Icons from [Ionicons](https://ionic.io/ionicons)

---

Made with ❤️ for productivity enthusiasts