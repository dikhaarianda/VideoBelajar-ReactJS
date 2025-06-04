import React from 'react';
import PropTypes from 'prop-types';
import Typography from '../atoms/Typography';
import Input from '../atoms/Input';
import PasswordInput from './PasswordInput';

const FormField = ({
  label,
  type = 'text',
  required = false,
  error = '',
  className = '',
  ...inputProps
}) => {
  const InputComponent = type === 'password' ? PasswordInput : Input;

  return (
    <div className={`mb-5 ${className}`}>
      <label className="block mb-1">
        <Typography variant="body1" color="secondary">
          {label} {required && <span className="text-[#D32E1F]">*</span>}
        </Typography>
      </label>

      <InputComponent
        type={type}
        required={required}
        {...inputProps}
      />

      {error && (
        <Typography variant="caption" color="error" className="mt-1">
          {error}
        </Typography>
      )}
    </div>
  );
};

FormField.propTypes = {
  label: PropTypes.string.isRequired,
  type: PropTypes.string,
  required: PropTypes.bool,
  error: PropTypes.string,
  className: PropTypes.string,
};

export default FormField;
