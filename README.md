# CYVE - Cybersecurity Learning Platform

A modern web application for cybersecurity education, featuring career path exploration, roadmaps, and learning resources.

## 🚀 Features

- **Static Landing Page**: Fast, SEO-friendly homepage with career search
- **Next.js Application**: Modern React-based web app with server-side rendering
- **localStorage Authentication**: No server required - works offline
- **Career Path Explorer**: Search and discover cybersecurity careers
- **Team Sections**: Red Team, Blue Team, and Purple Team information
- **Responsive Design**: Mobile-friendly interface

## 📁 Project Structure

```
CYVE/
├── frontend/                    # Next.js application
│   ├── src/
│   │   ├── app/                # Next.js app directory
│   │   │   ├── calendar/       # Calendar page
│   │   │   ├── contact/        # Contact/About page
│   │   │   ├── league/         # League pages (Red/Blue/Purple teams)
│   │   │   ├── login/          # Login page
│   │   │   ├── profile/        # User profile
│   │   │   ├── roadmap/        # Learning roadmap
│   │   │   ├── signup/         # Signup page
│   │   │   ├── layout.tsx      # Root layout
│   │   │   ├── page.tsx        # Homepage
│   │   │   └── globals.css     # Global styles
│   │   ├── components/         # Reusable components
│   │   │   ├── Header.tsx      # Navigation header
│   │   │   ├── Footer.tsx      # Footer component
│   │   │   └── Icons.tsx       # Icon components
│   │   ├── context/            # React context providers
│   │   │   ├── AuthContext.tsx # Authentication context
│   │   │   ├── CalendarContext.tsx
│   │   │   ├── ProfileContext.tsx
│   │   │   └── RoadmapContext.tsx
│   │   └── qpp/                # Page components
│   │       ├── login/          # Login component
│   │       └── signup/         # Signup component
│   ├── public/                 # Static assets
│   │   └── design-specs/       # Design assets
│   ├── package.json            # Dependencies
│   └── next.config.mjs         # Next.js configuration
│
├── backend/                    # PHP backend (optional - not required)
│   ├── api/                    # API endpoints
│   └── config.php              # Database configuration
│
├── design-specs/               # Design assets and tokens
│   ├── images/                 # Image assets
│   └── design-tokens.css       # Design system tokens
│
├── index.html                  # Static landing page
├── styles.css                  # Landing page styles
├── script.js                   # Landing page JavaScript
└── README.md                   # This file
```

## 🛠️ Installation & Setup

### Prerequisites
- Node.js 18+ and npm
- Git

### Quick Start

1. **Clone the repository**
   ```bash
   git clone https://github.com/Aynlie/CYVE-WEB-APP.git
   cd CYVE-WEB-APP
   ```

2. **Install dependencies**
   ```bash
   cd frontend
   npm install
   ```

3. **Run the development server**
   ```bash
   npm run dev
   ```

4. **Open the application**
   - Next.js App: http://localhost:3001
   - Static Landing Page: Open `index.html` in your browser

## 🎯 Usage

### Static Landing Page
- Open `index.html` directly in your browser
- Search for cybersecurity career paths
- Click "Log In" or "Sign Up" to access the full application

### Next.js Application
- Navigate to http://localhost:3001
- Create an account (stored in browser localStorage)
- Explore roadmaps, calendar, and team information
- All data persists in your browser

## 🔐 Authentication

The application uses **localStorage-based authentication**:
- No server or database required
- Works completely offline
- User data stored in browser
- Perfect for development and testing

**Note**: For production, consider implementing a proper backend with secure authentication.

## 🎨 Design System

The application uses a consistent design system with:
- **Primary Color**: Gold (#f5be1e)
- **Background**: Black (#000000)
- **Text**: White (#ffffff)
- **Font**: Montserrat (primary), Inter (secondary)

## 📱 Responsive Design

The application is fully responsive and works on:
- Desktop (1920px+)
- Laptop (1024px - 1920px)
- Tablet (768px - 1024px)
- Mobile (320px - 768px)

## 🚀 Deployment

### Deploy to Vercel (Recommended for Next.js)

1. Push your code to GitHub
2. Import your repository on [Vercel](https://vercel.com)
3. Configure build settings:
   - Framework: Next.js
   - Root Directory: `frontend`
   - Build Command: `npm run build`
   - Output Directory: `.next`

### Deploy Static Landing Page

Upload `index.html`, `styles.css`, `script.js`, and `design-specs/` to any static hosting:
- GitHub Pages
- Netlify
- Vercel
- AWS S3

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License.

## 👥 Authors

- **Aynlie** - [GitHub](https://github.com/Aynlie)

## 🙏 Acknowledgments

- Design inspiration from modern cybersecurity platforms
- Next.js team for the amazing framework
- React community for excellent libraries

## 📞 Support

For support, email your-email@example.com or open an issue on GitHub.

---

**Built with ❤️ for the cybersecurity community**
