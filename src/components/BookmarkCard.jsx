import { useState } from 'react'
import { FiEdit2, FiTrash2, FiStar, FiExternalLink, FiFileText } from 'react-icons/fi'

const BookmarkCard = ({ bookmark, isGridView }) => {
  const [isFavorite, setIsFavorite] = useState(bookmark.isFavorite || false)
  const [isHovered, setIsHovered] = useState(false)
  
  const toggleFavorite = (e) => {
    e.stopPropagation()
    setIsFavorite(!isFavorite)
  }
  
  const handleEdit = (e) => {
    e.stopPropagation()
    // Edit functionality would go here
    console.log('Edit bookmark:', bookmark.id)
  }
  
  const handleDelete = (e) => {
    e.stopPropagation()
    // Delete functionality would go here
    console.log('Delete bookmark:', bookmark.id)
  }
  
  const handleShowSummary = (e) => {
    e.stopPropagation()
    // Show AI summary functionality would go here
    console.log('Show summary for:', bookmark.id)
  }
  
  // Grid view card
  if (isGridView) {
    return (
      <div 
        className="card card-gradient group p-0 overflow-hidden transition-all duration-300 hover:scale-[1.03] hover:shadow-glow"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Thumbnail */}
        <div className="relative h-40 overflow-hidden bg-gray-200 dark:bg-gray-700">
          <img 
            src={bookmark.thumbnail || `https://placehold.co/600x400?text=${bookmark.title.charAt(0)}`} 
            alt={bookmark.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
          
          {/* Hover actions */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center">
            <div className="flex space-x-2 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
              <button 
                onClick={handleEdit}
                className="p-2 bg-white/90 dark:bg-gray-800/90 rounded-full text-gray-700 dark:text-gray-300 hover:bg-white dark:hover:bg-gray-700 transition-colors duration-200 hover:scale-110"
                aria-label="Edit bookmark"
              >
                <FiEdit2 />
              </button>
              <button 
                onClick={handleDelete}
                className="p-2 bg-white/90 dark:bg-gray-800/90 rounded-full text-red-500 hover:bg-white dark:hover:bg-gray-700 transition-colors duration-200 hover:scale-110"
                aria-label="Delete bookmark"
              >
                <FiTrash2 />
              </button>
              <button 
                onClick={toggleFavorite}
                className={`p-2 bg-white/90 dark:bg-gray-800/90 rounded-full transition-all duration-200 hover:scale-110 ${
                  isFavorite ? 'text-yellow-400' : 'text-gray-400 hover:text-yellow-400'
                }`}
                aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
              >
                <FiStar />
              </button>
            </div>
          </div>
        </div>
        
        {/* Content */}
        <div className="p-4">
          <div className="flex items-start justify-between">
            <h3 className="font-medium text-gray-900 dark:text-white truncate">{bookmark.title}</h3>
            {isFavorite && (
              <FiStar className="text-yellow-400 flex-shrink-0 ml-2 animate-pulse-slow" />
            )}
          </div>
          
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400 line-clamp-2">
            {bookmark.description}
          </p>
          
          <div className="mt-4 flex items-center justify-between">
            <button 
              onClick={handleShowSummary}
              className="text-xs flex items-center text-primary dark:text-primary-light hover:underline transition-transform duration-200 hover:scale-105"
            >
              <FiFileText className="mr-1" /> AI Summary
            </button>
            
            <a 
              href={bookmark.url} 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-xs flex items-center text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-primary-light transition-transform duration-200 hover:scale-105"
            >
              <FiExternalLink className="mr-1" /> Visit
            </a>
          </div>
        </div>
      </div>
    )
  }
  
  // List view item
  return (
    <div 
      className="card p-4 flex items-center gap-4 group transition-all duration-300 hover:scale-[1.01] hover:shadow-glow"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Thumbnail */}
      <div className="flex-shrink-0 w-16 h-16 bg-gray-200 dark:bg-gray-700 rounded overflow-hidden">
        <img 
          src={bookmark.thumbnail || `https://placehold.co/600x400?text=${bookmark.title.charAt(0)}`} 
          alt={bookmark.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
      </div>
      
      {/* Content */}
      <div className="flex-1 min-w-0">
        <div className="flex items-start">
          <h3 className="font-medium text-gray-900 dark:text-white truncate">{bookmark.title}</h3>
          {isFavorite && (
            <FiStar className="text-yellow-400 flex-shrink-0 ml-2 animate-pulse-slow" />
          )}
        </div>
        
        <p className="mt-1 text-sm text-gray-600 dark:text-gray-400 truncate">
          {bookmark.description}
        </p>
      </div>
      
      {/* Actions */}
      <div className="flex items-center space-x-2">
        <button 
          onClick={handleShowSummary}
          className="p-2 text-primary dark:text-primary-light hover:bg-primary/5 dark:hover:bg-primary/10 rounded-full transition-all duration-200 hover:scale-110"
          aria-label="Show AI summary"
        >
          <FiFileText />
        </button>
        <button 
          onClick={handleEdit}
          className="p-2 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-all duration-200 hover:scale-110"
          aria-label="Edit bookmark"
        >
          <FiEdit2 />
        </button>
        <button 
          onClick={handleDelete}
          className="p-2 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-all duration-200 hover:scale-110"
          aria-label="Delete bookmark"
        >
          <FiTrash2 />
        </button>
        <button 
          onClick={toggleFavorite}
          className={`p-2 rounded-full transition-all duration-200 hover:scale-110 ${
            isFavorite ? 'text-yellow-400' : 'text-gray-400 hover:text-yellow-400'
          }`}
          aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
        >
          <FiStar />
        </button>
      </div>
    </div>
  )
}

export default BookmarkCard