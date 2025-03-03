import { useNavigate } from 'react-router-dom';
import { FiBookmark, FiArrowRight } from 'react-icons/fi';

const Landing = () => {
  const navigate = useNavigate();

  const handleGetStarted = () => {
    navigate('/home');
  };

  const handleLogin = () => {
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 flex flex-col items-center justify-center p-4 md:p-8">
      {/* Hero Section */}
      <div className="max-w-5xl w-full text-center">
        <div className="flex justify-center mb-6 animate-float">
          <div className="h-20 w-20 bg-white rounded-full flex items-center justify-center text-primary font-bold shadow-glow">
            <FiBookmark className="h-10 w-10" />
          </div>
        </div>
        
        <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 tracking-tight">
          Smart<span className="text-yellow-300">Bookmark</span> Manager
        </h1>
        
        <p className="text-xl md:text-2xl text-white/90 mb-8 max-w-3xl mx-auto">
          Organize, discover, and manage your bookmarks with the power of AI
        </p>
        
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            onClick={handleGetStarted}
            className="btn bg-white text-primary hover:bg-white/90 px-8 py-3 text-lg rounded-full shadow-glow flex items-center gap-2 transition-all duration-300 hover:pl-6 hover:pr-10"
          >
            Let's Go
            <FiArrowRight className="group-hover:translate-x-2 transition-transform duration-300" />
          </button>
          
          <button
            onClick={handleLogin}
            className="btn bg-transparent border-2 border-white text-white hover:bg-white/10 px-8 py-3 text-lg rounded-full shadow-glow flex items-center gap-2 transition-all duration-300"
          >
            Login / Sign Up
          </button>
        </div>
      </div>
      
      {/* Features Section */}
      <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl w-full">
        <div className="bg-white/10 backdrop-blur-md p-6 rounded-xl text-white border border-white/20 hover:bg-white/20 transition-all duration-300 hover:scale-105">
          <div className="text-yellow-300 text-4xl mb-4">✨</div>
          <h3 className="text-xl font-semibold mb-2">AI-Powered Organization</h3>
          <p className="text-white/80">Automatically categorize and tag your bookmarks using advanced AI algorithms</p>
        </div>
        
        <div className="bg-white/10 backdrop-blur-md p-6 rounded-xl text-white border border-white/20 hover:bg-white/20 transition-all duration-300 hover:scale-105">
          <div className="text-yellow-300 text-4xl mb-4">🔍</div>
          <h3 className="text-xl font-semibold mb-2">Smart Search</h3>
          <p className="text-white/80">Find exactly what you need with natural language search and content analysis</p>
        </div>
        
        <div className="bg-white/10 backdrop-blur-md p-6 rounded-xl text-white border border-white/20 hover:bg-white/20 transition-all duration-300 hover:scale-105">
          <div className="text-yellow-300 text-4xl mb-4">📝</div>
          <h3 className="text-xl font-semibold mb-2">Content Summaries</h3>
          <p className="text-white/80">Get AI-generated summaries of your bookmarked pages without visiting them</p>
        </div>
      </div>
      
      {/* Footer */}
      <div className="mt-20 text-white/70 text-sm">
        © 2025 SmartBookmark Manager • AI-Powered Bookmark Organization
      </div>
    </div>
  );
};

export default Landing;