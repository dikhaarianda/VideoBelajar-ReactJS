import React from 'react';
import PropTypes from 'prop-types';
import LoadingSpinner from '../atoms/LoadingSpinner';
import Typography from '../atoms/Typography';

const LoadingScreen = ({ 
  message = 'Loading...', 
  size = 'large', 
  color = 'primary',
  fullScreen = false,
  className = '' 
}) => {
  const containerClasses = fullScreen 
    ? 'fixed inset-0 bg-white bg-opacity-90 flex flex-col justify-center items-center z-50'
    : 'flex flex-col justify-center items-center h-64 gap-4';

  return (
    <div className={`${containerClasses} ${className}`}>
      <LoadingSpinner size={size} color={color} />
      <Typography variant="h3" className="mt-4">
        {message}
      </Typography>
    </div>
  );
};

LoadingScreen.propTypes = {
  message: PropTypes.string,
  size: PropTypes.oneOf(['small', 'medium', 'large']),
  color: PropTypes.oneOf(['primary', 'white', 'green']),
  fullScreen: PropTypes.bool,
  className: PropTypes.string
};

export default LoadingScreen;
