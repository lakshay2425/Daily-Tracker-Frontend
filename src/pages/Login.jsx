import { Lock,  Shield } from 'lucide-react';
import { useGoogleAuth } from '../hooks/useGoogleAuth';

// Header Component
const Header = () => (
  <div className="absolute top-0 right-0 p-6">
    <div className="flex items-center gap-2 bg-slate-800 text-white px-4 py-2 rounded-full text-sm font-medium">
      <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
      SECURE ACCESS
    </div>
  </div>
);


// Security Notice Component
const SecurityNotice = () => (
  <div className="flex items-start gap-3 p-4 bg-blue-50 rounded-lg border border-blue-200 max-w-md mx-auto">
    <Shield className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
    <div>
      <h4 className="font-medium text-blue-900 mb-1">Security Notice</h4>
      <p className="text-blue-700 text-sm leading-relaxed">
        Only authorized Google accounts can access your activity tracker. 
        All data is encrypted and securely stored.
      </p>
    </div>
  </div>
);

// Google OAuth Button Component
const GoogleOAuthButton = ({ onClick }) => (
  <button
    onClick={onClick}
    className="w-full bg-white border border-slate-300 hover:border-slate-400 text-slate-700 font-medium py-4 px-6 rounded-xl flex items-center justify-center gap-3 transition-all duration-200 hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed group"
  >
    <svg className="w-5 h-5" viewBox="0 0 24 24">
      <path
        fill="#4285F4"
        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
      />
      <path
        fill="#34A853"
        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
      />
      <path
        fill="#FBBC05"
        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
      />
      <path
        fill="#EA4335"
        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
      />
    </svg>
          <span>Continue with Google</span>
  </button>
);


// Main Landing Page Component
const LandingPage = () => {
    const {handleGoogleLogin} = useGoogleAuth();


  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 via-blue-50 to-indigo-100 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-20 w-72 h-72 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl animate-pulse"></div>
        <div className="absolute top-40 right-20 w-72 h-72 bg-indigo-500 rounded-full mix-blend-multiply filter blur-xl animate-pulse animation-delay-2000"></div>
        <div className="absolute -bottom-32 left-1/2 transform -translate-x-1/2 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl animate-pulse animation-delay-4000"></div>
      </div>

      <Header />

      <div className="relative z-10 min-h-screen flex items-center justify-center p-6">
        <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Side - Branding and Features */}
          <div className="space-y-8">
            <div className="text-center lg:text-left">
              <h1 className="text-5xl lg:text-6xl font-bold text-slate-800 mb-4">
                Activity
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
                  Tracker
                </span>
              </h1>
              <p className="text-xl text-slate-600 leading-relaxed max-w-lg">
                Track your daily activities, build meaningful habits, and achieve your personal goals 
                with our secure and intuitive platform.
              </p>
            </div>

          </div>

          {/* Right Side - Login Card */}
          <div className="flex justify-center">
            <div className="bg-white/90 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 p-8 w-full max-w-md">
              {/* Lock Icon */}
              <div className="flex justify-center mb-6">
                <div className="w-16 h-16 bg-slate-800 rounded-2xl flex items-center justify-center">
                  <Lock className="w-8 h-8 text-white" />
                </div>
              </div>

              {/* Login Header */}
              <div className="text-center mb-8">
                <h2 className="text-2xl font-bold text-slate-800 mb-2">Secure Login</h2>
                <p className="text-slate-600">
                  Personal activity tracking via Google OAuth
                </p>
              </div>


              {/* Google OAuth Button */}
              <GoogleOAuthButton onClick={handleGoogleLogin} />

              {/* Security Notice */}
              <div className="mt-6">
                <SecurityNotice />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="absolute bottom-0 left-0 right-0 p-6">
        <div className="text-center">
          <p className="text-slate-500 text-sm">
            Activity Tracker - Personal Productivity & Habit Building Platform
          </p>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;