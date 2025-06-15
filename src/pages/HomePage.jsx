import React, { useState } from 'react';
import MainTemplate from '../components/templates/MainTemplate';
import Typography from '../components/atoms/Typography';
import Button from '../components/atoms/Button';
import CourseCard from '../components/organisms/CourseCard';
import { useCourses } from '../context/CourseContext';

export default function HomePage() {
  const { courses } = useCourses();
  const [activeCategory, setActiveCategory] = useState('Semua Kelas');
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterMessage, setNewsletterMessage] = useState('');

  const categories = ['Semua Kelas', 'Pemasaran', 'Desain', 'Pengembangan Diri', 'Bisnis'];

  const filteredCourses = activeCategory === 'Semua Kelas' 
    ? courses 
    : courses.filter(course => course.category === activeCategory);

  const handleCategoryClick = (category) => {
    setActiveCategory(category);
  };

  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    if (!newsletterEmail) {
      setNewsletterMessage('Email tidak boleh kosong!');
      return;
    }
    if (!/\S+@\S+\.\S+/.test(newsletterEmail)) {
      setNewsletterMessage('Format email tidak valid!');
      return;
    }
    setNewsletterMessage('Terima kasih! Anda telah berlangganan newsletter kami.');
    setNewsletterEmail('');
    setTimeout(() => setNewsletterMessage(''), 3000);
  };

  return (
    <MainTemplate>
      {/* Hero Section */}
      <section
        className="bg-cover bg-center h-full rounded-lg"
        style={{ backgroundImage: "url('/assets/index/banner/banner_frame1.jpeg')" }}
      >
        <div className="bg-black/80 flex flex-col justify-center items-center text-center py-24 rounded-lg">
          <Typography variant="h1" color="white" className="max-w-5xl">
            Revolusi Pembelajaran: Temukan Ilmu Baru melalui Platform Video Interaktif!
          </Typography>
          <Typography variant="body1" color="white" className="mt-4 max-w-4xl mb-5">
            Temukan ilmu baru yang menarik dan mendalam melalui koleksi video pembelajaran berkualitas tinggi. 
            Tidak hanya itu, Anda juga dapat berpartisipasi dalam latihan interaktif yang akan meningkatkan pemahaman Anda.
          </Typography>
          <Button variant="primary">
            Temukan Video Course untuk Dipelajari!
          </Button>
        </div>
      </section>

      {/* Course Section */}
      <section className="my-14">
        <Typography variant="h2">
          Koleksi Video Pembelajaran Unggulan
        </Typography>
        <Typography variant="body1" color="secondary" className="mb-10">
          Jelajahi Dunia Pengetahuan Melalui Pilihan Kami!
        </Typography>

        <nav className="flex space-x-6 text-[#333333AD] font-semibold whitespace-nowrap overflow-x-auto">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => handleCategoryClick(category)}
              className={`pb-1 transition-colors hover:text-[#F64920] ${
                category === activeCategory ? 'text-[#F64920] border-b-4 border-[#F64920]' : ''
              }`}
            >
              {category}
            </button>
          ))}
        </nav>

        <section className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-6 items-center">
          {filteredCourses.map((course) => (
            <CourseCard key={course.id} course={course} />
          ))}
        </section>
      </section>

      {/* Newsletter Section */}
      <section
        className="bg-cover bg-center rounded-lg mt-16 mb-8"
        style={{ backgroundImage: "url('/assets/index/banner/banner_frame2.jpeg')" }}
      >
        <div className="bg-black/80 py-16 flex justify-center items-center rounded-lg">
          <div className="w-full lg:w-3/5 flex flex-col justify-center items-center px-5 text-center">
            <div className="min-h-[200px] flex flex-col justify-between">
              <Typography variant="body1" color="white">NEWSLETTER</Typography>
              <Typography variant="h2" color="white" className="mb-1">
                Mau Belajar Lebih Banyak?
              </Typography>
              <Typography variant="body1" color="white" className="mb-3">
                Daftarkan dirimu untuk mendapatkan informasi terbaru dan penawaran spesial dari program-program terbaik hariesok.id
              </Typography>
              <form onSubmit={handleNewsletterSubmit} className="w-full h-[100px]">
                <div className="mt-6 bg-none sm:bg-white w-full p-2 rounded-md flex flex-col sm:flex-row justify-center items-center gap-5">
                  <input
                    type="email"
                    placeholder="Masukan Emailmu"
                    value={newsletterEmail}
                    onChange={(e) => setNewsletterEmail(e.target.value)}
                    className="py-2 px-4 text-left w-full sm:w-3/4 outline-none bg-white rounded-xl"
                  />
                  <Button type="submit" variant="primary2" className="w-full sm:w-1/4">
                    Subscribe
                  </Button>
                </div>
                {newsletterMessage && (
                  <Typography
                    variant="body2"
                    color="white"
                    className="mt-2 min-h-[24px]"
                  >
                    {newsletterMessage}
                  </Typography>
                )}
              </form>
            </div>
          </div>
        </div>
      </section>
    </MainTemplate>
  );
}
