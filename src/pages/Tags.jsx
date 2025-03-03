import { useState } from 'react'
import { FiEdit2, FiTrash2, FiPlus } from 'react-icons/fi'

const Tags = () => {
  const [tags, setTags] = useState([
    { id: 1, name: 'React', count: 8 },
    { id: 2, name: 'JavaScript', count: 12 },
    { id: 3, name: 'CSS', count: 7 },
    { id: 4, name: 'Design', count: 5 },
    { id: 5, name: 'Frontend', count: 9 },
    { id: 6, name: 'Web', count: 15 },
    { id: 7, name: 'Git', count: 3 },
    { id: 8, name: 'Code', count: 11 },
    { id: 9, name: 'Reference', count: 6 },
    { id: 10, name: 'Development', count: 14 },
    { id: 11, name: 'Programming', count: 10 },
    { id: 12, name: 'Framework', count: 4 },
  ])
  
  const [showAddForm, setShowAddForm] = useState(false)
  const [newTag, setNewTag] = useState('')
  
  const handleAddTag = () => {
    if (newTag.trim()) {
      setTags([
        ...tags,
        {
          id: tags.length + 1,
          name: newTag,
          count: 0,
        }
      ])
      setNewTag('')
      setShowAddForm(false)
    }
  }
  
  const handleDeleteTag = (id) => {
    setTags(tags.filter(tag => tag.id !== id))
  }

  return (
    <div className="max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-6 flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Tags</h1>
          <p className="text-gray-600 dark:text-gray-400">
            Manage and organize your bookmark tags
          </p>
        </div>
        
        <button
          onClick={() => setShowAddForm(true)}
          className="btn-primary flex items-center"
        >
          <FiPlus className="mr-1" /> Add Tag
        </button>
      </div>
      
      {/* Add tag form */}
      {showAddForm && (
        <div className="mb-6 p-4 bg-white dark:bg-gray-800 rounded-lg shadow-md animate-fade-in">
          <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Add New Tag</h2>
          
          <div>
            <label htmlFor="tag-name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Tag Name
            </label>
            <input
              type="text"
              id="tag-name"
              value={newTag}
              onChange={(e) => setNewTag(e.target.value)}
              className="input"
              placeholder="Enter tag name"
            />
          </div>
          
          <div className="mt-4 flex justify-end">
            <button
              onClick={() => setShowAddForm(false)}
              className="btn-secondary mr-3"
            >
              Cancel
            </button>
            <button
              onClick={handleAddTag}
              className="btn-primary"
            >
              Add Tag
            </button>
          </div>
        </div>
      )}
      
      {/* Tags grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {tags.map(tag => (
          <div 
            key={tag.id}
            className="card p-4 flex items-center justify-between"
          >
            <div>
              <h3 className="font-medium text-gray-900 dark:text-white">{tag.name}</h3>
              <div className="text-sm text-gray-600 dark:text-gray-400">
                {tag.count} bookmarks
              </div>
            </div>
            
            <div className="flex items-center space-x-2">
              <button
                className="p-1 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
                aria-label={`Edit ${tag.name} tag`}
              >
                <FiEdit2 className="h-4 w-4" />
              </button>
              <button
                onClick={() => handleDeleteTag(tag.id)}
                className="p-1 text-gray-500 hover:text-red-500 dark:text-gray-400 dark:hover:text-red-400"
                aria-label={`Delete ${tag.name} tag`}
              >
                <FiTrash2 className="h-4 w-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Tags