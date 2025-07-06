import React from 'react';
import PropTypes from 'prop-types';

const LoadingSpinner = ({ size = 'medium', color = 'primary', className = '' }) => {
  const getSizeStyle = () => {
    switch (size) {
      case 'small':
        return { width: '24px', height: '24px' };
      case 'large':
        return { width: '64px', height: '64px' };
      default:
        return { width: '48px', height: '48px' };
    }
  };

  const colorClass = `loader-${color}`;

  return (
    <span 
      className={`loader ${colorClass} ${className}`}
      style={getSizeStyle()}
    />
  );
};

LoadingSpinner.propTypes = {
  size: PropTypes.oneOf(['small', 'medium', 'large']),
  color: PropTypes.oneOf(['primary', 'white', 'green']),
  className: PropTypes.string
};

export default LoadingSpinner;
