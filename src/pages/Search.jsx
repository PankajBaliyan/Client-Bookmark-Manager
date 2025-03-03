import { useState } from 'react'
import SearchBar from '../components/SearchBar'
import BookmarkCard from '../components/BookmarkCard'

const Search = () => {
  const [searchResults, setSearchResults] = useState([])
  const [hasSearched, setHasSearched] = useState(false)
  const [isSearching, setIsSearching] = useState(false)
  
  // Sample bookmarks data (same as in Home.jsx)
  const allBookmarks = [
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
    setIsSearching(true)
    setHasSearched(true)
    
    // Simulate search delay
    setTimeout(() => {
      // Simple search implementation (would be more sophisticated with AI)
      const results = allBookmarks.filter(bookmark => 
        bookmark.title.toLowerCase().includes(query.toLowerCase()) ||
        bookmark.description.toLowerCase().includes(query.toLowerCase()) ||
        bookmark.tags.some(tag => tag.toLowerCase().includes(query.toLowerCase())) ||
        bookmark.category.toLowerCase().includes(query.toLowerCase())
      )
      
      setSearchResults(results)
      setIsSearching(false)
    }, 500)
  }

  return (
    <div className="max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-6 text-center">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Search Bookmarks</h1>
        <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          Use natural language to search through your bookmarks. Try asking questions or using descriptive phrases.
        </p>
      </div>
      
      {/* Search bar */}
      <div className="mb-8">
        <SearchBar onSearch={handleSearch} />
      </div>
      
      {/* Search results */}
      <div>
        {isSearching ? (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary"></div>
            <p className="mt-4 text-gray-600 dark:text-gray-400">Searching with AI...</p>
          </div>
        ) : hasSearched ? (
          searchResults.length > 0 ? (
            <>
              <div className="mb-4">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                  Search Results ({searchResults.length})
                </h2>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {searchResults.map(bookmark => (
                  <BookmarkCard 
                    key={bookmark.id} 
                    bookmark={bookmark} 
                    isGridView={true} 
                  />
                ))}
              </div>
            </>
          ) : (
            <div className="text-center py-12">
              <div className="text-gray-400 dark:text-gray-500 text-6xl mb-4">🔍</div>
              <h3 className="text-xl font-medium text-gray-800 dark:text-gray-200 mb-2">No results found</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Try different keywords or phrases
              </p>
            </div>
          )
        ) : (
          <div className="text-center py-12">
            <div className="text-gray-300 dark:text-gray-600 text-6xl mb-4">🔍</div>
            <h3 className="text-xl font-medium text-gray-800 dark:text-gray-200 mb-2">Search your bookmarks</h3>
            <p className="text-gray-600 dark:text-gray-400 max-w-md mx-auto">
              Try searching for topics, keywords, or even ask questions like "Show me JavaScript tutorials" or "Find CSS design resources"
            </p>
          </div>
        )}
      </div>
    </div>
  )
}

export default Search