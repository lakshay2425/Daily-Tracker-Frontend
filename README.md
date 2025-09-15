# Daily Activity Tracker - Frontend

[![React](https://img.shields.io/badge/React-18+-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite-5.0+-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
[![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-4.0+-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![Docker](https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white)](https://docker.com/)
[![ESLint](https://img.shields.io/badge/ESLint-4B3263?style=for-the-badge&logo=eslint&logoColor=white)](https://eslint.org/)

A modern, secure, and responsive frontend application for tracking daily activities and building better habits. Built with React, featuring Google OAuth authentication, cookie-based sessions, and a beautiful user interface.

## 🚀 Features

### Core Features
- **🔐 Secure Authentication**: Google OAuth 2.0 integration with cookie-based session management
- **🛡️ Protected Routes**: Route protection with authentication middleware
- **📱 Responsive Design**: Mobile-first approach with Tailwind CSS
- **⚡ Fast Performance**: Built with Vite for lightning-fast development and builds
- **🎨 Modern UI**: Clean, intuitive interface with gradient designs and smooth animations
- **🔄 Real-time Loading States**: Context-based loading management
- **📊 Activity Tracking**: Comprehensive daily activity logging and management

### Technical Features
- **Context API**: Global state management for authentication and loading states
- **Custom Hooks**: Reusable logic for Google authentication and loading states
- **Axios Integration**: HTTP client with credential support for secure API calls
- **Hot Toast Notifications**: User-friendly feedback system
- **ESLint Configuration**: Code quality and consistency enforcement
- **Docker Support**: Containerized deployment ready
- **Environment Configuration**: Flexible configuration for different environments

## 🛠️ Tech Stack

### Frontend Framework
- **React 19.1.0**: Modern React with latest features
- **React DOM 19.1.0**: DOM rendering
- **React Router DOM 7.8.2**: Client-side routing and navigation

### Build Tools & Development
- **Vite 7.0.4**: Next-generation frontend build tool
- **@vitejs/plugin-react 4.6.0**: React plugin for Vite
- **ESLint 9.30.1**: Code linting and quality assurance
- **ESLint React Plugins**: React-specific linting rules

### Styling & UI
- **Tailwind CSS 4.1.11**: Utility-first CSS framework
- **@tailwindcss/vite 4.1.11**: Tailwind integration for Vite
- **Lucide React 0.526.0**: Beautiful icon library
- **React Hot Toast 2.5.2**: Elegant toast notifications

### Authentication & HTTP
- **@react-oauth/google 0.12.2**: Google OAuth integration
- **Axios 1.11.0**: Promise-based HTTP client

### Data Visualization
- **Recharts 3.1.0**: Composable charting library for React

### Deployment
- **Docker**: Multi-stage containerization
- **Node.js 24 Alpine**: Lightweight production image

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js**: Version 18.0.0 or higher
- **npm**: Version 8.0.0 or higher (comes with Node.js)
- **Git**: For version control
- **Docker**: (Optional) For containerized deployment
- **Google Cloud Console Account**: For OAuth setup

## ⚙️ Installation & Setup

### 1. Clone the Repository

```bash
git clone <repository-url>
cd dailyTracker/frontend
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Environment Configuration

Create a `.env` file in the root directory:

```env
# Authentication Service URLs
VITE_AUTH_URL=http://localhost:5000/api

# Backend API URLs
VITE_BACKEND_URL=http://localhost:8000/api

# Google OAuth Configuration
VITE_GOOGLE_CLIENT_ID=

# Development Mode (bypasses authentication in development)
VITE_DEV_MODE=false
```

### 4. Google OAuth Setup

1. Go to the [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select an existing one
3. Enable the Google+ API
4. Create OAuth 2.0 credentials
5. Add your domains to authorized origins:
   - `http://localhost:5173` (development)
   - `https://yourdomain.com` (production)
6. Copy the Client ID to your `.env` file

### 5. Start Development Server

```bash
npm run dev
```

The application will be available at `http://localhost:5173`

## 🏗️ Project Structure

```
src/
├── components/           # Reusable UI components
│   ├── Form/            # Form-related components
│   │   ├── ActivityForm.jsx
│   │   ├── ActivityItem.jsx
│   │   ├── ActivitySection.jsx
│   │   ├── DebugPanel.jsx
│   │   ├── FormFields.jsx
│   │   ├── Header.jsx
│   │   └── StatusMessage.jsx
│   ├── LoadingScreen.jsx # Global loading component
│   ├── Navbar.jsx       # Navigation component
│   └── Spinner.jsx      # Loading spinner
├── context/             # React Context providers
│   ├── AuthContext.jsx  # Authentication state management
│   └── LoadingContext.jsx # Loading state management
├── hooks/               # Custom React hooks
│   ├── useGoogleAuth.js # Google authentication logic
│   └── useLoading.jsx   # Loading state hook
├── pages/               # Page components
│   ├── DayDetailPage.jsx
│   ├── Form.jsx
│   ├── Home.jsx
│   └── Login.jsx
├── utils/               # Utility functions
│   ├── axiosInstance.jsx      # Configured Axios instance
│   ├── renderProtectedRoute.jsx # Route protection utility
│   └── scrollToTop.jsx        # Scroll management
├── App.jsx              # Main application component
├── main.jsx            # Application entry point
└── index.css           # Global styles
```

## 🔐 Authentication Flow

The application implements a comprehensive authentication system:

### 1. Google OAuth Integration
- Uses `@react-oauth/google` for secure OAuth flow
- Implements authorization code flow for enhanced security
- Handles authentication errors and user cancellation

### 2. Session Management
- Cookie-based sessions with `withCredentials: true`
- Automatic session verification on app load
- Persistent authentication state across browser sessions

### 3. Protected Routes
- Route-level authentication checks
- Automatic redirection for unauthorized access
- Development mode bypass for testing

### Authentication Context
```jsx
const authContextValue = {
  isAuthenticated,    // Boolean authentication state
  gmail,             // User email address
  setGmail,          // Email setter
  setIsAuthenticated, // Authentication state setter
  isLoading,         // Loading state
  setIsLoading       // Loading state setter
};
```

## 🛡️ Route Protection

Routes are protected using the `RenderProtectedRoute` utility:

```jsx
<Route path="/protected" element={
  <RenderProtectedRoutes
    condition={isAuthenticated === true}
    renderPage={<ProtectedPage/>}
    errorMessage="Please login to access this page"
    devMode={import.meta.env.VITE_DEV_MODE == "true"}
    fallback="/login"
    isLoading={isLoading}
  />
}/>
```

## 📱 Responsive Design

The application features a mobile-first responsive design:

- **Mobile Navigation**: Slide-out menu with backdrop
- **Tablet Optimization**: Adapted layouts for medium screens
- **Desktop Experience**: Full navigation and optimized layouts
- **Touch-Friendly**: Large touch targets and gesture support

## 🐳 Docker Deployment

### Multi-Stage Dockerfile

The project includes a production-optimized Dockerfile:

```dockerfile
# Build stage
FROM node:24-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci --ignore-scripts
RUN npm prune --omit-dev
COPY . .
RUN npm run build

# Production stage
FROM node:24-alpine AS final
WORKDIR /app
COPY --from=builder /app/dist ./dist
RUN addgroup -S appgroup && adduser -S -G appgroup -h /home/appuser appuser
RUN chown -R appuser:appgroup /app
USER appuser
EXPOSE 3000
USER root
RUN npm install -g serve
USER appuser
CMD ["serve", "-s", "dist", "-l", "3000"]
```

### Docker Commands

Build and run with Docker:

```bash
# Build the Docker image
docker build -f Docker/Dockerfile -t daily-tracker-frontend .

# Run the container
docker run -p 3000:3000 daily-tracker-frontend
```

### Docker Compose (if applicable)
```yaml
version: '3.8'
services:
  frontend:
    build:
      context: .
      dockerfile: Docker/Dockerfile
    ports:
      - "3000:3000"
    environment:
      - NODE_ENV=production
```

## 📜 Available Scripts

| Script | Description |
|--------| ----------- |
| `npm run dev` | Start development server with hot reload |
| `npm run build` | Build the project for production |
| `npm run preview` | Preview the production build locally |
| `npm run lint` | Run ESLint to check code quality |

## 🔧 Development Guidelines

### Code Style
- ESLint configuration enforces consistent code style
- React Hooks rules for proper hook usage
- Unused variables with special naming pattern support
- Modern ES2020+ syntax support

### Component Structure
- Functional components with hooks
- Context providers for global state
- Custom hooks for reusable logic
- Utility functions for common operations

### State Management
- React Context API for global state
- Local state with useState for component-specific data
- Loading states managed through LoadingContext
- Authentication state through AuthContext

## 🚀 Production Deployment

### Environment Setup
1. Set up production environment variables
2. Configure production API endpoints
3. Set `VITE_DEV_MODE=false`
4. Update Google OAuth authorized origins

### Build Process
```bash
# Install dependencies
npm ci --only=production

# Build the application
npm run build

# The built files will be in the `dist` directory
```

### Deployment Options
- **Static Hosting**: Netlify, Vercel, GitHub Pages
- **CDN**: AWS CloudFront, Cloudflare
- **Docker**: Container orchestration platforms
- **Traditional Hosting**: Apache, Nginx

## 🔍 Troubleshooting

### Common Issues

#### Authentication Issues
- **Problem**: Google OAuth not working
- **Solution**: Check `VITE_GOOGLE_CLIENT_ID` and authorized origins

#### Build Issues
- **Problem**: Build fails with environment variable errors
- **Solution**: Ensure all required environment variables are set

#### Development Server Issues
- **Problem**: Hot reload not working
- **Solution**: Check Vite configuration and file watchers

#### Docker Issues
- **Problem**: Container fails to start
- **Solution**: Check port availability and environment variables

### Debug Mode
Set `VITE_DEV_MODE=true` to bypass authentication during development.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

### Development Standards
- Follow the existing code style
- Add appropriate comments for complex logic
- Test your changes thoroughly
- Update documentation as needed

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

For support and questions:
- Open an issue on GitHub
- Contact the development team
- Check the documentation for common solutions

## 🔮 Future Enhancements

- [ ] PWA support with offline functionality
- [ ] Advanced data visualization and analytics
- [ ] Export/Import functionality
- [ ] Multi-language support
- [ ] Dark/Light theme toggle
- [ ] Advanced filtering and search
- [ ] Social features and sharing

---

**Built with ❤️ using React, Vite, and modern web technologies**

*Last updated: September 2024*
