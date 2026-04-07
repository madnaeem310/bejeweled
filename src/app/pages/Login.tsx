import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import { useAuth } from "../context/AuthContext";

export function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await login(email, password);
      navigate("/");
    } catch (err: any) {
      setError(err.message || "Invalid email or password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen grid md:grid-cols-2">
      {/* Left Side - Brand Image */}
      <div className="hidden md:block relative">
        <ImageWithFallback
          src="https://images.unsplash.com/photo-1758995115682-1452a1a9e35b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBqZXdlbHJ5JTIwYWVzdGhldGljfGVufDF8fHx8MTczMzc4Nzg2N3ww&ixlib=rb-4.1.0&q=80&w=1080"
          alt="Luxury Jewelry"
          className="w-full h-full object-cover"
        />
        <div 
          className="absolute inset-0 flex items-center justify-center"
          style={{ backgroundColor: 'rgba(74, 25, 66, 0.3)' }}
        >
          <h1 
            className="text-5xl text-white tracking-widest"
            style={{ fontFamily: 'Georgia, serif' }}
          >
            BEJEWELED
          </h1>
        </div>
      </div>

      {/* Right Side - Login Form */}
      <div className="flex items-center justify-center px-6 py-12 bg-white">
        <div className="w-full max-w-md">
          {/* Form Header */}
          <div className="text-center mb-10">
            <h2 
              className="text-3xl md:text-4xl mb-3"
              style={{ 
                fontFamily: 'Georgia, serif',
                color: '#4A1942'
              }}
            >
              Welcome Back
            </h2>
            <p style={{ color: '#5C3A5E' }}>
              Sign in to your account
            </p>
          </div>

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <div className="p-3 text-sm text-red-700 bg-red-50 border border-red-200 rounded">
                {error}
              </div>
            )}
            <div className="relative">
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="peer w-full px-4 py-3 border outline-none focus:border-current transition-colors"
                style={{ borderColor: '#E6D5F0' }}
                placeholder=" "
                required
              />
              <label
                htmlFor="email"
                className="absolute left-4 top-3 transition-all peer-focus:top-0 peer-focus:left-3 peer-focus:text-xs peer-focus:px-1 peer-focus:bg-white peer-[:not(:placeholder-shown)]:top-0 peer-[:not(:placeholder-shown)]:left-3 peer-[:not(:placeholder-shown)]:text-xs peer-[:not(:placeholder-shown)]:px-1 peer-[:not(:placeholder-shown)]:bg-white"
                style={{ color: '#5C3A5E' }}
              >
                Email Address
              </label>
            </div>

            <div className="relative">
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="peer w-full px-4 py-3 border outline-none focus:border-current transition-colors"
                style={{ borderColor: '#E6D5F0' }}
                placeholder=" "
                required
              />
              <label
                htmlFor="password"
                className="absolute left-4 top-3 transition-all peer-focus:top-0 peer-focus:left-3 peer-focus:text-xs peer-focus:px-1 peer-focus:bg-white peer-[:not(:placeholder-shown)]:top-0 peer-[:not(:placeholder-shown)]:left-3 peer-[:not(:placeholder-shown)]:text-xs peer-[:not(:placeholder-shown)]:px-1 peer-[:not(:placeholder-shown)]:bg-white"
                style={{ color: '#5C3A5E' }}
              >
                Password
              </label>
            </div>

            {/* Forgot Password Link */}
            <div className="text-right">
              <Link 
                to="/forgot-password"
                className="text-sm hover:opacity-70 transition-opacity"
                style={{ color: '#4A1942' }}
              >
                Forgot Password?
              </Link>
            </div>

            {/* Sign In Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 text-white transition-opacity hover:opacity-90 disabled:opacity-50"
              style={{ 
                backgroundColor: '#4A1942',
                fontFamily: 'system-ui, -apple-system, sans-serif',
                fontSize: '15px',
                letterSpacing: '0.5px'
              }}
            >
              {loading ? 'Signing In...' : 'Sign In'}
            </button>
          </form>

          {/* Divider */}
          <div className="flex items-center gap-4 my-8">
            <div className="flex-1 h-px" style={{ backgroundColor: '#E6D5F0' }}></div>
            <span className="text-sm" style={{ color: '#5C3A5E' }}>or</span>
            <div className="flex-1 h-px" style={{ backgroundColor: '#E6D5F0' }}></div>
          </div>

          {/* Register Link */}
          <p className="text-center" style={{ color: '#5C3A5E' }}>
            Don't have an account?{' '}
            <Link 
              to="/register"
              className="hover:opacity-70 transition-opacity"
              style={{ color: '#4A1942' }}
            >
              Create Account
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
