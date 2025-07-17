import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { registerUser, clearError } from '../store/redux/userSlice';
import AuthTemplate from '../components/templates/AuthTemplate';
import AuthForm from '../components/organisms/AuthForm';

export default function RegisterPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.user);

  const handleSubmit = async (formData) => {
    const { fullName, email, phone, password, confirmPassword } = formData;
    
    // Validasi input kosong
    if (!fullName || !email || !phone || !password || !confirmPassword) {
      alert('Mohon lengkapi semua field yang diperlukan!');
      return;
    }
    
    // Validasi password match
    if (password !== confirmPassword) {
      alert('Password dan Konfirmasi Password tidak sama!');
      return;
    }
    
    // Konfirmasi sebelum mendaftar
    const confirmRegister = confirm('Apakah Anda yakin ingin mendaftar dengan data ini?');
    if (!confirmRegister) {
      return;
    }
    
    // Clear previous errors
    dispatch(clearError());
    
    try {
      const result = await dispatch(registerUser(formData));
      
      if (registerUser.fulfilled.match(result)) {
        alert('Pendaftaran berhasil! Silakan login dengan akun baru Anda.');
        navigate('/login');
      } else {
        alert(`Pendaftaran gagal! ${result.payload || 'Email mungkin sudah terdaftar atau terjadi kesalahan. Silakan coba lagi.'}`);
      }
    } catch (error) {
      alert('Pendaftaran gagal! Terjadi kesalahan sistem.');
    }
  };

  return (
    <AuthTemplate>
      <AuthForm 
        type="register"
        onSubmit={handleSubmit}
        loading={loading}
      />
    </AuthTemplate>
  );
}
