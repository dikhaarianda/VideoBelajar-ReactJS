import React from 'react';
import PropTypes from 'prop-types';
import Button from '../atoms/Button';

const SocialButton = ({
  icon,
  children,
  onClick,
  className = '',
  disabled = false
}) => {
  return (
    <Button
      variant="outline"
      onClick={onClick}
      disabled={disabled}
      className={`flex items-center justify-center gap-2 w-full ${className}`}
    >
      <img src={icon} alt="Social Icon" className="h-4" />
      {children}
    </Button>
  );
};

SocialButton.propTypes = {
  icon: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  onClick: PropTypes.func,
  className: PropTypes.string,
  disabled: PropTypes.bool
};

export default SocialButton;
