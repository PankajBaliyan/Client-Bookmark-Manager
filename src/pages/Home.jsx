import { useState } from 'react'
import SearchBar from '../components/SearchBar'
import BookmarkCard from '../components/BookmarkCard'
import { FiGrid, FiList, FiInfo } from 'react-icons/fi'

const Home = () => {
  const [viewMode, setViewMode] = useState('grid')
  
  // Sample bookmarks data
  const bookmarks = [
    {
      id: 1,
      title: 'React Documentation',
      url: 'https://react.dev',
      description: 'Official React documentation with guides, API reference, and examples for building user interfaces.',
      thumbnail: 'https://placehold.co/600x400/4299e1/ffffff?text=React',
      category: 'Tutorials',
      tags: ['React', 'JavaScript', 'Frontend'],
      isFavorite: true,
    },
    {
      id: 2,
      title: 'MDN Web Docs',
      url: 'https://developer.mozilla.org',
      description: 'Resources for developers, by developers. Documentation for HTML, CSS, JavaScript, and Web APIs.',
      thumbnail: 'https://placehold.co/600x400/ed8936/ffffff?text=MDN',
      category: 'Documentation',
      tags: ['Reference', 'Web', 'Development'],
      isFavorite: false,
    },
    {
      id: 3,
      title: 'CSS Tricks',
      url: 'https://css-tricks.com',
      description: 'Tips, tricks, and techniques on using Cascading Style Sheets for web design and development.',
      thumbnail: 'https://placehold.co/600x400/38b2ac/ffffff?text=CSS',
      category: 'Articles',
      tags: ['CSS', 'Design', 'Frontend'],
      isFavorite: false,
    },
    {
      id: 4,
      title: 'GitHub',
      url: 'https://github.com',
      description: 'GitHub is where over 100 million developers shape the future of software, together.',
      thumbnail: 'https://placehold.co/600x400/718096/ffffff?text=GitHub',
      category: 'Development',
      tags: ['Git', 'Code', 'Collaboration'],
      isFavorite: true,
    },
    {
      id: 5,
      title: 'Stack Overflow',
      url: 'https://stackoverflow.com',
      description: 'Where developers learn, share, & build careers. The largest, most trusted online community for developers.',
      thumbnail: 'https://placehold.co/600x400/f6ad55/ffffff?text=Stack',
      category: 'Development',
      tags: ['Community', 'Q&A', 'Programming'],
      isFavorite: false,
    },
    {
      id: 6,
      title: 'Tailwind CSS',
      url: 'https://tailwindcss.com',
      description: 'A utility-first CSS framework packed with classes that can be composed to build any design, directly in your markup.',
      thumbnail: 'https://placehold.co/600x400/4fd1c5/ffffff?text=Tailwind',
      category: 'Tutorials',
      tags: ['CSS', 'Framework', 'Design'],
      isFavorite: false,
    },
  ]
  
  const handleSearch = (query) => {
    console.log('Searching for:', query)
    // Search functionality would go here
  }
  
  return (
    <div className="max-w-7xl mx-auto">
      {/* Welcome section */}
      <div className="mb-8 text-center">
        <h1 className="text-4xl font-bold mb-2 gradient-text">Welcome to SmartBookmark</h1>
        <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          Your AI-powered bookmark manager that helps you organize, search, and discover your saved content.
        </p>
      </div>
      
      {/* Search bar */}
      <div className="mb-8">
        <SearchBar onSearch={handleSearch} />
      </div>
      
      {/* Recent bookmarks section */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Recent Bookmarks</h2>
          
          {/* View toggle */}
          <div className="flex items-center space-x-2 bg-white dark:bg-gray-800 rounded-md shadow-sm p-1">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-2 rounded transition-all duration-200 ${
                viewMode === 'grid' 
                  ? 'bg-gradient-primary text-white shadow-sm' 
                  : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700'
              }`}
              aria-label="Grid view"
            >
              <FiGrid className="h-5 w-5" />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-2 rounded transition-all duration-200 ${
                viewMode === 'list' 
                  ? 'bg-gradient-primary text-white shadow-sm' 
                  : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700'
              }`}
              aria-label="List view"
            >
              <FiList className="h-5 w-5" />
            </button>
          </div>
        </div>
        
        {/* Bookmarks grid/list */}
        <div className={`${
          viewMode === 'grid' 
            ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6' 
            : 'space-y-4'
        }`}>
          {bookmarks.map(bookmark => (
            <BookmarkCard 
              key={bookmark.id} 
              bookmark={bookmark} 
              isGridView={viewMode === 'grid'} 
            />
          ))}
        </div>
      </div>
      
      {/* AI Features section */}
      <div className="mt-12 bg-gradient-conic bg-[length:200%_200%] animate-gradient rounded-lg p-6 shadow-md text-white">
        <h2 className="text-xl font-semibold mb-4">AI-Powered Features</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="glass-effect p-4 rounded-lg shadow-md transition-transform duration-300 hover:scale-105">
            <div className="flex items-center mb-3">
              <FiInfo className="h-6 w-6 text-primary-light mr-2" />
              <h3 className="font-medium">Smart Categorization</h3>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-300">
              AI automatically categorizes your bookmarks based on content analysis.
            </p>
          </div>
          
          <div className="glass-effect p-4 rounded-lg shadow-md transition-transform duration-300 hover:scale-105">
            <div className="flex items-center mb-3">
              <FiInfo className="h-6 w-6 text-primary-light mr-2" />
              <h3 className="font-medium">Content Summaries</h3>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-300">
              Get AI-generated summaries of your bookmarked pages without visiting them.
            </p>
          </div>
          
          <div className="glass-effect p-4 rounded-lg shadow-md transition-transform duration-300 hover:scale-105">
            <div className="flex items-center mb-3">
              <FiInfo className="h-6 w-6 text-primary-light mr-2" />
              <h3 className="font-medium">Natural Language Search</h3>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-300">
              Search your bookmarks using everyday language and questions.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home