import { useState } from 'react'
import { FiSearch, FiX } from 'react-icons/fi'

const SearchBar = ({ onSearch }) => {
  const [query, setQuery] = useState('')
  const [suggestions, setSuggestions] = useState([])
  const [isFocused, setIsFocused] = useState(false)
  
  // Sample suggestions based on query
  const getSuggestions = (input) => {
    if (!input.trim()) return []
    
    // These would normally come from an API or search index
    const dummySuggestions = [
      'React tutorials',
      'JavaScript best practices',
      'CSS grid layout examples',
      'Web development resources',
      'AI tools for developers',
    ]
    
    return dummySuggestions.filter(item => 
      item.toLowerCase().includes(input.toLowerCase())
    ).slice(0, 5)
  }
  
  const handleInputChange = (e) => {
    const value = e.target.value
    setQuery(value)
    
    // Get suggestions based on input
    if (value.trim()) {
      setSuggestions(getSuggestions(value))
    } else {
      setSuggestions([])
    }
  }
  
  const handleSearch = (e) => {
    e.preventDefault()
    if (query.trim()) {
      onSearch(query)
      setSuggestions([])
    }
  }
  
  const handleSuggestionClick = (suggestion) => {
    setQuery(suggestion)
    onSearch(suggestion)
    setSuggestions([])
  }
  
  const clearSearch = () => {
    setQuery('')
    setSuggestions([])
  }

  return (
    <div className="relative w-full max-w-3xl mx-auto">
      <form onSubmit={handleSearch} className="relative">
        <div className="relative">
          <input
            type="text"
            value={query}
            onChange={handleInputChange}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setTimeout(() => setIsFocused(false), 200)}
            placeholder="Search bookmarks or ask a question..."
            className="input pl-10 pr-10 py-3 w-full shadow-md hover:shadow-lg focus:shadow-glow transition-shadow duration-300 rounded-full"
            aria-label="Search"
          />
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <FiSearch className="h-5 w-5 text-gray-400" />
          </div>
          {query && (
            <button
              type="button"
              onClick={clearSearch}
              className="absolute inset-y-0 right-0 pr-3 flex items-center"
              aria-label="Clear search"
            >
              <FiX className="h-5 w-5 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors duration-200" />
            </button>
          )}
        </div>
      </form>
      
      {/* Suggestions dropdown */}
      {isFocused && suggestions.length > 0 && (
        <div className="absolute z-10 mt-1 w-full bg-white dark:bg-gray-800 shadow-lg rounded-md overflow-hidden border border-gray-200 dark:border-gray-700 animate-fade-in">
          <ul>
            {suggestions.map((suggestion, index) => (
              <li 
                key={index}
                onClick={() => handleSuggestionClick(suggestion)}
                className="px-4 py-2 hover:bg-gradient-secondary dark:hover:bg-gray-700 cursor-pointer text-gray-800 dark:text-gray-200 transition-colors duration-200"
              >
                {suggestion}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}

export default SearchBar