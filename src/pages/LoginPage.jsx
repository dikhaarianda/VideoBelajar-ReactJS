import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import AuthTemplate from '../components/templates/AuthTemplate';
import AuthForm from '../components/organisms/AuthForm';

export default function LoginPage() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = (formData) => {
    const { email, password } = formData;
    
    if (login(email, password)) {
      navigate('/home');
    } else {
      console.error('Login failed');
    }
  };

  return (
    <AuthTemplate>
      <AuthForm 
        type="login"
        onSubmit={handleSubmit}
      />
    </AuthTemplate>
  );
}
