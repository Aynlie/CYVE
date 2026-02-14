# CYVE Setup Guide

Quick setup guide for the CYVE Cybersecurity Learning Platform.

## 🚀 Quick Start (5 minutes)

### Option 1: Run Next.js Application

```bash
# 1. Navigate to frontend directory
cd frontend

# 2. Install dependencies (first time only)
npm install

# 3. Start development server
npm run dev

# 4. Open in browser
# Visit: http://localhost:3001
```

### Option 2: Run Static Landing Page

```bash
# Simply open index.html in your browser
# On Windows:
start index.html

# On Mac:
open index.html

# On Linux:
xdg-open index.html
```

## 📋 System Requirements

- **Node.js**: Version 18 or higher
- **npm**: Version 9 or higher
- **Browser**: Modern browser (Chrome, Firefox, Safari, Edge)
- **OS**: Windows, macOS, or Linux

## 🔧 Installation Steps

### 1. Clone Repository

```bash
git clone https://github.com/Aynlie/CYVE-WEB-APP.git
cd CYVE-WEB-APP
```

### 2. Install Dependencies

```bash
cd frontend
npm install
```

### 3. Run Development Server

```bash
npm run dev
```

The application will start on http://localhost:3001

## 🎯 First Time Setup

### Create Your First Account

1. Open http://localhost:3001
2. Click "Sign Up" button
3. Fill in:
   - Full Name: Your name
   - Email: your@email.com
   - Password: (minimum 8 characters)
4. Click "Create Account"
5. You'll be automatically logged in!

### Test the Features

1. **Homepage**: Search for cybersecurity careers
2. **Roadmap**: Explore learning paths
3. **Calendar**: View your schedule
4. **League**: Check out Red/Blue/Purple teams
5. **Profile**: Update your information

## 🔐 Authentication

The app uses **localStorage** for authentication:
- ✅ No server setup required
- ✅ Works offline
- ✅ Data persists in browser
- ⚠️ Clearing browser data will delete accounts

## 🐛 Troubleshooting

### Port 3001 Already in Use

```bash
# Kill the process using port 3001
# Windows:
netstat -ano | findstr :3001
taskkill /PID <PID> /F

# Mac/Linux:
lsof -ti:3001 | xargs kill -9
```

### Dependencies Not Installing

```bash
# Clear npm cache
npm cache clean --force

# Delete node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

### Page Not Loading

1. Check if dev server is running
2. Clear browser cache (Ctrl+Shift+Delete)
3. Try incognito/private mode
4. Restart the dev server

## 📦 Build for Production

```bash
# Build the application
npm run build

# Start production server
npm start
```

## 🌐 Deploy to Vercel

1. Push code to GitHub
2. Go to [vercel.com](https://vercel.com)
3. Click "Import Project"
4. Select your repository
5. Configure:
   - Framework: Next.js
   - Root Directory: `frontend`
6. Click "Deploy"

## 📱 Mobile Testing

```bash
# Find your local IP
# Windows:
ipconfig

# Mac/Linux:
ifconfig

# Access from mobile device:
# http://YOUR_IP:3001
```

## 🔄 Update to Latest Version

```bash
# Pull latest changes
git pull origin main

# Reinstall dependencies
cd frontend
npm install

# Restart dev server
npm run dev
```

## 💡 Tips

- **Hot Reload**: Changes auto-refresh in development
- **Console**: Press F12 to see browser console
- **Network**: Check Network tab for API calls
- **Storage**: View localStorage in Application tab

## 📞 Need Help?

- **Issues**: https://github.com/Aynlie/CYVE-WEB-APP/issues
- **Discussions**: https://github.com/Aynlie/CYVE-WEB-APP/discussions
- **Email**: your-email@example.com

## ✅ Checklist

- [ ] Node.js installed
- [ ] Repository cloned
- [ ] Dependencies installed
- [ ] Dev server running
- [ ] Account created
- [ ] Features tested

---

**Happy Learning! 🎓🔐**
