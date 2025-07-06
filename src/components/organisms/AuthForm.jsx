import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Link, useNavigate } from 'react-router-dom';
import Typography from '../atoms/Typography';
import FormField from '../molecules/FormField';
import PhoneInput from '../molecules/PhoneInput';
import Button from '../atoms/Button';
import SocialButton from '../molecules/SocialButton';
import LoadingSpinner from '../atoms/LoadingSpinner';

const AuthForm = ({
  type = 'login', // 'login' or 'register'
  onSubmit,
  loading = false
}) => {
  const [formData, setFormData] = useState({
    ...(type === 'register' && { fullName: '' }),
    email: '',
    ...(type === 'register' && { phone: '' }),
    password: '',
    ...(type === 'register' && { confirmPassword: '' })
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (type === 'register') {
      // Validasi nama lengkap minimal 2 kata
      if (formData.fullName.trim().split(' ').length < 2) {
        alert('Nama lengkap harus terdiri dari minimal 2 kata!');
        return;
      }
      
      // Validasi nomor telepon
      if (formData.phone.length < 8) {
        alert('Nomor telepon tidak valid! Minimal 8 digit.');
        return;
      }
      
      if (formData.password !== formData.confirmPassword) {
        alert('Password dan Konfirmasi Password tidak sama!');
        return;
      }
    }

    // Validasi email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      alert('Format email tidak valid! Mohon masukkan email yang benar.');
      return;
    }
    
    // Validasi password minimal 6 karakter
    if (formData.password.length < 6) {
      alert('Password minimal harus 6 karakter!');
      return;
    }
    
    onSubmit(formData);
  };

  return (
    <div className="bg-white p-6 sm:p-8 rounded-sm w-full max-w-lg border border-[#F1F1F1]">
      <div className="text-center mb-10">
        <Typography variant="h3">
          {type === 'login' ? 'Masuk ke Akun' : 'Pendaftaran Akun'}
        </Typography>
        <Typography variant="body1" color="secondary" className="mt-2">
          {type === 'login'
            ? 'Yuk, lanjutin belajarmu di videobelajar.'
            : 'Yuk, daftarkan akunmu sekarang juga!'}
        </Typography>
      </div>

      <form onSubmit={handleSubmit} className="mb-4">
        {type === 'register' && (
          <FormField
            label="Nama Lengkap"
            type="text"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            required
          />
        )}

        <FormField
          label="E-mail"
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
        />

        {type === 'register' && (
          <div className="mb-5">
            <label className="block mb-1">
              <Typography variant="body1" color="secondary">
                No. Hp <span className="text-[#D32E1F]">*</span>
              </Typography>
            </label>
            <PhoneInput
              value={formData.phone}
              onChange={(value) => {
                // Remove leading zero after country code if present
                var newValue = value;
                if (value.charAt(3) === '0') {
                  newValue = value.slice(0, 3) + value.slice(4);
                }
                setFormData(prev => ({ ...prev, phone: newValue }));
              }}
              required
              name="phone"
              id="phone"
            />
          </div>
        )}

        <FormField
          label="Kata Sandi"
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          required
        />

        {type === 'register' && (
          <FormField
            label="Konfirmasi Kata Sandi"
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
          />
        )}

        {type === 'register' && (
          <div className="text-right mb-5">
            <Link to="/forgot-password" className="text-[#4A505C] hover:text-[#3ECF4C] transition-colors">
              Lupa Password?
            </Link>
          </div>
        )}

        {type === 'login' && (
          <div className="text-right mb-5">
            <Link to="/forgot-password" className="text-[#4A505C] hover:text-[#3ECF4C] transition-colors">
              Lupa Password?
            </Link>
          </div>
        )}

        <Button
          type="submit"
          variant="primary"
          className="w-full mb-4"
          disabled={loading}
        >
          {loading ? (
            <div className="flex items-center justify-center gap-2">
              <LoadingSpinner size="small" color="white" />
              <span>Memproses...</span>
            </div>
          ) : (
            type === 'login' ? 'Masuk' : 'Daftar'
          )}
        </Button>

        <Button
          type="button"
          variant="secondary"
          className="w-full"
          onClick={() => window.location.href = type === 'login' ? '/register' : '/login'}
        >
          {type === 'login' ? 'Daftar' : 'Masuk'}
        </Button>
      </form>

      <div className="flex items-center my-4 mb-4">
        <hr className="flex-grow border-t border-[#F1F1F1]" />
        <Typography color="secondary" className="px-2">atau</Typography>
        <hr className="flex-grow border-t border-[#F1F1F1]" />
      </div>

      <SocialButton
        icon="/assets/login/icon-google.png"
        onClick={() => {/* Implement Google Auth */}}
      >
        {type === 'login' ? 'Masuk' : 'Daftar'} dengan Google
      </SocialButton>
    </div>
  );
};

AuthForm.propTypes = {
  type: PropTypes.oneOf(['login', 'register']),
  onSubmit: PropTypes.func.isRequired,
  loading: PropTypes.bool
};

export default AuthForm;
