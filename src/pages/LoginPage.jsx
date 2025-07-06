import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import AuthTemplate from '../components/templates/AuthTemplate';
import AuthForm from '../components/organisms/AuthForm';

export default function LoginPage() {
  const navigate = useNavigate();
  const { login, loading } = useAuth();

  const handleSubmit = async (formData) => {
    const { email, password } = formData;
    
    // Validasi input kosong
    if (!email || !password) {
      alert('Mohon lengkapi email dan password!');
      return;
    }
    
    const success = await login(email, password);
    if (success) {
      alert('Login berhasil! Selamat datang kembali.');
      navigate('/home');
    } else {
      alert('Login gagal! Email atau password yang Anda masukkan salah.');
    }
  };

  return (
    <AuthTemplate>
      <AuthForm 
        type="login"
        onSubmit={handleSubmit}
        loading={loading}
      />
    </AuthTemplate>
  );
}
