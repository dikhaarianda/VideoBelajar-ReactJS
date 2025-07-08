import React, { useState, useEffect, useRef } from 'react';
import { MdOutlineLogout } from "react-icons/md";
import { RxHamburgerMenu } from "react-icons/rx";
import Typography from '../atoms/Typography';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const ProfileMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  const { user, logout } = useAuth();
  const navigate = useNavigate();

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

  const handleMenuItemClick = (item) => {
    setIsOpen(false);
    
    if (item.label === 'Keluar') {
      logout();
      window.location.reload();
    } else {
      // If user is not logged in and clicks on profile-related items, redirect to login
      if (!user) {
        navigate('/login');
      } else {
        // Handle navigation for logged-in users
        switch (item.label) {
          case 'Profil Saya':
            navigate('/profile');
            break;
          case 'Kelas Saya':
            navigate('/profile');
            break;
          case 'Pesanan Saya':
            navigate('/profile');
            break;
          default:
            // console.log(`Navigate to ${item.label}`);
        }
      }
    }
  };

  // Filter menu items based on login status
  const getMenuItems = () => {
    const baseItems = [
      { label: 'Profil Saya' },
      { label: 'Kelas Saya' },
      { label: 'Pesanan Saya' }
    ];

    // Only show logout button if user is logged in
    if (user) {
      return [
        ...baseItems,
        { label: 'Keluar', icon: MdOutlineLogout, className: 'text-red-500' }
      ];
    }

    return baseItems;
  };

  const menuItems = getMenuItems();

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
            src={user ? "/assets/index/Avatar.png" : "/assets/index/Avatar1.png"}
            alt="User Profile" 
            className="hidden sm:block w-10 h-10 rounded-sm object-cover"
          />
          <RxHamburgerMenu size={30} className="sm:hidden block" />
        </button>

        {isOpen && (
          <>
            {/* Desktop Menu */}
            <div className="hidden sm:block absolute right-0 mt-3 w-48 bg-white shadow-lg z-50 overflow-hidden">
              {menuItems.map((item) => (
                <button
                  key={item.label}
                  onClick={() => handleMenuItemClick(item)}
                  className={`flex items-center gap-2 px-4 py-2 hover:bg-gray-100 transition-colors border-b border-gray-300 w-full text-left ${
                    item.className || ''
                  }`}
                >
                  <Typography variant="body1" color="secondary">
                    {item.label}
                  </Typography>
                  {item.icon && <item.icon size={20} />}
                </button>
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
                <button
                  key={item.label}
                  onClick={() => handleMenuItemClick(item)}
                  className={`flex items-center gap-2 px-5 py-4 border-b border-gray-300 hover:bg-gray-100 transition-colors w-full text-left ${
                    item.className || ''
                  }`}
                >
                  {item.label}
                  {item.icon && <item.icon size={20} />}
                </button>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ProfileMenu;
