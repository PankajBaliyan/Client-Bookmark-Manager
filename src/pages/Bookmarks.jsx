import { useState } from 'react'
import SearchBar from '../components/SearchBar'
import BookmarkCard from '../components/BookmarkCard'
import { FiGrid, FiList, FiFilter, FiX } from 'react-icons/fi'

const Bookmarks = () => {
  const [viewMode, setViewMode] = useState('grid')
  const [filterOpen, setFilterOpen] = useState(false)
  const [activeFilters, setActiveFilters] = useState([])
  
  // Sample bookmarks data (same as in Home.jsx)
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
  
  // Sample categories and tags for filters
  const categories = ['All', 'Articles', 'Tutorials', 'Documentation', 'Development', 'Shopping', 'Recipes']
  const tags = ['React', 'JavaScript', 'CSS', 'Design', 'Frontend', 'Web', 'Git', 'Code']
  
  const toggleFilter = () => {
    setFilterOpen(!filterOpen)
  }
  
  const addFilter = (filter) => {
    if (!activeFilters.includes(filter)) {
      setActiveFilters([...activeFilters, filter])
    }
  }
  
  const removeFilter = (filter) => {
    setActiveFilters(activeFilters.filter(f => f !== filter))
  }
  
  const handleSearch = (query) => {
    console.log('Searching for:', query)
    // Search functionality would go here
  }
  
  return (
    <div className="max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">All Bookmarks</h1>
        <p className="text-gray-600 dark:text-gray-400">
          Browse and manage all your saved bookmarks
        </p>
      </div>
      
      {/* Search and filters */}
      <div className="mb-6">
        <div className="flex flex-col md:flex-row md:items-center gap-4">
          <div className="flex-1">
            <SearchBar onSearch={handleSearch} />
          </div>
          
          <div className="flex items-center gap-2">
            {/* View toggle */}
            <div className="flex items-center space-x-2 bg-white dark:bg-gray-800 rounded-md shadow-sm p-1">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded ${
                  viewMode === 'grid' 
                    ? 'bg-primary text-white' 
                    : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700'
                }`}
                aria-label="Grid view"
              >
                <FiGrid className="h-5 w-5" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded ${
                  viewMode === 'list' 
                    ? 'bg-primary text-white' 
                    : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700'
                }`}
                aria-label="List view"
              >
                <FiList className="h-5 w-5" />
              </button>
            </div>
            
            {/* Filter button */}
            <button
              onClick={toggleFilter}
              className={`p-2 rounded-md ${
                filterOpen || activeFilters.length > 0
                  ? 'bg-primary text-white'
                  : 'bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700'
              }`}
              aria-label="Filter bookmarks"
            >
              <FiFilter className="h-5 w-5" />
            </button>
          </div>
        </div>
        
        {/* Active filters */}
        {activeFilters.length > 0 && (
          <div className="mt-4 flex flex-wrap gap-2">
            {activeFilters.map(filter => (
              <span 
                key={filter}
                className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-primary/10 text-primary"
              >
                {filter}
                <button
                  onClick={() => removeFilter(filter)}
                  className="ml-1 rounded-full hover:bg-primary/20"
                  aria-label={`Remove ${filter} filter`}
                >
                  <FiX className="h-4 w-4" />
                </button>
              </span>
            ))}
            
            <button
              onClick={() => setActiveFilters([])}
              className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700"
            >
              Clear all
            </button>
          </div>
        )}
        
        {/* Filter panel */}
        {filterOpen && (
          <div className="mt-4 p-4 bg-white dark:bg-gray-800 rounded-lg shadow-md animate-fade-in">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Categories */}
              <div>
                <h3 className="font-medium text-gray-900 dark:text-white mb-2">Categories</h3>
                <div className="flex flex-wrap gap-2">
                  {categories.map(category => (
                    <button
                      key={category}
                      onClick={() => addFilter(category)}
                      className={`px-3 py-1 rounded-full text-sm ${
                        activeFilters.includes(category)
                          ? 'bg-primary text-white'
                          : 'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-600'
                      }`}
                    >
                      {category}
                    </button>
                  ))}
                </div>
              </div>
              
              {/* Tags */}
              <div>
                <h3 className="font-medium text-gray-900 dark:text-white mb-2">Tags</h3>
                <div className="flex flex-wrap gap-2">
                  {tags.map(tag => (
                    <button
                      key={tag}
                      onClick={() => addFilter(tag)}
                      className={`px-3 py-1 rounded-full text-sm ${
                        activeFilters.includes(tag)
                          ? 'bg-primary text-white'
                          : 'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-600'
                      }`}
                    >
                      {tag}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
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
  )
}

export default Bookmarks