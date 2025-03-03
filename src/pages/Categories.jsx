import { useState } from 'react'
import { FiEdit2, FiTrash2, FiPlus } from 'react-icons/fi'

const Categories = () => {
  const [categories, setCategories] = useState([
    { id: 1, name: 'Articles', count: 12, color: '#4299e1' },
    { id: 2, name: 'Tutorials', count: 8, color: '#38b2ac' },
    { id: 3, name: 'Shopping', count: 5, color: '#ed8936' },
    { id: 4, name: 'Recipes', count: 3, color: '#9f7aea' },
    { id: 5, name: 'Videos', count: 7, color: '#f56565' },
    { id: 6, name: 'Music', count: 4, color: '#48bb78' },
    { id: 7, name: 'Documentation', count: 9, color: '#667eea' },
    { id: 8, name: 'Development', count: 15, color: '#d69e2e' },
  ])
  
  const [showAddForm, setShowAddForm] = useState(false)
  const [newCategory, setNewCategory] = useState({ name: '', color: '#4299e1' })
  
  const handleAddCategory = () => {
    if (newCategory.name.trim()) {
      setCategories([
        ...categories,
        {
          id: categories.length + 1,
          name: newCategory.name,
          count: 0,
          color: newCategory.color,
        }
      ])
      setNewCategory({ name: '', color: '#4299e1' })
      setShowAddForm(false)
    }
  }
  
  const handleDeleteCategory = (id) => {
    setCategories(categories.filter(category => category.id !== id))
  }

  return (
    <div className="max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-6 flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Categories</h1>
          <p className="text-gray-600 dark:text-gray-400">
            Manage and organize your bookmark categories
          </p>
        </div>
        
        <button
          onClick={() => setShowAddForm(true)}
          className="btn-primary flex items-center"
        >
          <FiPlus className="mr-1" /> Add Category
        </button>
      </div>
      
      {/* Add category form */}
      {showAddForm && (
        <div className="mb-6 p-4 bg-white dark:bg-gray-800 rounded-lg shadow-md animate-fade-in">
          <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Add New Category</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="category-name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Category Name
              </label>
              <input
                type="text"
                id="category-name"
                value={newCategory.name}
                onChange={(e) => setNewCategory({ ...newCategory, name: e.target.value })}
                className="input"
                placeholder="Enter category name"
              />
            </div>
            
            <div>
              <label htmlFor="category-color" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Color
              </label>
              <div className="flex items-center">
                <input
                  type="color"
                  id="category-color"
                  value={newCategory.color}
                  onChange={(e) => setNewCategory({ ...newCategory, color: e.target.value })}
                  className="h-10 w-10 rounded border border-gray-300 dark:border-gray-600 mr-2"
                />
                <input
                  type="text"
                  value={newCategory.color}
                  onChange={(e) => setNewCategory({ ...newCategory, color: e.target.value })}
                  className="input"
                  placeholder="#RRGGBB"
                />
              </div>
            </div>
          </div>
          
          <div className="mt-4 flex justify-end">
            <button
              onClick={() => setShowAddForm(false)}
              className="btn-secondary mr-3"
            >
              Cancel
            </button>
            <button
              onClick={handleAddCategory}
              className="btn-primary"
            >
              Add Category
            </button>
          </div>
        </div>
      )}
      
      {/* Categories grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {categories.map(category => (
          <div 
            key={category.id}
            className="card p-4 flex flex-col"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center">
                <div 
                  className="w-4 h-4 rounded-full mr-2" 
                  style={{ backgroundColor: category.color }}
                ></div>
                <h3 className="font-medium text-gray-900 dark:text-white">{category.name}</h3>
              </div>
              
              <div className="flex items-center space-x-2">
                <button
                  className="p-1 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
                  aria-label={`Edit ${category.name} category`}
                >
                  <FiEdit2 className="h-4 w-4" />
                </button>
                <button
                  onClick={() => handleDeleteCategory(category.id)}
                  className="p-1 text-gray-500 hover:text-red-500 dark:text-gray-400 dark:hover:text-red-400"
                  aria-label={`Delete ${category.name} category`}
                >
                  <FiTrash2 className="h-4 w-4" />
                </button>
              </div>
            </div>
            
            <div className="flex-1">
              <div className="text-sm text-gray-600 dark:text-gray-400">
                {category.count} bookmarks
              </div>
            </div>
            
            <button
              className="mt-4 w-full py-2 text-center text-sm text-primary dark:text-primary-light hover:bg-primary/5 dark:hover:bg-primary/10 rounded-md transition-colors duration-200"
            >
              View Bookmarks
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Categories