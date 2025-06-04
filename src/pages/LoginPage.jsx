import React from 'react';
import AuthTemplate from '../components/templates/AuthTemplate';
import AuthForm from '../components/organisms/AuthForm';

export default function LoginPage() {
  const handleSubmit = (formData) => {
    // Implement login logic here
    console.log('Login form submitted:', formData);
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
