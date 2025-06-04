import React from 'react';
import PropTypes from 'prop-types';

const Input = ({ 
  type = 'text',
  value,
  onChange,
  className = '',
  required = false,
  disabled = false,
  name,
  id
}) => {
  const baseStyles = 'w-full p-2 border border-[#F1F1F1] rounded transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-[#3ECF4C] focus:border-transparent hover:border-[#3ECF4C]';

  return (
    <input
      type={type}
      value={value}
      onChange={onChange}
      className={`${baseStyles} ${className}`}
      required={required}
      disabled={disabled}
      name={name}
      id={id}
    />
  );
};

Input.propTypes = {
  type: PropTypes.string,
  placeholder: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func,
  className: PropTypes.string,
  required: PropTypes.bool,
  disabled: PropTypes.bool,
  name: PropTypes.string,
  id: PropTypes.string
};

export default Input;
