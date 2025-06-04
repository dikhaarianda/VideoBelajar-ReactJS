import React from 'react';
import PropTypes from 'prop-types';
import Logo from '../atoms/Logo';

const AuthTemplate = ({ children }) => {
  return (
    <div className="bg-[#fffdf3] font-['DM Sans', sans-serif] min-h-screen flex flex-col">
      {/* Header */}
      <header className="bg-white shadow-lg sm:border-b border-[#F1F1F1] sm:shadow-none px-5 py-3 mb-8">
        <div className="container mx-auto flex items-center justify-between">
          <Logo />
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow flex items-center justify-center px-4 mb-8">
        {children}
      </main>
    </div>
  );
};

AuthTemplate.propTypes = {
  children: PropTypes.node.isRequired
};

export default AuthTemplate;
