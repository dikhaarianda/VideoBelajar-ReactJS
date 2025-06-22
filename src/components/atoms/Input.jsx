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
  id,
  placeholder = '',
  disableAutoFillOnFocus = false,
  ...rest
}) => {
  const baseStyles =
    'w-full p-2 border border-[#F1F1F1] rounded transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-[#3ECF4C] focus:border-transparent hover:border-[#3ECF4C]';
  
  const handleFocus = (e) => {
  if (e.target.value.trim() === '') {
    if (disableAutoFillOnFocus) return;
    e.target.value = placeholder;
    onChange({
      target: {
        name: e.target.name,
        value: placeholder,
      },
    });
  }
  };

  const handleBlur = (e) => {
    if (disableAutoFillOnFocus) return;
    if (e.target.value === placeholder) {
      onChange({
        target: {
          name: e.target.name,
          value: '',
        },
      });
    }
  };

  return (
    <input
      type={type}
      value={value}
      onChange={onChange}
      onFocus={handleFocus}
      onBlur={handleBlur}
      className={`${baseStyles} ${className}`}
      required={required}
      disabled={disabled}
      name={name}
      id={id}
      placeholder={placeholder}
      {...rest}
    />
  );
};

Input.propTypes = {
  type: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func,
  className: PropTypes.string,
  required: PropTypes.bool,
  disabled: PropTypes.bool,
  name: PropTypes.string,
  id: PropTypes.string,
  placeholder: PropTypes.string,
};

export default Input;
