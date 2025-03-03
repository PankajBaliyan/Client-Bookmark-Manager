import { useState } from 'react'
import { FiSave, FiRefreshCw, FiDownload, FiTrash2, FiAlertTriangle } from 'react-icons/fi'

const Settings = () => {
  const [settings, setSettings] = useState({
    darkMode: false,
    autoCategories: true,
    aiSummaries: true,
    thumbnailQuality: 'medium',
    defaultView: 'grid',
    syncFrequency: 'daily',
    notificationsEnabled: true
  })
  
  const [showConfirmReset, setShowConfirmReset] = useState(false)
  const [showConfirmDelete, setShowConfirmDelete] = useState(false)
  const [saveSuccess, setSaveSuccess] = useState(false)
  
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setSettings({
      ...settings,
      [name]: type === 'checkbox' ? checked : value
    })
  }
  
  const handleSave = () => {
    // Save settings to localStorage or backend
    localStorage.setItem('smartBookmarkSettings', JSON.stringify(settings))
    setSaveSuccess(true)
    
    // Hide success message after 3 seconds
    setTimeout(() => {
      setSaveSuccess(false)
    }, 3000)
  }
  
  const handleReset = () => {
    // Reset to default settings
    setSettings({
      darkMode: false,
      autoCategories: true,
      aiSummaries: true,
      thumbnailQuality: 'medium',
      defaultView: 'grid',
      syncFrequency: 'daily',
      notificationsEnabled: true
    })
    setShowConfirmReset(false)
  }
  
  const handleExport = () => {
    // Create a download link for the settings JSON
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(settings))
    const downloadAnchorNode = document.createElement('a')
    downloadAnchorNode.setAttribute("href", dataStr)
    downloadAnchorNode.setAttribute("download", "smartbookmark-settings.json")
    document.body.appendChild(downloadAnchorNode)
    downloadAnchorNode.click()
    downloadAnchorNode.remove()
  }
  
  const handleDeleteData = () => {
    // This would delete all user data
    localStorage.removeItem('smartBookmarkSettings')
    // Additional code to delete other data would go here
    setShowConfirmDelete(false)
  }

  return (
    <div className="max-w-4xl mx-auto">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Settings</h1>
        <p className="text-gray-600 dark:text-gray-400">
          Customize your SmartBookmark experience
        </p>
      </div>
      
      {/* Settings form */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-6">
        <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-4">General Settings</h2>
        
        <div className="space-y-4">
          {/* Default view */}
          <div>
            <label htmlFor="defaultView" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Default View
            </label>
            <select
              id="defaultView"
              name="defaultView"
              value={settings.defaultView}
              onChange={handleChange}
              className="input"
            >
              <option value="grid">Grid</option>
              <option value="list">List</option>
            </select>
          </div>
          
          {/* Thumbnail quality */}
          <div>
            <label htmlFor="thumbnailQuality" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Thumbnail Quality
            </label>
            <select
              id="thumbnailQuality"
              name="thumbnailQuality"
              value={settings.thumbnailQuality}
              onChange={handleChange}
              className="input"
            >
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
            <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
              Higher quality uses more storage space
            </p>
          </div>
          
          {/* Sync frequency */}
          <div>
            <label htmlFor="syncFrequency" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Sync Frequency
            </label>
            <select
              id="syncFrequency"
              name="syncFrequency"
              value={settings.syncFrequency}
              onChange={handleChange}
              className="input"
            >
              <option value="manual">Manual only</option>
              <option value="daily">Daily</option>
              <option value="hourly">Hourly</option>
              <option value="realtime">Real-time</option>
            </select>
          </div>
          
          {/* Toggle switches */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <label htmlFor="notificationsEnabled" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Enable Notifications
              </label>
              <div className="relative inline-block w-10 mr-2 align-middle select-none">
                <input
                  type="checkbox"
                  id="notificationsEnabled"
                  name="notificationsEnabled"
                  checked={settings.notificationsEnabled}
                  onChange={handleChange}
                  className="toggle-checkbox absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer"
                />
                <label
                  htmlFor="notificationsEnabled"
                  className={`toggle-label block overflow-hidden h-6 rounded-full cursor-pointer ${
                    settings.notificationsEnabled ? 'bg-primary' : 'bg-gray-300 dark:bg-gray-600'
                  }`}
                ></label>
              </div>
            </div>
            
            <div className="flex items-center justify-between">
              <label htmlFor="autoCategories" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Auto-categorize Bookmarks
              </label>
              <div className="relative inline-block w-10 mr-2 align-middle select-none">
                <input
                  type="checkbox"
                  id="autoCategories"
                  name="autoCategories"
                  checked={settings.autoCategories}
                  onChange={handleChange}
                  className="toggle-checkbox absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer"
                />
                <label
                  htmlFor="autoCategories"
                  className={`toggle-label block overflow-hidden h-6 rounded-full cursor-pointer ${
                    settings.autoCategories ? 'bg-primary' : 'bg-gray-300 dark:bg-gray-600'
                  }`}
                ></label>
              </div>
            </div>
            
            <div className="flex items-center justify-between">
              <label htmlFor="aiSummaries" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Generate AI Summaries
              </label>
              <div className="relative inline-block w-10 mr-2 align-middle select-none">
                <input
                  type="checkbox"
                  id="aiSummaries"
                  name="aiSummaries"
                  checked={settings.aiSummaries}
                  onChange={handleChange}
                  className="toggle-checkbox absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer"
                />
                <label
                  htmlFor="aiSummaries"
                  className={`toggle-label block overflow-hidden h-6 rounded-full cursor-pointer ${
                    settings.aiSummaries ? 'bg-primary' : 'bg-gray-300 dark:bg-gray-600'
                  }`}
                ></label>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Data management */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-6">
        <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Data Management</h2>
        
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <div>
              <h3 className="font-medium text-gray-800 dark:text-gray-200">Export Settings</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Download your settings as a JSON file
              </p>
            </div>
            <button
              onClick={handleExport}
              className="btn-secondary flex items-center"
            >
              <FiDownload className="mr-2" /> Export
            </button>
          </div>
          
          <div className="border-t border-gray-200 dark:border-gray-700 my-4"></div>
          
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <div>
              <h3 className="font-medium text-gray-800 dark:text-gray-200">Reset to Defaults</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Restore all settings to their default values
              </p>
            </div>
            <button
              onClick={() => setShowConfirmReset(true)}
              className="btn-secondary flex items-center"
            >
              <FiRefreshCw className="mr-2" /> Reset
            </button>
          </div>
          
          <div className="border-t border-gray-200 dark:border-gray-700 my-4"></div>
          
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <div>
              <h3 className="font-medium text-red-600 dark:text-red-400">Delete All Data</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Permanently delete all your bookmarks and settings
              </p>
            </div>
            <button
              onClick={() => setShowConfirmDelete(true)}
              className="btn bg-red-600 hover:bg-red-700 text-white flex items-center"
            >
              <FiTrash2 className="mr-2" /> Delete
            </button>
          </div>
        </div>
      </div>
      
      {/* Save button */}
      <div className="flex justify-end">
        {saveSuccess && (
          <div className="mr-4 py-2 px-4 bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 rounded-md animate-fade-in">
            Settings saved successfully!
          </div>
        )}
        <button
          onClick={handleSave}
          className="btn-primary flex items-center"
        >
          <FiSave className="mr-2" /> Save Settings
        </button>
      </div>
      
      {/* Reset confirmation modal */}
      {showConfirmReset && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          {/* Backdrop */}
          <div 
            className="fixed inset-0 bg-black bg-opacity-50 transition-opacity"
            onClick={() => setShowConfirmReset(false)}
          ></div>
          
          {/* Modal */}
          <div className="flex items-center justify-center min-h-screen p-4">
            <div 
              className="bg-white dark:bg-gray-900 rounded-lg shadow-xl max-w-md w-full p-6 relative transform transition-all animate-fade-in"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center mb-4">
                <FiAlertTriangle className="h-6 w-6 text-yellow-500 mr-2" />
                <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                  Reset Settings
                </h3>
              </div>
              
              <p className="mb-4 text-gray-600 dark:text-gray-400">
                Are you sure you want to reset all settings to their default values? This action cannot be undone.
              </p>
              
              <div className="flex justify-end space-x-3">
                <button
                  onClick={() => setShowConfirmReset(false)}
                  className="btn-secondary"
                >
                  Cancel
                </button>
                <button
                  onClick={handleReset}
                  className="btn bg-yellow-500 hover:bg-yellow-600 text-white"
                >
                  Reset
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      
      {/* Delete confirmation modal */}
      {showConfirmDelete && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          {/* Backdrop */}
          <div 
            className="fixed inset-0 bg-black bg-opacity-50 transition-opacity"
            onClick={() => setShowConfirmDelete(false)}
          ></div>
          
          {/* Modal */}
          <div className="flex items-center justify-center min-h-screen p-4">
            <div 
              className="bg-white dark:bg-gray-900 rounded-lg shadow-xl max-w-md w-full p-6 relative transform transition-all animate-fade-in"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center mb-4">
                <FiAlertTriangle className="h-6 w-6 text-red-500 mr-2" />
                <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                  Delete All Data
                </h3>
              </div>
              
              <p className="mb-4 text-gray-600 dark:text-gray-400">
                Are you sure you want to delete all your bookmarks and settings? This action cannot be undone.
              </p>
              
              <div className="flex justify-end space-x-3">
                <button
                  onClick={() => setShowConfirmDelete(false)}
                  className="btn-secondary"
                >
                  Cancel
                </button>
                <button
                  onClick={handleDeleteData}
                  className="btn bg-red-600 hover:bg-red-700 text-white"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Settings