import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { User, Mail, MapPin, Calendar, Camera, Save, X } from 'lucide-react';

export const ProfileEdit = () => {
  const [profileData, setProfileData] = useState({
    name: '',
    email: '',
    location: '',
    joinDate: '',
    avatar: ''
  });

  const [isEditing, setIsEditing] = useState(false);
  const [previewImage, setPreviewImage] = useState<string | null>(null);

  useEffect(() => {
    // Load user data from localStorage or API
    const userData = JSON.parse(localStorage.getItem('user') || '{}');
    setProfileData({
      name: userData.name || 'User Name',
      email: userData.email || 'user@example.com',
      location: userData.location || 'Not set',
      joinDate: userData.joinDate || new Date().toLocaleDateString(),
      avatar: userData.avatar || ''
    });
  }, []);

  const handleInputChange = (field: string, value: string) => {
    setProfileData(prev => ({ ...prev, [field]: value }));
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result as string);
        setProfileData(prev => ({ ...prev, avatar: reader.result as string }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = () => {
    // Save to localStorage (in production, this would be an API call)
    const currentUser = JSON.parse(localStorage.getItem('user') || '{}');
    const updatedUser = { ...currentUser, ...profileData };
    localStorage.setItem('user', JSON.stringify(updatedUser));
    setIsEditing(false);
    
    // Dispatch custom event to notify ProfilePanel of update
    window.dispatchEvent(new CustomEvent('profileUpdated', { detail: updatedUser }));
    
    // Show success message
    alert('Profile updated successfully!');
  };

  const handleCancel = () => {
    // Reload original data
    const userData = JSON.parse(localStorage.getItem('user') || '{}');
    setProfileData({
      name: userData.name || 'User Name',
      email: userData.email || 'user@example.com',
      location: userData.location || 'Not set',
      joinDate: userData.joinDate || new Date().toLocaleDateString(),
      avatar: userData.avatar || ''
    });
    setPreviewImage(null);
    setIsEditing(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-emerald-50/20 to-teal-50/30 p-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-4xl mx-auto"
      >
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent mb-2">
            Profile Settings
          </h1>
          <p className="text-gray-600">Manage your account information</p>
        </div>

        {/* Main Card */}
        <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl border border-gray-200/50 overflow-hidden">
          {/* Profile Header Section */}
          <div className="relative h-48 bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500">
            <div className="absolute inset-0 bg-black/10"></div>
            
            {/* Avatar */}
            <div className="absolute -bottom-16 left-8">
              <div className="relative">
                <div className="w-32 h-32 rounded-full bg-white p-2 shadow-2xl">
                  {previewImage || profileData.avatar ? (
                    <img
                      src={previewImage || profileData.avatar}
                      alt="Profile"
                      className="w-full h-full rounded-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full rounded-full bg-gradient-to-br from-emerald-400 to-teal-500 flex items-center justify-center">
                      <User className="w-16 h-16 text-white" />
                    </div>
                  )}
                </div>
                
                {isEditing && (
                  <label className="absolute bottom-0 right-0 bg-emerald-500 hover:bg-emerald-600 text-white rounded-full p-2 cursor-pointer shadow-lg transition-colors">
                    <Camera className="w-5 h-5" />
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                    />
                  </label>
                )}
              </div>
            </div>

            {/* Edit Button */}
            <div className="absolute top-4 right-4">
              {!isEditing ? (
                <button
                  onClick={() => setIsEditing(true)}
                  className="bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white px-6 py-2 rounded-full transition-colors flex items-center gap-2 border border-white/30"
                >
                  <User className="w-4 h-4" />
                  Edit Profile
                </button>
              ) : (
                <div className="flex gap-2">
                  <button
                    onClick={handleCancel}
                    className="bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white px-4 py-2 rounded-full transition-colors flex items-center gap-2 border border-white/30"
                  >
                    <X className="w-4 h-4" />
                    Cancel
                  </button>
                  <button
                    onClick={handleSave}
                    className="bg-white hover:bg-gray-100 text-emerald-600 px-4 py-2 rounded-full transition-colors flex items-center gap-2 font-medium"
                  >
                    <Save className="w-4 h-4" />
                    Save
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Form Section */}
          <div className="pt-20 px-8 pb-8">
            <div className="space-y-6">
              {/* Name Field */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Full Name
                </label>
                <div className="relative">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    value={profileData.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    disabled={!isEditing}
                    className={`w-full pl-12 pr-4 py-3 rounded-xl border ${
                      isEditing
                        ? 'border-emerald-300 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200'
                        : 'border-gray-200 bg-gray-50'
                    } outline-none transition-all`}
                  />
                </div>
              </div>

              {/* Email Field */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="email"
                    value={profileData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    disabled={!isEditing}
                    className={`w-full pl-12 pr-4 py-3 rounded-xl border ${
                      isEditing
                        ? 'border-emerald-300 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200'
                        : 'border-gray-200 bg-gray-50'
                    } outline-none transition-all`}
                  />
                </div>
              </div>

              {/* Location Field */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Location
                </label>
                <div className="relative">
                  <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    value={profileData.location}
                    onChange={(e) => handleInputChange('location', e.target.value)}
                    disabled={!isEditing}
                    className={`w-full pl-12 pr-4 py-3 rounded-xl border ${
                      isEditing
                        ? 'border-emerald-300 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200'
                        : 'border-gray-200 bg-gray-50'
                    } outline-none transition-all`}
                  />
                </div>
              </div>

              {/* Join Date (Read-only) */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Member Since
                </label>
                <div className="relative">
                  <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    value={profileData.joinDate}
                    disabled
                    className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 bg-gray-50 outline-none"
                  />
                </div>
              </div>
            </div>

            {/* Stats Preview */}
            <div className="mt-8 pt-8 border-t border-gray-200">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Account Statistics</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-xl p-4 border border-emerald-200/50">
                  <p className="text-sm text-gray-600 mb-1">Total Emissions Tracked</p>
                  <p className="text-2xl font-bold text-emerald-600">1,234 kg CO₂</p>
                </div>
                <div className="bg-gradient-to-br from-teal-50 to-cyan-50 rounded-xl p-4 border border-teal-200/50">
                  <p className="text-sm text-gray-600 mb-1">Routes Calculated</p>
                  <p className="text-2xl font-bold text-teal-600">87</p>
                </div>
                <div className="bg-gradient-to-br from-cyan-50 to-blue-50 rounded-xl p-4 border border-cyan-200/50">
                  <p className="text-sm text-gray-600 mb-1">Badges Earned</p>
                  <p className="text-2xl font-bold text-cyan-600">12</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Additional Settings Card */}
        <div className="mt-6 bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-gray-200/50 p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Preferences</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-gray-800">Email Notifications</p>
                <p className="text-sm text-gray-600">Receive updates about your carbon footprint</p>
              </div>
              <label className="relative inline-block w-12 h-6">
                <input type="checkbox" className="sr-only peer" defaultChecked />
                <div className="w-full h-full bg-gray-300 peer-checked:bg-emerald-500 rounded-full peer transition-colors"></div>
                <div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full peer-checked:translate-x-6 transition-transform"></div>
              </label>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-gray-800">Weekly Reports</p>
                <p className="text-sm text-gray-600">Get weekly emission summaries</p>
              </div>
              <label className="relative inline-block w-12 h-6">
                <input type="checkbox" className="sr-only peer" defaultChecked />
                <div className="w-full h-full bg-gray-300 peer-checked:bg-emerald-500 rounded-full peer transition-colors"></div>
                <div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full peer-checked:translate-x-6 transition-transform"></div>
              </label>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};