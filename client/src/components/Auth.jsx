import { useState } from 'react';
import { useSignIn, useSignUp, useClerk, SignedIn, SignedOut } from '@clerk/clerk-react';

function Auth() {
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  const { signIn, setActive } = useSignIn();
  const { signUp } = useSignUp();
  const { openSignIn } = useClerk();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      if (isSignUp) {
        await signUp.create({
          emailAddress: email,
          password: password,
        });
        setIsSignUp(false);
        setError('Please check your email for verification link. Then sign in.');
      } else {
        const result = await signIn.create({
          identifier: email,
          password: password,
        });
        
        if (result.status === 'complete') {
          await setActive({ session: result.createdSessionId });
        }
      }
    } catch (err) {
      setError(err.errors?.[0]?.message || 'An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-6">
      <div className="max-w-4xl w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        
        {/* Left Side - Brand & Value */}
        <div className="text-center lg:text-left space-y-8">
          <div className="space-y-4">
            <div className="flex items-center justify-center lg:justify-start space-x-4">
              <div className="bg-blue-600 rounded-2xl w-16 h-16 flex items-center justify-center shadow-lg">
                <span className="text-2xl text-white">❤️</span>
              </div>
              <div>
                <h1 className="text-4xl font-bold text-gray-900">MediTrack</h1>
                <p className="text-gray-600 text-lg mt-1">Your Health Companion</p>
              </div>
            </div>
            
            <h2 className="text-3xl font-bold text-gray-900 leading-tight">
              Track Your Health<br />
              <span className="text-blue-600">With Confidence</span>
            </h2>
            
            <p className="text-gray-600 text-lg leading-relaxed">
              Monitor vital signs, manage medications, and gain valuable insights into your health journey with our secure platform.
            </p>
          </div>

          {/* Features */}
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 border border-white/60 shadow-sm">
              <div className="text-blue-600 text-lg mb-2">📊</div>
              <h3 className="font-semibold text-gray-900 text-sm">Health Metrics</h3>
              <p className="text-gray-600 text-xs mt-1">Track BP, heart rate, weight</p>
            </div>
            
            <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 border border-white/60 shadow-sm">
              <div className="text-green-600 text-lg mb-2">💊</div>
              <h3 className="font-semibold text-gray-900 text-sm">Medications</h3>
              <p className="text-gray-600 text-xs mt-1">Smart reminders & tracking</p>
            </div>
            
            <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 border border-white/60 shadow-sm">
              <div className="text-purple-600 text-lg mb-2">🔒</div>
              <h3 className="font-semibold text-gray-900 text-sm">Secure Data</h3>
              <p className="text-gray-600 text-xs mt-1">HIPAA compliant</p>
            </div>
            
            <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 border border-white/60 shadow-sm">
              <div className="text-orange-600 text-lg mb-2">📈</div>
              <h3 className="font-semibold text-gray-900 text-sm">Insights</h3>
              <p className="text-gray-600 text-xs mt-1">Trends & analytics</p>
            </div>
          </div>
        </div>

        {/* Right Side - Auth Form */}
        <SignedOut>
          <div className="bg-white rounded-3xl shadow-2xl p-8 border border-gray-100">
            {/* Form Header */}
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                {isSignUp ? 'Join MediTrack' : 'Welcome Back'}
              </h2>
              <p className="text-gray-600">
                {isSignUp ? 'Create your account' : 'Sign in to continue'}
              </p>
            </div>

            {/* Toggle */}
            <div className="bg-gray-50 rounded-2xl p-2 mb-6">
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => setIsSignUp(false)}
                  className={`py-3 px-4 rounded-xl font-semibold transition-all duration-300 ${
                    !isSignUp 
                      ? 'bg-white text-blue-600 shadow-lg border border-blue-100' 
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  Sign In
                </button>
                <button
                  onClick={() => setIsSignUp(true)}
                  className={`py-3 px-4 rounded-xl font-semibold transition-all duration-300 ${
                    isSignUp 
                      ? 'bg-white text-green-600 shadow-lg border border-green-100' 
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  Sign Up
                </button>
              </div>
            </div>

            {/* Error Message */}
            {error && (
              <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-2xl">
                <div className="flex items-center space-x-2 text-red-700">
                  <span>⚠️</span>
                  <p className="text-sm font-medium">{error}</p>
                </div>
              </div>
            )}

            {/* Custom Form */}
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <label htmlFor="email" className="block text-sm font-semibold text-gray-700">
                  Email Address
                </label>
                <div className="relative">
                  <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-4 py-4 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200 bg-gray-50/50 hover:bg-white"
                    placeholder="your.email@example.com"
                    required
                  />
                  <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                    ✉️
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <label htmlFor="password" className="block text-sm font-semibold text-gray-700">
                  Password
                </label>
                <div className="relative">
                  <input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full px-4 py-4 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200 bg-gray-50/50 hover:bg-white"
                    placeholder="Enter your password"
                    required
                    minLength="8"
                  />
                  <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                    🔒
                  </div>
                </div>
                <p className="text-xs text-gray-500 mt-2">
                  Must be at least 8 characters long
                </p>
              </div>

              {!isSignUp && (
                <div className="text-right">
                  <button
                    type="button"
                    className="text-sm text-blue-600 hover:text-blue-700 font-medium transition duration-200"
                  >
                    Forgot your password?
                  </button>
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className={`w-full py-4 px-6 rounded-2xl font-bold text-white transition duration-300 transform hover:scale-105 ${
                  loading
                    ? 'bg-gray-400 cursor-not-allowed'
                    : isSignUp
                    ? 'bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 shadow-lg hover:shadow-xl'
                    : 'bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 shadow-lg hover:shadow-xl'
                }`}
              >
                {loading ? (
                  <div className="flex items-center justify-center space-x-3">
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Processing...</span>
                  </div>
                ) : isSignUp ? (
                  'Create Account'
                ) : (
                  'Sign In to Dashboard'
                )}
              </button>
            </form>

            {/* Divider */}
            <div className="my-8 flex items-center">
              <div className="flex-1 border-t border-gray-200"></div>
              <div className="px-4 text-sm text-gray-500 font-medium">Or continue with</div>
              <div className="flex-1 border-t border-gray-200"></div>
            </div>

            {/* Social Buttons */}
            <div className="grid grid-cols-2 gap-4">
              <button
                onClick={() => openSignIn({ strategy: 'oauth_google' })}
                className="flex items-center justify-center space-x-3 py-3 px-4 border border-gray-200 rounded-2xl hover:border-blue-300 hover:bg-blue-50 transition duration-300 group"
              >
                <span className="text-lg group-hover:scale-110 transition duration-300">🔍</span>
                <span className="font-medium text-gray-700">Google</span>
              </button>
              
              <button
                onClick={() => openSignIn({ strategy: 'oauth_github' })}
                className="flex items-center justify-center space-x-3 py-3 px-4 border border-gray-200 rounded-2xl hover:border-gray-400 hover:bg-gray-50 transition duration-300 group"
              >
                <span className="text-lg group-hover:scale-110 transition duration-300">💻</span>
                <span className="font-medium text-gray-700">GitHub</span>
              </button>
            </div>

            {/* Footer */}
            <div className="mt-8 text-center">
              <p className="text-xs text-gray-500">
                {isSignUp 
                  ? 'By creating an account, you agree to our Privacy Policy and Terms of Service' 
                  : 'Your health data is protected with enterprise-grade security'
                }
              </p>
            </div>
          </div>
        </SignedOut>

        <SignedIn>
          <div className="bg-white rounded-3xl shadow-2xl p-12 text-center border border-gray-100">
            <div className="w-20 h-20 bg-gradient-to-r from-green-400 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
              <span className="text-2xl text-white">✅</span>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-3">Welcome to MediTrack!</h3>
            <p className="text-gray-600 mb-6">Taking you to your health dashboard...</p>
            <div className="flex justify-center">
              <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-200 border-t-blue-600"></div>
            </div>
          </div>
        </SignedIn>
      </div>
    </div>
  );
}

export default Auth;