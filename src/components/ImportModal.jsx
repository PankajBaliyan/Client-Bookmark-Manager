import { useState } from 'react'
import { FiUpload, FiX } from 'react-icons/fi'

const ImportModal = ({ onClose }) => {
  const [isDragging, setIsDragging] = useState(false)
  const [selectedFile, setSelectedFile] = useState(null)
  const [fileType, setFileType] = useState('html')
  const [isImporting, setIsImporting] = useState(false)
  const [importProgress, setImportProgress] = useState(0)
  
  const handleDragOver = (e) => {
    e.preventDefault()
    setIsDragging(true)
  }
  
  const handleDragLeave = () => {
    setIsDragging(false)
  }
  
  const handleDrop = (e) => {
    e.preventDefault()
    setIsDragging(false)
    
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      setSelectedFile(e.dataTransfer.files[0])
    }
  }
  
  const handleFileSelect = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      setSelectedFile(e.target.files[0])
    }
  }
  
  const handleImport = () => {
    if (!selectedFile) return
    
    setIsImporting(true)
    
    // Simulate import progress
    let progress = 0
    const interval = setInterval(() => {
      progress += 10
      setImportProgress(progress)
      
      if (progress >= 100) {
        clearInterval(interval)
        setTimeout(() => {
          setIsImporting(false)
          onClose()
        }, 500)
      }
    }, 300)
  }

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black bg-opacity-50 transition-opacity"
        onClick={onClose}
      ></div>
      
      {/* Modal */}
      <div className="flex items-center justify-center min-h-screen p-4">
        <div 
          className="bg-white dark:bg-gray-900 rounded-lg shadow-xl max-w-md w-full p-6 relative transform transition-all animate-fade-in"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
            aria-label="Close modal"
          >
            <FiX className="h-5 w-5" />
          </button>
          
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Import Bookmarks</h2>
          
          {!isImporting ? (
            <>
              {/* File drop area */}
              <div
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                onClick={() => document.getElementById('file-input').click()}
                className={`mt-4 border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors duration-200 ${
                  isDragging 
                    ? 'border-primary bg-primary/5' 
                    : 'border-gray-300 dark:border-gray-700 hover:border-primary dark:hover:border-primary'
                }`}
              >
                <input
                  id="file-input"
                  type="file"
                  className="hidden"
                  onChange={handleFileSelect}
                  accept=".html,.xlsx,.csv"
                />
                
                <FiUpload className="mx-auto h-12 w-12 text-gray-400" />
                
                <p className="mt-4 text-sm text-gray-600 dark:text-gray-400">
                  Drag & Drop your files here or click to browse
                </p>
                
                {selectedFile && (
                  <div className="mt-4 p-2 bg-gray-100 dark:bg-gray-800 rounded text-left">
                    <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                      {selectedFile.name}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      {(selectedFile.size / 1024).toFixed(2)} KB
                    </p>
                  </div>
                )}
              </div>
              
              {/* File type selection */}
              <div className="mt-4">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  File Type
                </label>
                <select
                  value={fileType}
                  onChange={(e) => setFileType(e.target.value)}
                  className="input"
                >
                  <option value="html">HTML</option>
                  <option value="xlsx">Excel (xlsx)</option>
                  <option value="csv">CSV</option>
                </select>
              </div>
              
              {/* Import button */}
              <div className="mt-6 flex justify-end">
                <button
                  onClick={onClose}
                  className="btn-secondary mr-3"
                >
                  Cancel
                </button>
                <button
                  onClick={handleImport}
                  disabled={!selectedFile}
                  className={`btn-primary ${!selectedFile ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                  Import
                </button>
              </div>
            </>
          ) : (
            // Import progress
            <div className="py-8">
              <div className="relative pt-1">
                <div className="flex mb-2 items-center justify-between">
                  <div>
                    <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-primary bg-primary/10">
                      {importProgress < 50 ? 'Analyzing' : 'Processing'}
                    </span>
                  </div>
                  <div className="text-right">
                    <span className="text-xs font-semibold inline-block text-primary">
                      {importProgress}%
                    </span>
                  </div>
                </div>
                <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-primary/10">
                  <div 
                    style={{ width: `${importProgress}%` }}
                    className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-primary transition-all duration-500"
                  ></div>
                </div>
                <p className="text-center text-sm text-gray-600 dark:text-gray-400">
                  AI is analyzing your bookmarks...
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default ImportModal