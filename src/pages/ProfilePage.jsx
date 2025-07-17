import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { 
  fetchUsers, 
  updateUserProfile, 
  deleteUserAccount, 
  logoutUser
} from '../store/redux/userSlice';
import MainTemplate from '../components/templates/MainTemplate';
import Typography from '../components/atoms/Typography';
import Button from '../components/atoms/Button';
import LoadingScreen from '../components/organisms/LoadingScreen';

export default function ProfilePage() {
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [activeTab, setActiveTab] = useState('profile');
  const [loading, setLoading] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [saving, setSaving] = useState(false);
  const [currentUserId, setCurrentUserId] = useState(null);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    countryCode: '+62'
  });
  const [originalData, setOriginalData] = useState({
    fullName: '',
    email: '',
    phone: '',
    countryCode: '+62'
  });

  const isAdmin = () => {
    return currentUser?.role === 'admin';
  };

  useEffect(() => {
    if (!currentUser) {
      navigate('/login');
      return;
    }

    const tab = searchParams.get('tab');
    if (tab) {
      setActiveTab(tab);
    }

    // Set form data directly from currentUser to avoid infinite loops
    const userData = {
      fullName: currentUser.name || '',
      email: currentUser.email || '',
      phone: currentUser.telp || '',
      countryCode: '+62'
    };
    setFormData(userData);
    setOriginalData(userData);
    setCurrentUserId(currentUser.id);
  }, [currentUser, navigate, searchParams]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleCancel = () => {
    const confirmCancel = confirm('Apakah Anda yakin ingin membatalkan perubahan?');
    if (confirmCancel) {
      setFormData(originalData);
      setIsEditing(false);
    }
  };

  const handleSave = async () => {
    if (!formData.fullName.trim()) {
      alert('Nama lengkap tidak boleh kosong!');
      return;
    }

    if (!formData.phone.trim()) {
      alert('Nomor telepon tidak boleh kosong!');
      return;
    }

    const confirmSave = confirm('Apakah Anda yakin ingin menyimpan perubahan data profil?');
    if (!confirmSave) {
      return;
    }

    try {
      setSaving(true);
      
      const updateData = {
        name: formData.fullName,
        email: formData.email,
        telp: formData.phone
      };

      const result = await dispatch(updateUserProfile({ 
        userId: currentUserId, 
        userData: updateData 
      }));
      
      if (updateUserProfile.fulfilled.match(result)) {
        setOriginalData(formData);
        setIsEditing(false);
        alert('Data profil berhasil diperbarui!');
      } else {
        alert(`Gagal memperbarui data profil: ${result.payload || 'Silakan coba lagi.'}`);
      }
    } catch (error) {
      console.error('Error updating profile:', error);
      alert('Gagal memperbarui data profil. Silakan coba lagi.');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    const confirmDelete = confirm('⚠️ PERINGATAN!\n\nApakah Anda yakin ingin menghapus akun ini?\n\nTindakan ini tidak dapat dibatalkan dan semua data Anda akan hilang permanen.');
    
    if (!confirmDelete) {
      return;
    }

    const doubleConfirm = prompt('Konfirmasi sekali lagi:\n\nAnda benar-benar yakin ingin menghapus akun ini?\n\nKetik "HAPUS" jika Anda yakin.');
    
    if (doubleConfirm !== "HAPUS") {
      alert('Akun Tidak Berhasil Dihapus');
      return;
    }

    try {
      setSaving(true);
      
      const result = await dispatch(deleteUserAccount(currentUserId));
      
      if (deleteUserAccount.fulfilled.match(result)) {
        alert('Akun berhasil dihapus. Anda akan diarahkan ke halaman utama.');
        dispatch(logoutUser());
        navigate('/home');
      } else {
        alert(`Gagal menghapus akun: ${result.payload || 'Silakan coba lagi.'}`);
      }
    } catch (error) {
      console.error('Error deleting account:', error);
      alert('Gagal menghapus akun. Silakan coba lagi.');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <MainTemplate>
        <LoadingScreen 
          message="Loading profile..." 
          size="large" 
          color="primary"
        />
      </MainTemplate>
    );
  }

  if (!currentUser) {
    return null;
  }

  return (
    <MainTemplate>
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <Typography variant="h6" className="mb-4 font-semibold">
                Ubah Profil
              </Typography>
              <Typography variant="body2" color="secondary" className="mb-6">
                Ubah data diri Anda
              </Typography>
              
              <div className="space-y-2">
                <button
                  onClick={() => setActiveTab('profile')}
                  className={`w-full flex items-center gap-3 p-3 rounded-lg text-left transition-colors ${
                    activeTab === 'profile' 
                      ? 'bg-yellow-100 text-yellow-800 border border-yellow-200' 
                      : 'text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  <i className="fas fa-user"></i>
                  <span>Profil Saya</span>
                </button>
                
                <button
                  onClick={() => setActiveTab('courses')}
                  className={`w-full flex items-center gap-3 p-3 rounded-lg text-left transition-colors ${
                    activeTab === 'courses' 
                      ? 'bg-yellow-100 text-yellow-800 border border-yellow-200' 
                      : 'text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  <i className="fas fa-graduation-cap"></i>
                  <span>Kelas Saya</span>
                </button>
                
                <button
                  onClick={() => setActiveTab('messages')}
                  className={`w-full flex items-center gap-3 p-3 rounded-lg text-left transition-colors ${
                    activeTab === 'messages' 
                      ? 'bg-yellow-100 text-yellow-800 border border-yellow-200' 
                      : 'text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  <i className="fas fa-envelope"></i>
                  <span>Pesan Saya</span>
                </button>
              </div>
            </div>
          </div>

          <div className="lg:col-span-3">
            {activeTab === 'profile' && (
              <div className="bg-white rounded-lg border border-gray-200 p-8">
                <div className="flex items-start gap-6 mb-8">
                  <div className="flex-shrink-0">
                    <img
                      src="/assets/index/Avatar.png"
                      alt="Profile"
                      className="w-20 h-20 rounded-lg object-cover"
                    />
                  </div>
                  
                  <div className="flex-1">
                    <Typography variant="h5" className="font-semibold mb-1">
                      {formData.fullName || 'Nama Pengguna'}
                    </Typography>
                    <Typography variant="body2" color="secondary" className="mb-3">
                      {formData.email}
                    </Typography>
                    <button className="text-orange-500 text-sm font-medium hover:text-orange-600">
                      Ganti Foto Profil
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block mb-2">
                      <Typography variant="body2" className="font-medium text-gray-700">
                        Nama Lengkap
                      </Typography>
                    </label>
                    <input
                      type="text"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleInputChange}
                      disabled={!isEditing || isAdmin()}
                      className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 ${
                        isEditing && !isAdmin()
                          ? 'border-green-300 bg-white' 
                          : 'border-gray-300 bg-gray-50 cursor-not-allowed'
                      }`}
                      placeholder="Masukkan nama lengkap"
                    />
                  </div>

                  <div>
                    <label className="block mb-2">
                      <Typography variant="body2" className="font-medium text-gray-700">
                        E-Mail
                      </Typography>
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 bg-gray-50"
                      placeholder="Masukkan email"
                      readOnly
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className="block mb-2">
                      <Typography variant="body2" className="font-medium text-gray-700">
                        No. Hp
                      </Typography>
                    </label>
                    <div className="flex gap-2">
                      <select
                        name="countryCode"
                        value={formData.countryCode}
                        onChange={handleInputChange}
                        disabled={!isEditing || isAdmin()}
                        className={`px-3 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 ${
                          isEditing && !isAdmin()
                            ? 'border-gray-300 bg-white' 
                            : 'border-gray-300 bg-gray-50 cursor-not-allowed'
                        }`}
                      >
                        <option value="+62">+62</option>
                        <option value="+1">+1</option>
                        <option value="+44">+44</option>
                        <option value="+86">+86</option>
                      </select>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        disabled={!isEditing || isAdmin()}
                        className={`flex-1 px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 ${
                          isEditing && !isAdmin()
                            ? 'border-gray-300 bg-white' 
                            : 'border-gray-300 bg-gray-50 cursor-not-allowed'
                        }`}
                        placeholder="Masukkan nomor telepon"
                      />
                    </div>
                  </div>
                </div>

                <div className="flex justify-end gap-4 mt-8">
                  {isAdmin() ? (
                    <div className="text-center py-4">
                      <Typography variant="body2" color="secondary" className="text-gray-500">
                        Akun admin tidak dapat mengubah atau menghapus data profil
                      </Typography>
                    </div>
                  ) : isEditing ? (
                    <>
                      <Button
                        variant="secondary"
                        onClick={handleCancel}
                        disabled={saving}
                        className="px-6 py-3 border border-gray-300 text-gray-700 hover:bg-gray-50 font-medium"
                      >
                        Batal
                      </Button>
                      <Button
                        variant="primary"
                        onClick={handleSave}
                        disabled={saving}
                        className="px-8 py-3 bg-green-500 hover:bg-green-600 text-white font-medium disabled:opacity-50"
                      >
                        {saving ? 'Menyimpan...' : 'Simpan'}
                      </Button>
                    </>
                  ) : (
                    <>
                      <Button
                        variant="danger"
                        onClick={handleDelete}
                        disabled={saving}
                        className="px-6 py-3 bg-red-500 hover:bg-red-600 text-white font-medium disabled:opacity-50"
                      >
                        {saving ? 'Menghapus...' : 'Hapus Akun'}
                      </Button>
                      <Button
                        variant="primary"
                        onClick={handleEdit}
                        disabled={saving}
                        className="px-8 py-3 bg-blue-500 hover:bg-blue-600 text-white font-medium disabled:opacity-50"
                      >
                        Ubah
                      </Button>
                    </>
                  )}
                </div>
              </div>
            )}

            {activeTab === 'courses' && (
              <div className="bg-white rounded-lg border border-gray-200 p-8">
                <Typography variant="h5" className="font-semibold mb-6">
                  Kelas Saya
                </Typography>
                <div className="text-center py-12">
                  <i className="fas fa-graduation-cap text-gray-300 text-6xl mb-4"></i>
                  <Typography variant="body1" color="secondary">
                    Anda belum memiliki kelas yang diikuti
                  </Typography>
                </div>
              </div>
            )}

            {activeTab === 'messages' && (
              <div className="bg-white rounded-lg border border-gray-200 p-8">
                <Typography variant="h5" className="font-semibold mb-6">
                  Pesan Saya
                </Typography>
                <div className="text-center py-12">
                  <i className="fas fa-envelope text-gray-300 text-6xl mb-4"></i>
                  <Typography variant="body1" color="secondary">
                    Tidak ada pesan baru
                  </Typography>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </MainTemplate>
  );
}
