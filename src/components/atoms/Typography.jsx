import React from 'react';
import PropTypes from 'prop-types';

const Typography = ({
  variant = 'body1',
  children,
  className = '',
  color = 'default'
}) => {
  const baseStyles = {
    h1: "font-['Poppins', sans-serif] text-[48px] font-bold",
    h2: "font-['Poppins', sans-serif] text-[32px] font-semibold",
    h3: "font-['Poppins', sans-serif] text-[28px] font-bold",
    h4: "font-['Poppins', sans-serif] text-[24px] font-semibold",
    h5: "font-['Poppins', sans-serif] text-[20px] font-semibold",
    h6: "font-['Poppins', sans-serif] text-[18px] font-semibold",
    body1: 'text-[16px]',
    body2: 'text-[14px]',
    caption: 'text-[12px]'
  };

  const colors = {
    default: 'text-[#222325]',
    secondary: 'text-[#333333AD]',
    white: 'text-white',
    primary: 'text-[#3ECF4C]',
    error: 'text-[#D32E1F]'
  };

  const Component = variant.startsWith('h') ? variant : 'p';

  return (
    <Component className={`${baseStyles[variant]} ${colors[color]} ${className}`}>
      {children}
    </Component>
  );
};

Typography.propTypes = {
  variant: PropTypes.oneOf(['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'body1', 'body2', 'caption']),
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  color: PropTypes.oneOf(['default', 'secondary', 'white', 'primary', 'error'])
};

export default Typography;
