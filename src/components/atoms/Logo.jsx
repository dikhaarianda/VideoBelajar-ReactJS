import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const Logo = ({ to = '/', className = 'h-12' }) => {
  return (
    <Link to={to}>
      <img
        src="/assets/logo.png"
        alt="Logo"
        className={`transition-transform duration-300 hover:scale-105 outline-none ${className}`}
      />
    </Link>
  );
};

Logo.propTypes = {
  to: PropTypes.string,
  className: PropTypes.string
};

export default Logo;
