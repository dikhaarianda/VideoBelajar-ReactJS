import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { loginUser, clearError } from '../store/redux/userSlice';
import AuthTemplate from '../components/templates/AuthTemplate';
import AuthForm from '../components/organisms/AuthForm';

export default function LoginPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.user);

  const handleSubmit = async (formData) => {
    const { email, password } = formData;
    
    // Validasi input kosong
    if (!email || !password) {
      alert('Mohon lengkapi email dan password!');
      return;
    }
    
    // Clear previous errors
    dispatch(clearError());
    
    try {
      const result = await dispatch(loginUser({ email, password }));
      
      if (loginUser.fulfilled.match(result)) {
        alert('Login berhasil! Selamat datang kembali.');
        navigate('/home');
      } else {
        alert(`Login gagal! ${result.payload || 'Email atau password yang Anda masukkan salah.'}`);
      }
    } catch (error) {
      alert('Login gagal! Terjadi kesalahan sistem.');
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
