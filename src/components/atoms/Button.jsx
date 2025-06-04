import React from 'react';
import PropTypes from 'prop-types';

const Button = ({
  children,
  variant = 'primary',
  className = '',
  type = 'button',
  onClick,
  disabled = false
}) => {
  const baseStyles = 'rounded-xl font-semibold transition-all duration-300 ease-in-out';

  const variants = {
    primary: 'bg-[#3ECF4C] text-white hover:bg-[#35b842] active:bg-[#2ea539] p-2',
    primary2: 'bg-[#FFBD3A] text-white hover:bg-[#e6a800] active:bg-[#cc9600] p-2',
    secondary: 'bg-[#E2FCD9CC] text-[#3ECF4C] hover:bg-[#d5f5c7] active:bg-[#c8eeb5] p-2',
    outline: 'border border-[#F1F1F1] text-[#4A505C] hover:bg-gray-50 active:bg-gray-100 p-2'
  };

  const variantStyle = variants[variant] || variants.primary;

  return (
    <button
      type={type}
      className={`${baseStyles} ${variantStyle} ${className}`}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

Button.propTypes = {
  children: PropTypes.node.isRequired,
  variant: PropTypes.oneOf(['primary', 'secondary', 'outline']),
  className: PropTypes.string,
  type: PropTypes.oneOf(['button', 'submit', 'reset']),
  onClick: PropTypes.func,
  disabled: PropTypes.bool
};

export default Button;
