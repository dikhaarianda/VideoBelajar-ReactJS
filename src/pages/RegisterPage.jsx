import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import AuthTemplate from '../components/templates/AuthTemplate';
import AuthForm from '../components/organisms/AuthForm';

export default function RegisterPage() {
  const navigate = useNavigate();
  const { register, loading } = useAuth();

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
    
    const success = await register(formData);
    if (success) {
      alert('Pendaftaran berhasil! Silakan login dengan akun baru Anda.');
      navigate('/login');
    } else {
      alert('Pendaftaran gagal! Email mungkin sudah terdaftar atau terjadi kesalahan. Silakan coba lagi.');
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
