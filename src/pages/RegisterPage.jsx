import React from 'react';
import AuthTemplate from '../components/templates/AuthTemplate';
import AuthForm from '../components/organisms/AuthForm';

export default function RegisterPage() {
  const handleSubmit = (formData) => {
    // Implement registration logic here
    console.log('Register form submitted:', formData);
  };

  return (
    <AuthTemplate>
      <AuthForm 
        type="register"
        onSubmit={handleSubmit}
      />
    </AuthTemplate>
  );
}
