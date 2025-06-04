import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';

const PhoneInput = ({ value, onChange, className = '', required = false, name, id }) => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [selectedCountry, setSelectedCountry] = useState({ code: 'ID', name: 'Indonesia', dial_code: '+62' });
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const countries = [
    { code: 'ID', name: 'Indonesia', dial_code: '+62' },
    { code: 'MY', name: 'Malaysia', dial_code: '+60' },
    { code: 'SG', name: 'Singapore', dial_code: '+65' },
    { code: 'TH', name: 'Thailand', dial_code: '+66' },
    { code: 'VN', name: 'Vietnam', dial_code: '+84' },
    { code: 'PH', name: 'Philippines', dial_code: '+63' },
    { code: 'KH', name: 'Cambodia', dial_code: '+855' },
    { code: 'LA', name: 'Laos', dial_code: '+856' },
    { code: 'MM', name: 'Myanmar', dial_code: '+95' },
  ];

  const handlePhoneChange = (e) => {
    const value = e.target.value.replace(/[^\d]/g, '');
    setPhoneNumber(value);
    if (onChange) {
      onChange(selectedCountry.dial_code + value);
    }
  };

  const handleCountrySelect = (country) => {
    setSelectedCountry(country);
    setIsDropdownOpen(false);
    if (onChange) {
      onChange(country.dial_code + phoneNumber);
    }
  };

  return (
    <div className={className}>
      <div className="flex gap-2 sm:gap-3 w-full">
        <div className="flex flex-[1.5] min-w-0">
          <div className="flex items-center justify-center flex-[0.3] h-11 bg-gray-100 border border-[#F1F1F1] rounded-l border-r-0">
            <div className="w-4 h-3 sm:w-5 sm:h-4 flex flex-col overflow-hidden">
              <div className="w-full h-2 bg-red-700"></div>
              <div className="w-full h-2 bg-white"></div>
            </div>
          </div>

          <div className="relative flex-[1.2] min-w-0" ref={dropdownRef}>
            <div 
              className="flex items-center justify-between h-11 px-2 bg-white border border-[#F1F1F1] rounded-r cursor-pointer hover:bg-gray-50 hover:border-[#3ECF4C] transition-all duration-300 ease-in-out"
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            >
              <span className="text-xs sm:text-sm text-gray-700 truncate">{selectedCountry.dial_code}</span>
              <svg 
                className={`w-3 h-3 text-gray-400 transition-transform ml-1 flex-shrink-0 ${isDropdownOpen ? 'rotate-180' : ''}`}
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M19 9l-7 7-7-7" 
                />
              </svg>
            </div>
            
            {isDropdownOpen && (
              <div className="absolute top-full left-0 sm:left-auto mt-1 bg-white border border-[#F1F1F1] rounded-md shadow-lg z-10 max-h-[180px] overflow-y-auto w-[50vw] sm:w-auto sm:min-w-[200px]">
                {countries.map((country) => (
                  <div
                    key={country.code}
                    className="flex items-center gap-2 px-3 py-2 hover:bg-gray-100 cursor-pointer whitespace-nowrap"
                    onClick={() => handleCountrySelect(country)}
                  >
                    <span className="text-sm">{country.dial_code}</span>
                    <span className="text-sm text-gray-600">{country.name}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        <input
          type="tel"
          value={phoneNumber}
          onChange={handlePhoneChange}
          required={required}
          name={name}
          id={id}
          className="flex-[3] min-w-0 h-11 px-2 sm:px-3 text-sm border border-[#F1F1F1] rounded transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-[#3ECF4C] focus:border-transparent hover:border-[#3ECF4C]"
        />
      </div>
    </div>
  );
};

PhoneInput.propTypes = {
  value: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  className: PropTypes.string,
  required: PropTypes.bool,
  name: PropTypes.string,
  id: PropTypes.string
};

export default PhoneInput;