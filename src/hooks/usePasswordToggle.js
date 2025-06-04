import { useState } from 'react';

/**
 * Custom hook for managing password visibility toggle
 * @returns {Object} Object containing visibility state and toggle function
 */
const usePasswordToggle = () => {
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => {
    setIsVisible(prev => !prev);
  };

  return {
    isVisible,
    toggleVisibility,
    inputType: isVisible ? 'text' : 'password'
  };
};

export default usePasswordToggle;
