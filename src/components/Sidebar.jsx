import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  FiChevronRight,
  FiChevronDown,
  FiBook,
  FiVideo,
  FiShoppingCart,
  FiCoffee,
  FiCode,
  FiMusic,
  FiTag,
  FiX,
  FiChevronLeft,
  FiHome,
  FiBookmark,
  FiGrid,
  FiSearch,
  FiSettings
} from 'react-icons/fi';

const Sidebar = ({ isOpen, toggleSidebar }) => {
  const [categoriesExpanded, setCategoriesExpanded] = useState(true);
  const [tagsExpanded, setTagsExpanded] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();

  const toggleCategories = () => {
    setCategoriesExpanded(!categoriesExpanded);
  };

  const toggleTags = () => {
    setTagsExpanded(!tagsExpanded);
  };

  // Sample categories with icons
  const categories = [
    { id: 1, name: 'Articles', icon: <FiBook /> },
    { id: 2, name: 'Tutorials', icon: <FiCode /> },
    { id: 3, name: 'Shopping', icon: <FiShoppingCart /> },
    { id: 4, name: 'Recipes', icon: <FiCoffee /> },
    { id: 5, name: 'Videos', icon: <FiVideo /> },
    { id: 6, name: 'Music', icon: <FiMusic /> },
  ];

  // Sample tags
  const tags = [
    { id: 1, name: 'Important' },
    { id: 2, name: 'Work' },
    { id: 3, name: 'Personal' },
    { id: 4, name: 'Research' },
    { id: 5, name: 'Later' },
  ];

  // Main navigation items
  const mainNavItems = [
    { path: '/', name: 'Home', icon: <FiHome /> },
    { path: '/bookmarks', name: 'Bookmarks', icon: <FiBookmark /> },
    { path: '/categories', name: 'Categories', icon: <FiGrid /> },
    { path: '/tags', name: 'Tags', icon: <FiTag /> },
    { path: '/search', name: 'Search', icon: <FiSearch /> },
    { path: '/settings', name: 'Settings', icon: <FiSettings /> },
  ];

  const handleCategoryClick = (category) => {
    navigate(`/categories?filter=${category.name.toLowerCase()}`);
  };

  const handleTagClick = (tag) => {
    navigate(`/tags?filter=${tag.name.toLowerCase()}`);
  };

  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <>
      {/* Mobile sidebar backdrop */}
      {isOpen && (
        <div
          className="md:hidden fixed inset-0 bg-black bg-opacity-50 z-20 transition-opacity duration-300"
          onClick={toggleSidebar}
        ></div>
      )}

      {/* Sidebar */}
      <aside
        className={`fixed md:relative z-30 md:z-auto h-full bg-white dark:bg-gray-900 shadow-lg transition-all duration-300 ease-in-out ${
          isOpen
            ? 'w-64 translate-x-0'
            : 'w-0 md:w-16 -translate-x-full md:translate-x-0'
        }`}
      >
        {/* Sidebar content */}
        <div
          className={`h-full flex flex-col overflow-hidden ${
            isOpen ? 'visible opacity-100' : 'invisible md:visible opacity-0 md:opacity-100'
          } transition-opacity duration-300`}
        >
          {/* Mobile close button */}
          <div className="md:hidden flex justify-end p-2">
            <button
              onClick={toggleSidebar}
              className="p-2 rounded-full text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-200"
              aria-label="Close sidebar"
            >
              <FiX className="h-5 w-5" />
            </button>
          </div>

          {/* Sidebar toggle button (desktop) */}
          <div className="hidden md:flex justify-end p-2">
            <button
              onClick={toggleSidebar}
              className="p-2 rounded-full text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-200 hover:scale-110"
              aria-label="Toggle sidebar"
            >
              {isOpen ? (
                <FiChevronLeft className="h-4 w-4" />
              ) : (
                <FiChevronRight className="h-4 w-4" />
              )}
            </button>
          </div>

          {/* Main navigation */}
          <div className="px-3 py-4 border-b border-gray-200 dark:border-gray-700">
            <div className="space-y-1">
              {mainNavItems.map((item) => (
                <div
                  key={item.path}
                  onClick={() => navigate(item.path)}
                  className={`sidebar-item ${isActive(item.path) ? 'active' : ''}`}
                >
                  {item.icon}
                  <span className="transition-opacity duration-200">{item.name}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Categories section */}
          <div className="px-3 py-4 flex-1 overflow-y-auto scrollbar-thin">
            <div
              className="flex items-center justify-between cursor-pointer p-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md transition-colors duration-200"
              onClick={toggleCategories}
            >
              <span className="font-medium">Categories</span>
              {isOpen && (
                <div className="transition-transform duration-200" style={{ transform: categoriesExpanded ? 'rotate(0deg)' : 'rotate(-90deg)' }}>
                  <FiChevronDown />
                </div>
              )}
            </div>

            {isOpen && (
              <div 
                className={`mt-2 space-y-1 overflow-hidden transition-all duration-300 ease-in-out ${
                  categoriesExpanded ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                }`}
              >
                {categories.map((category) => (
                  <div
                    key={category.id}
                    className="sidebar-item text-gray-600 dark:text-gray-400 group"
                    onClick={() => handleCategoryClick(category)}
                  >
                    <div className="text-primary dark:text-primary-light transition-transform duration-200 group-hover:scale-110">
                      {category.icon}
                    </div>
                    <span>{category.name}</span>
                  </div>
                ))}
              </div>
            )}

            {/* Tags section */}
            <div className="mt-6">
              <div
                className="flex items-center justify-between cursor-pointer p-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md transition-colors duration-200"
                onClick={toggleTags}
              >
                <span className="font-medium">Tags</span>
                {isOpen && (
                  <div className="transition-transform duration-200" style={{ transform: tagsExpanded ? 'rotate(0deg)' : 'rotate(-90deg)' }}>
                    <FiChevronDown />
                  </div>
                )}
              </div>

              {isOpen && (
                <div 
                  className={`mt-2 space-y-1 overflow-hidden transition-all duration-300 ease-in-out ${
                    tagsExpanded ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                  }`}
                >
                  {tags.map((tag) => (
                    <div
                      key={tag.id}
                      className="sidebar-item text-gray-600 dark:text-gray-400 group"
                      onClick={() => handleTagClick(tag)}
                    >
                      <div className="text-primary dark:text-primary-light transition-transform duration-200 group-hover:scale-110">
                        <FiTag />
                      </div>
                      <span>{tag.name}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </aside>

      {/* Collapsed sidebar (desktop) */}
      {!isOpen && (
        <div className="hidden md:block fixed h-full w-16 bg-white dark:bg-gray-900 shadow-lg z-10 transition-all duration-300">
          <div className="flex flex-col items-center pt-16 space-y-6">
            {mainNavItems.slice(0, 4).map((item) => (
              <div
                key={item.path}
                className={`p-3 rounded-full ${
                  isActive(item.path)
                    ? 'bg-primary text-white'
                    : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
                } cursor-pointer transition-all duration-200 hover:scale-110 shadow-sm hover:shadow-md`}
                onClick={() => navigate(item.path)}
                title={item.name}
              >
                {item.icon}
              </div>
            ))}
            
            <div className="w-8 h-px bg-gray-200 dark:bg-gray-700"></div>
            
            {categories.slice(0, 3).map((category) => (
              <div
                key={category.id}
                className="p-3 rounded-full bg-gray-100 dark:bg-gray-800 text-primary dark:text-primary-light hover:bg-gray-200 dark:hover:bg-gray-700 cursor-pointer transition-all duration-200 hover:scale-110 shadow-sm hover:shadow-md"
                onClick={() => handleCategoryClick(category)}
                title={category.name}
              >
                {category.icon}
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default Sidebar;