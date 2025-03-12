import { useState, useEffect } from 'react';
import { FiUser, FiMail, FiEdit2, FiSave, FiX } from 'react-icons/fi';
import { updateUserProfile } from '../services/auth_service';

const Profile = () => {
  const [user, setUser] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    username: ''
  });

  useEffect(() => {
    // Get user data from localStorage
    const userData = JSON.parse(localStorage.getItem('user') || '{}');
    setUser(userData);
    setFormData(userData);
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      const response = await updateUserProfile(formData);
      if (response.status !== "error") {
        setSuccess('Profile updated successfully!');
        // Update local storage with new user data
        localStorage.setItem('user', JSON.stringify(formData));
        setUser(formData);
        setIsEditing(false);
      } else {
        setError(response?.msg || 'Failed to update profile');
      }
    } catch (err) {
      setError('An error occurred while updating profile');
    } finally {
      setLoading(false);
    }
  };

  const cancelEdit = () => {
    setFormData(user);
    setIsEditing(false);
    setError('');
  };

  if (!user) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Profile</h1>
        <p className="text-gray-600 dark:text-gray-400">
          View and manage your profile information
        </p>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
        <div className="p-6">
          {/* Profile Header */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center">
              <div className="h-20 w-20 bg-primary/10 rounded-full flex items-center justify-center text-primary">
                <FiUser className="h-10 w-10" />
              </div>
              <div className="ml-4">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                  {user.name}
                </h2>
                <p className="text-gray-600 dark:text-gray-400">
                  @{user.username}
                </p>
              </div>
            </div>
            {!isEditing && (
              <button
                onClick={() => setIsEditing(true)}
                className="btn-secondary flex items-center"
              >
                <FiEdit2 className="mr-2" /> Edit Profile
              </button>
            )}
          </div>

          {/* Success/Error Messages */}
          {success && (
            <div className="mb-4 p-3 bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-200 rounded-md">
              {success}
            </div>
          )}
          {error && (
            <div className="mb-4 p-3 bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-200 rounded-md">
              {error}
            </div>
          )}

          {/* Profile Form */}
          <form onSubmit={handleUpdate}>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Name
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FiUser className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    className={`input pl-10 ${!isEditing ? 'bg-gray-50 dark:bg-gray-700' : ''}`}
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Email
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FiMail className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    className={`input pl-10 ${!isEditing ? 'bg-gray-50 dark:bg-gray-700' : ''}`}
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Username
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FiUser className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    name="username"
                    value={formData.username}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    className={`input pl-10 ${!isEditing ? 'bg-gray-50 dark:bg-gray-700' : ''}`}
                  />
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            {isEditing && (
              <div className="mt-6 flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={cancelEdit}
                  className="btn-secondary flex items-center"
                  disabled={loading}
                >
                  <FiX className="mr-2" /> Cancel
                </button>
                <button
                  type="submit"
                  className="btn-primary flex items-center"
                  disabled={loading}
                >
                  {loading ? (
                    <div className="h-5 w-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  ) : (
                    <>
                      <FiSave className="mr-2" /> Save Changes
                    </>
                  )}
                </button>
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default Profile;