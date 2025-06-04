import React from 'react';
import PropTypes from 'prop-types';
import Input from '../atoms/Input';
import usePasswordToggle from '../../hooks/usePasswordToggle';

const PasswordInput = ({
  value,
  onChange,
  className = '',
  required = false,
  name,
  id
}) => {
  const { isVisible, toggleVisibility, inputType } = usePasswordToggle();

  return (
    <div className="relative">
      <Input
        type={inputType}
        value={value}
        onChange={onChange}
        className={`pr-10 ${className}`}
        required={required}
        name={name}
        id={id}
      />
      <button
        type="button"
        onClick={toggleVisibility}
        aria-label={isVisible ? 'Hide Password' : 'Show Password'}
        className="absolute top-1/2 right-3 transform -translate-y-1/2 transition-opacity duration-300 hover:opacity-70 text-gray-600"
      >
        <i className={isVisible ? 'fas fa-eye' : 'fas fa-eye-slash'}></i>
      </button>
    </div>
  );
};

PasswordInput.propTypes = {
  value: PropTypes.string,
  onChange: PropTypes.func,
  placeholder: PropTypes.string,
  className: PropTypes.string,
  required: PropTypes.bool,
  name: PropTypes.string,
  id: PropTypes.string
};

export default PasswordInput;
