import { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  FiMenu,
  FiHome,
  FiBookmark,
  FiTag,
  FiGrid,
  FiSearch,
  FiSun,
  FiMoon,
  FiX,
  FiUser,
  FiLogOut,
  FiChevronDown,
  FiUpload,
} from "react-icons/fi";

const Dropdown = ({ trigger, menu, isOpen, setIsOpen }) => {
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [setIsOpen]);

  return (
    <div className="relative" ref={dropdownRef}>
      {trigger}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 origin-top-right rounded-md bg-white dark:bg-gray-800 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none animate-fade-in z-50">
          {menu}
        </div>
      )}
    </div>
  );
};

const Navbar = ({
  toggleSidebar,
  darkMode,
  toggleDarkMode,
  openImportModal,
  onLogout,
  username,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const navigate = useNavigate();

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const handleProfile = () => {
    setUserDropdownOpen(false);
    navigate("/profile");
  };

  const handleLogout = () => {
    setUserDropdownOpen(false);
    onLogout();
  };

  return (
    <div className="pt-4 px-4 md:px-6 lg:px-8 z-10">
      <nav className="bg-gradient-primary text-white rounded-xl shadow-lg overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Left side - Logo and hamburger */}
            <div className="flex items-center">
              <button
                onClick={toggleSidebar}
                className="mr-2 p-2 rounded-md hover:bg-white/10 transition-colors duration-200"
                aria-label="Toggle sidebar"
              >
                <FiMenu className="h-6 w-6" />
              </button>

              <Link to="/" className="flex items-center group">
                <div className="h-10 w-10 mr-2 bg-white rounded-full flex items-center justify-center text-primary font-bold transition-all duration-300 group-hover:scale-110 shadow-md">
                  <span className="text-lg">SB</span>
                </div>
                <span className="font-bold text-xl hidden md:block group-hover:text-white/90 transition-colors">
                  SmartBookmark
                </span>
              </Link>
            </div>

            {/* Center - Navigation links (desktop) */}
            <div className="hidden md:flex items-center space-x-1">
              <Link
                to="/home"
                className="px-3 py-2 rounded-md hover:bg-white/10 transition-all duration-200 flex items-center hover:scale-105"
              >
                <FiHome className="mr-1" /> Home
              </Link>
              <Link
                to="/bookmarks"
                className="px-3 py-2 rounded-md hover:bg-white/10 transition-all duration-200 flex items-center hover:scale-105"
              >
                <FiBookmark className="mr-1" /> Bookmarks
              </Link>
              <Link
                to="/categories"
                className="px-3 py-2 rounded-md hover:bg-white/10 transition-all duration-200 flex items-center hover:scale-105"
              >
                <FiGrid className="mr-1" /> Categories
              </Link>
              <Link
                to="/tags"
                className="px-3 py-2 rounded-md hover:bg-white/10 transition-all duration-200 flex items-center hover:scale-105"
              >
                <FiTag className="mr-1" /> Tags
              </Link>
              <Link
                to="/search"
                className="px-3 py-2 rounded-md hover:bg-white/10 transition-all duration-200 flex items-center hover:scale-105"
              >
                <FiSearch className="mr-1" /> Search
              </Link>
            </div>

            {/* Right side - Theme toggle, Upload and Profile */}
            <div className="flex items-center">
              {/* Upload button */}
              <button
                onClick={openImportModal}
                className="ml-2 px-3 py-2 rounded-md hover:bg-white/10 transition-all duration-200 flex items-center hover:scale-105"
                aria-label="Import bookmarks"
              >
                <FiUpload className="h-5 w-5 mr-1" />
                <span className="hidden md:block">Import</span>
              </button>

              {/* Theme toggle */}
              <button
                onClick={toggleDarkMode}
                className="p-2 rounded-md hover:bg-white/10 transition-all duration-200 hover:rotate-12"
                aria-label="Toggle dark mode"
              >
                {darkMode ? (
                  <FiSun className="h-6 w-6" />
                ) : (
                  <FiMoon className="h-6 w-6" />
                )}
              </button>

              {/* User dropdown */}
              <Dropdown
                isOpen={userDropdownOpen}
                setIsOpen={setUserDropdownOpen}
                trigger={
                  <button
                    onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                    className="flex items-center px-3 py-2 rounded-md hover:bg-white/10 transition-colors duration-200 ml-2"
                  >
                    <div className="h-8 w-8 bg-white/20 rounded-full flex items-center justify-center mr-2">
                      <FiUser className="h-4 w-4" />
                    </div>
                    <span className="hidden md:block">
                      {username || "User"}
                    </span>
                    <FiChevronDown className="ml-2 h-4 w-4" />
                  </button>
                }
                menu={
                  <div className="origin-top-right fixed right-0 mt-2 w-48 rounded-md shadow-lg bg-white dark:bg-gray-800 ring-1 ring-black ring-opacity-5 focus:outline-none animate-fade-in z-50">
                    <button
                      onClick={handleProfile}
                      className="w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center"
                    >
                      <FiUser className="mr-2" /> Profile
                    </button>
                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center"
                    >
                      <FiLogOut className="mr-2" /> Logout
                    </button>
                  </div>
                }
              />

              {/* Mobile menu button */}
              <button
                onClick={toggleMobileMenu}
                className="ml-3 p-2 rounded-md hover:bg-white/10 transition-colors duration-200 md:hidden"
                aria-label="Open mobile menu"
              >
                {mobileMenuOpen ? (
                  <FiX className="h-6 w-6" />
                ) : (
                  <FiMenu className="h-6 w-6" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className="md:hidden animate-fade-in">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-gradient-to-b from-primary-dark to-primary dark:from-gray-900 dark:to-gray-800">
              <Link
                to="/home"
                className="block px-3 py-2 rounded-md hover:bg-white/10 transition-colors duration-200 flex items-center"
                onClick={() => setMobileMenuOpen(false)}
              >
                <FiHome className="mr-2" /> Home
              </Link>
              <Link
                to="/bookmarks"
                className="block px-3 py-2 rounded-md hover:bg-white/10 transition-colors duration-200 flex items-center"
                onClick={() => setMobileMenuOpen(false)}
              >
                <FiBookmark className="mr-2" /> Bookmarks
              </Link>
              <Link
                to="/categories"
                className="block px-3 py-2 rounded-md hover:bg-white/10 transition-colors duration-200 flex items-center"
                onClick={() => setMobileMenuOpen(false)}
              >
                <FiGrid className="mr-2" /> Categories
              </Link>
              <Link
                to="/tags"
                className="block px-3 py-2 rounded-md hover:bg-white/10 transition-colors duration-200 flex items-center"
                onClick={() => setMobileMenuOpen(false)}
              >
                <FiTag className="mr-2" /> Tags
              </Link>
              <Link
                to="/search"
                className="block px-3 py-2 rounded-md hover:bg-white/10 transition-colors duration-200 flex items-center"
                onClick={() => setMobileMenuOpen(false)}
              >
                <FiSearch className="mr-2" /> Search
              </Link>
            </div>
          </div>
        )}
      </nav>
    </div>
  );
};

export default Navbar;
