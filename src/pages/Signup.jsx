import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {signupUser} from "../services/auth_service.js";
import { FiBookmark, FiArrowRight, FiUser, FiLock, FiMail, FiArrowLeft, FiEye, FiEyeOff } from 'react-icons/fi';

const Signup = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleSignup = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    // Validate form
    if (!username || !password || !email || !name) {
      setError('All fields are required');
      setLoading(false);
      return;
    }

    // API Call to create user
    try {
      const formData = {
        username: username,
        name: name,
        email: email,
        password: password
      }
      const response = await signupUser(formData)
      if (response.status !== "error") {
        localStorage.setItem('isAuthenticated', 'true');
        localStorage.setItem('user', JSON.stringify({ username }));
        navigate('/home');
      } else {
        setError(response?.msg || 'Invalid username or password');
        setLoading(false);
      }
    } catch (error) {
      console.error('Error creating user:', error);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 flex flex-col items-center justify-center p-4 md:p-8">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="flex justify-center mb-6">
          <div className="h-16 w-16 bg-white rounded-full flex items-center justify-center text-primary font-bold shadow-glow">
            <FiBookmark className="h-8 w-8" />
          </div>
        </div>
        
        {/* Signup Form */}
        <div className="bg-white/10 backdrop-blur-md rounded-xl border border-white/20 overflow-hidden shadow-glow">
          <div className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-white">Create Account</h2>
              <Link to="/" className="text-white/70 hover:text-white flex items-center">
                <FiArrowLeft className="mr-1" /> Back
              </Link>
            </div>
            
            {error && (
              <div className="mb-4 p-3 bg-red-500/20 border border-red-500/30 rounded-md text-white text-sm">
                {error}
              </div>
            )}
            
            <form onSubmit={handleSignup}>
              <div className="mb-4">
                <label className="block text-white/90 text-sm font-medium mb-2">
                  Email
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FiMail className="h-5 w-5 text-white/50" />
                  </div>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-10 pr-3 py-2 bg-white/10 border border-white/20 rounded-md text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/30 focus:border-transparent"
                    placeholder="Enter email"
                  />
                </div>
              </div>
              
              <div className="mb-4">
                <label className="block text-white/90 text-sm font-medium mb-2">
                  Username
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FiUser className="h-5 w-5 text-white/50" />
                  </div>
                  <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="w-full pl-10 pr-3 py-2 bg-white/10 border border-white/20 rounded-md text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/30 focus:border-transparent"
                    placeholder="Choose username"
                  />
                </div>
              </div>

              <div className="mb-4">
                <label className="block text-white/90 text-sm font-medium mb-2">
                  Name
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FiUser className="h-5 w-5 text-white/50" />
                  </div>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full pl-10 pr-3 py-2 bg-white/10 border border-white/20 rounded-md text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/30 focus:border-transparent"
                    placeholder="Choose name"
                  />
                </div>
              </div>
              
              <div className="mb-6">
                <label className="block text-white/90 text-sm font-medium mb-2">
                  Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FiLock className="h-5 w-5 text-white/50" />
                  </div>
                  <input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full pl-10 pr-10 py-2 bg-white/10 border border-white/20 rounded-md text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/30 focus:border-transparent"
                    placeholder="Create password"
                  />
                  <button
                    type="button"
                    onClick={togglePasswordVisibility}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-white/50 hover:text-white/80 transition-colors"
                  >
                    {showPassword ? <FiEyeOff className="h-5 w-5" /> : <FiEye className="h-5 w-5" />}
                  </button>
                </div>
              </div>
              
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-white text-primary hover:bg-white/90 py-2 px-4 rounded-md font-medium transition-all duration-300 flex items-center justify-center"
              >
                {loading ? (
                  <div className="h-5 w-5 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
                ) : (
                  <>
                    Create Account <FiArrowRight className="ml-2" />
                  </>
                )}
              </button>
              
              <div className="mt-6 text-center">
                <p className="text-white/70">
                  Already have an account?{' '}
                  <Link to="/login" className="text-white hover:underline">
                    Login
                  </Link>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;