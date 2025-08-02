# Switch Bank Mobile App

A React Native banking application built with Expo, featuring user authentication, account management, and a clean mobile interface.

## Architecture

### Frontend (React Native + Expo)
- **Framework**: React Native with Expo SDK 53
- **State Management**: Redux Toolkit with React Redux
- **Navigation**: React Navigation (Stack + Drawer)
- **Storage**: AsyncStorage for user persistence
- **UI**: Custom components with responsive design

### Backend (Node.js + Express)
- **Framework**: Express.js
- **Data**: In-memory hardcoded data (users and accounts)
- **CORS**: Enabled for cross-origin requests
- **Port**: 3000

### Project Structure
```
switch-mobile/
├── src/
│   ├── components/          # Reusable UI components
│   │   ├── AccountCard.tsx
│   │   └── DrawerContent.tsx
│   ├── navigation/          # Navigation configuration
│   │   └── AppNavigator.tsx
│   ├── screens/            # Screen components
│   │   ├── DashboardScreen.tsx
│   │   └── LoginScreen.tsx
│   ├── services/           # API services
│   │   └── api.ts
│   └── store/              # Redux store configuration
│       └── store.ts
├── backend/                # Express.js backend
│   ├── server.js
│   └── package.json
├── assets/                 # Static assets
├── App.tsx                 # Root component
└── package.json
```

## Features

- **Authentication**: Login with username/password
- **User Persistence**: Auto-login with saved credentials
- **Account Management**: View multiple bank accounts
- **Responsive UI**: Horizontal scrolling account cards
- **Navigation**: Drawer navigation with user profile
- **Cross-platform**: iOS, Android, and Web support

## Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- Expo CLI (`npm install -g @expo/cli`)
- iOS Simulator (for iOS development)
- Android Studio/Emulator (for Android development)

## Setup & Installation

### 1. Clone the Repository
```bash
git clone <repository-url>
cd switch-mobile
```

### 2. Install Dependencies

**Frontend:**
```bash
npm install
```

**Backend:**
```bash
cd backend
npm install
cd ..
```

### 3. Environment Configuration

**Important**: Before running the app, you need to configure the backend URL for your network.

#### Option 1: Edit the API configuration directly (Recommended)
Update the default URL in `src/services/api.ts` to match your computer's IP address:

```typescript
const API_BASE_URL = process.env.EXPO_PUBLIC_API_BASE_URL || 'http://YOUR_IP_ADDRESS:3000';
```

Replace `YOUR_IP_ADDRESS` with your actual IP address (e.g., `192.168.0.102`).


### 2. Start the Backend Server
```bash
cd backend
npm run dev
# or
npm start
```

The server will run on `http://localhost:3000`

### 3. Start the Mobile App
```bash
npm start
```

This will open the Expo development server and display:
- Your local IP address
- QR code for device testing
- Options to open simulators/emulators

**Testing Options:**
- **iOS Simulator**: Press `i` (requires Xcode on macOS)
- **Android Emulator**: Press `a` (requires Android Studio)
- **Physical Device**: 
  - Install Expo Go app
  - Scan QR code with camera (iOS) or Expo Go app (Android)
  - Ensure your device is on the same WiFi network

## Environment-Specific Setup

### Development on Different Platforms

| Platform | Backend URL | Notes |
|----------|-------------|-------|
| iOS Simulator | `http://localhost:3000` | Simulator shares host network |
| Android Emulator | `http://10.0.2.2:3000` or `http://localhost:3000` | Depends on emulator setup |
| Physical Device | `http://YOUR_IP:3000` | Must be on same WiFi network |
| Web Browser | `http://localhost:3000` | Runs in browser |

### Network Troubleshooting

1. **Find Your IP Address:**
   ```bash
   # The IP will be displayed when you run:
   npm start
   # Look for something like: "Metro waiting on exp://192.168.0.102:8081"
   ```

2. **Test Backend Connectivity:**
   ```bash
   # Test if backend is accessible from your device
   curl http://YOUR_IP:3000/users
   # Should return user data
   ```

3. **Firewall Issues:**
   - Ensure ports 3000 (backend) and 8081 (Metro) are not blocked
   - On Windows: Allow Node.js through Windows Firewall
   - On macOS: System Preferences → Security & Privacy → Firewall

## Available Scripts

### Frontend
- `npm start` - Start Expo development server
- `npm run android` - Start on Android
- `npm run ios` - Start on iOS
- `npm run web` - Start web version

### Backend
- `npm start` - Start production server
- `npm run dev` - Start development server with nodemon

## Test Credentials

The app comes with pre-configured test users:

| Username | Password | Name |
|----------|----------|------|
| john_doe | password123 | John Doe |
| jane_smith | password456 | Jane Smith |
| admin | admin123 | Admin User |

## API Endpoints

- `GET /users?username=X&password=Y` - User authentication
- `GET /users/:id` - Get user by ID
- `GET /accounts?userId=X` - Get user accounts

## Development Notes

### Network Configuration
- **Simulators/Emulators**: Use `localhost:3000`
- **Physical Devices**: Use your computer's IP address
- **Same WiFi Network**: Ensure device and computer are connected to same network
- **Port Configuration**: Backend (3000), Metro bundler (8081)

### State Management
- User authentication state managed with Redux
- Persistent login using AsyncStorage
- Account data fetched from backend API

### Navigation Flow
- Unauthenticated: Login Screen
- Authenticated: Drawer Navigator → Dashboard Screen

## Troubleshooting

### Common Issues

1. **Network Error / Cannot Connect to Backend**
   - Verify backend is running: `curl http://localhost:3000/users`
   - Check IP address in `.env` matches your computer's IP
   - Ensure device and computer are on same WiFi network
   - Try using `localhost` for simulators, IP address for physical devices

2. **Metro Bundle Error**
   - Clear cache: `npx expo start --clear`
   - Delete `node_modules` and reinstall: `rm -rf node_modules && npm install`

3. **iOS Build Issues**
   - Run `npx pod-install` (requires macOS)
   - Clear iOS simulator cache

4. **Android Build Issues**
   - Clean and rebuild in Android Studio
   - Try `http://10.0.2.2:3000` for Android emulator

5. **Expo Go App Issues**
   - Ensure latest version of Expo Go is installed
   - Check that QR code scanner has camera permissions

### Debug Tips
- Check Metro bundler logs for JavaScript errors
- Use React Native Debugger for state inspection
- Monitor backend console for API request logs
- Test API endpoints directly in browser: `http://YOUR_IP:3000/users`

### Quick Setup Verification
```bash
# 1. Backend running?
curl http://localhost:3000/users

# 2. Environment configured?
cat .env

# 3. Frontend starting?
npm start
```

## Future Enhancements

- Real database integration (PostgreSQL/MongoDB)
- JWT authentication
- Transaction history
- Push notifications
- Biometric authentication
- Real-time balance updates


## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly on multiple platforms
5. Submit a pull request

## License

This project is for educational purposes.




