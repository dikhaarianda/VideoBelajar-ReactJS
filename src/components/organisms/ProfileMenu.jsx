import React, { useState, useEffect, useRef } from 'react';
import { MdOutlineLogout } from "react-icons/md";
import { RxHamburgerMenu } from "react-icons/rx";
import Typography from '../atoms/Typography';

const ProfileMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };

  const handleScroll = () => {
    setIsOpen(false);
  };

  useEffect(() => {
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      window.addEventListener('scroll', handleScroll, true);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
      window.removeEventListener('scroll', handleScroll, true);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      window.removeEventListener('scroll', handleScroll, true);
    };
  }, [isOpen]);

  const menuItems = [
    { label: 'Profil Saya', href: '#' },
    { label: 'Kelas Saya', href: '#' },
    { label: 'Pesanan Saya', href: '#' },
    { label: 'Keluar', href: '/login', icon: MdOutlineLogout, className: 'text-red-500' }
  ];

  return (
    <div className="flex items-center justify-center gap-12 text-[#333333AD] text-[16px]">
      <a href="#" className="hidden sm:block hover:text-[#3ECF4C] active:text-[#35b842] transition-colors">
        Kategori
      </a>
      <div className="relative" ref={dropdownRef}>
        <button 
          onClick={() => setIsOpen(!isOpen)}
          className="transition-transform duration-300 ease-in-out hover:scale-105 active:scale-95"
        >
          <img 
            src="/assets/index/Avatar.png" 
            alt="User Profile" 
            className="hidden sm:block"
          />
          <RxHamburgerMenu size={30} className="sm:hidden block" />
        </button>

        {isOpen && (
          <>
            {/* Desktop Menu */}
            <div className="hidden sm:block absolute right-0 mt-3 w-48 bg-white shadow-lg z-50 overflow-hidden">
              {menuItems.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  className={`flex items-center gap-2 px-4 py-2 hover:bg-gray-100 transition-colors border-b border-gray-300 ${
                    item.className || ''
                  }`}
                >
                  <Typography variant="body1" color="secondary">
                    {item.label}
                  </Typography>
                  {item.icon && <item.icon size={20} />}
                </a>
              ))}
            </div>

            {/* Mobile Menu */}
            <div className="sm:hidden fixed top-[70px] left-0 right-0 bg-white z-50 flex flex-col overflow-auto">
              <a 
                href="#" 
                className="px-5 py-4 border-b border-gray-300 hover:bg-gray-100 transition-colors"
              >
                Kategori
              </a>
              {menuItems.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  className={`flex items-center gap-2 px-5 py-4 border-b border-gray-300 hover:bg-gray-100 transition-colors ${
                    item.className || ''
                  }`}
                >
                  {item.label}
                  {item.icon && <item.icon size={20} />}
                </a>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ProfileMenu;
