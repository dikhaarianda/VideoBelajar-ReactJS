import React from 'react';
import PropTypes from 'prop-types';
import Logo from '../atoms/Logo';
import Typography from '../atoms/Typography';
import ProfileMenu from '../organisms/ProfileMenu';

const MainTemplate = ({ children }) => {
  return (
    <div className="bg-[#fffdf3] font-['DM_Sans',sans-serif] text-[16px] font-medium min-h-screen flex flex-col">
      {/* Header */}
      <header className="bg-white shadow-lg sm:border-b border-[#F1F1F1] sm:shadow-none px-5 py-3 mb-8">
        <nav className="container mx-auto flex items-center justify-between">
          <Logo to="/home" />
          <ProfileMenu />
        </nav>
      </header>

      {/* Main Content */}
      <main className="container mx-auto my-8 p-3 flex-grow">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-[#F1F1F1] px-5 sm:px-15 py-12 mt-auto">
        <div className="container mx-auto">
          <section className="flex flex-col md:flex-row justify-between gap-8 mb-6">
            <div className="md:w-1/2">
              <Logo className="mb-6 h-15" />
              <Typography variant="h6" className="mb-2">
                Gali Potensi Anda Melalui Pembelajaran Video di hariesok.id!
              </Typography>
              <address className="not-italic text-[#222325] font-normal">
                <Typography variant="body1" className="mb-2">
                  Jl. Usman Effendi No. 50 Lowokwaru, Malang
                </Typography>
                <Typography variant="body1">
                  +62-877-7123-1234
                </Typography>
              </address>
            </div>

            <div className="flex flex-col sm:flex-row gap-2 sm:gap-8 md:gap-16">
              {[
                {
                  title: 'Kategori',
                  links: ['Digital & Teknologi', 'Pemasaran', 'Manajemen Bisnis', 'Pengembangan Diri', 'Desain']
                },
                {
                  title: 'Perusahaan',
                  links: ['Tentang Kami', 'FAQ', 'Kebijakan Privasi', 'Ketentuan Layanan', 'Bantuan']
                },
                {
                  title: 'Komunitas',
                  links: ['Tips Sukses', 'Blog']
                }
              ].map(section => (
                <section key={section.title}>
                  <Typography 
                    variant="h6" 
                    className="mb-2 hidden sm:block"
                  >
                    {section.title}
                  </Typography>
                  <button className="font-bold mb-2 flex sm:hidden w-full justify-between">
                    <span>{section.title}</span>
                    <span className="text-[#3A35418A]">{'>'}</span>
                  </button>
                  <ul className="space-y-1 hidden sm:block">
                    {section.links.map(link => (
                      <li key={link}>
                        <a href="#" className="text-[#333333AD] hover:text-[#3ECF4C] active:text-[#35b842] transition-colors">
                          {link}
                        </a>
                      </li>
                    ))}
                  </ul>
                </section>
              ))}
            </div>
          </section>

          <hr className="border-[#3A35411F] my-8" />

          <section className="flex flex-col-reverse sm:flex-row justify-between items-left sm:items-center gap-4">
            <Typography variant="body2" color="secondary">
              @2023 Gerobak Sayur All Rights Reserved.
            </Typography>
            <div className="flex gap-3">
              {[
                { href: '#', src: 'https://img.icons8.com/?size=100&id=102748&format=png&color=000000', alt: 'LinkedIn' },
                { href: '#', src: 'https://img.icons8.com/?size=100&id=87264&format=png&color=000000', alt: 'Facebook' },
                { href: '#', src: 'https://img.icons8.com/?size=100&id=32320&format=png&color=000000', alt: 'Instagram' },
                { href: '#', src: 'https://img.icons8.com/?size=100&id=437&format=png&color=000000', alt: 'Twitter' }
              ].map(({ href, src, alt }) => (
                <a 
                  key={alt} 
                  href={href} 
                  className="border-1 border-black rounded-full size-8 p-2 hover:bg-gray-100 transition-colors"
                >
                  <img src={src} alt={alt} className="size-full object-contain" />
                </a>
              ))}
            </div>
          </section>
        </div>
      </footer>
    </div>
  );
};

MainTemplate.propTypes = {
  children: PropTypes.node.isRequired
};

export default MainTemplate;
