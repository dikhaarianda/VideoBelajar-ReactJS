import React from 'react';
import PropTypes from 'prop-types';
import Typography from '../atoms/Typography';

const CourseInfo = ({ course }) => {
  const courseFeatures = [
    {
      icon: 'fas fa-clock',
      title: 'Durasi',
      value: '10 jam pembelajaran'
    },
    {
      icon: 'fas fa-video',
      title: 'Video',
      value: '30 video pembelajaran'
    },
    {
      icon: 'fas fa-book',
      title: 'Modul',
      value: '15 modul pembelajaran'
    },
    {
      icon: 'fas fa-certificate',
      title: 'Sertifikat',
      value: 'Dapatkan sertifikat'
    }
  ];

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <Typography variant="h5" className="mb-6">
        Tentang Kelas Ini
      </Typography>

      <Typography variant="body1" color="secondary" className="mb-8">
        {course.description}
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
        Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
      </Typography>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {courseFeatures.map((feature, index) => (
          <div key={index} className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-full bg-orange-100 flex items-center justify-center">
              <i className={`${feature.icon} text-orange-500 text-xl`}></i>
            </div>
            <div>
              <Typography variant="body1" className="font-medium">
                {feature.title}
              </Typography>
              <Typography variant="body2" color="secondary">
                {feature.value}
              </Typography>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8">
        <Typography variant="h6" className="mb-4">
          Apa yang akan kamu pelajari:
        </Typography>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            'Memahami dasar-dasar UI/UX Design',
            'Menggunakan tools design populer',
            'Membuat prototype interaktif',
            'Best practices dalam design',
            'Melakukan user research',
            'Mengoptimalkan user experience',
            'Design system dan dokumentasi',
            'Portfolio dan case study'
          ].map((item, index) => (
            <div key={index} className="flex items-start gap-3">
              <i className="fas fa-check-circle text-green-500 mt-1"></i>
              <Typography variant="body2" color="secondary">
                {item}
              </Typography>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-8">
        <Typography variant="h6" className="mb-4">
          Persyaratan Kelas:
        </Typography>
        <ul className="list-disc list-inside space-y-2">
          {[
            'Laptop atau komputer dengan spesifikasi standar',
            'Koneksi internet yang stabil',
            'Tidak ada pengalaman design sebelumnya dibutuhkan',
            'Kemauan belajar dan berlatih'
          ].map((req, index) => (
            <li key={index}>
              <Typography variant="body2" color="secondary">
                {req}
              </Typography>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

CourseInfo.propTypes = {
  course: PropTypes.shape({
    description: PropTypes.string.isRequired,
  }).isRequired
};

export default CourseInfo;
