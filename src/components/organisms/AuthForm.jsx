import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Link, useNavigate } from 'react-router-dom';
import Typography from '../atoms/Typography';
import FormField from '../molecules/FormField';
import PhoneInput from '../molecules/PhoneInput';
import Button from '../atoms/Button';
import SocialButton from '../molecules/SocialButton';

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
    onSubmit(formData);
    if (type === 'login') {
      navigate('/home');
    }
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
              onChange={(value) => setFormData(prev => ({ ...prev, phone: value }))}
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
          {type === 'login' ? 'Masuk' : 'Daftar'}
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
