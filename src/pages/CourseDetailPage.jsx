import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import MainTemplate from '../components/templates/MainTemplate';
import Typography from '../components/atoms/Typography';
import Button from '../components/atoms/Button';
import CourseCard from '../components/organisms/CourseCard';
import LoadingScreen from '../components/organisms/LoadingScreen';
import { getKursusById } from '../services/api/kursusApi';
import { fetchKursus, selectKursus, selectKursusLoading } from '../store/redux/kursusSlice';

export default function CourseDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const allCourses = useSelector(selectKursus);
  const isLoading = useSelector(selectKursusLoading);
  
  const [course, setCourse] = useState(null);
  const [relatedCourses, setRelatedCourses] = useState([]);
  const [courseLoading, setCourseLoading] = useState(true);
  const [error, setError] = useState(null);
  const [expandedSections, setExpandedSections] = useState({});

  // Sample course content data - this would typically come from your API
  const courseContent = [
    {
      id: 1,
      title: "Introduction to HR",
      lessons: [
        { id: 1, title: "Introduction to HR", duration: "12 Menit", type: "video" },
        { id: 2, title: "Introduction to HR", duration: "12 Menit", type: "video" },
        { id: 3, title: "Introduction to HR", duration: "12 Menit", type: "video" }
      ]
    },
    {
      id: 2,
      title: "Introduction to HR",
      lessons: []
    },
    {
      id: 3,
      title: "Introduction to HR", 
      lessons: []
    },
    {
      id: 4,
      title: "Introduction to HR",
      lessons: []
    }
  ];

  const toggleSection = (sectionId) => {
    setExpandedSections(prev => ({
      ...prev,
      [sectionId]: !prev[sectionId]
    }));
  };

  useEffect(() => {
    const fetchCourseData = async () => {
      if (!id) {
        console.error('No course ID provided');
        navigate('/home');
        return;
      }

      try {
        setCourseLoading(true);
        setError(null);
        
        // Fetch specific course by ID
        const response = await getKursusById(id);
        const courseData = response.data;
        
        if (courseData) {
          setCourse(courseData);
          
          // Fetch all courses for related courses if not already loaded
          if (allCourses.length === 0) {
            dispatch(fetchKursus());
          }
        } else {
          console.error(`Course with ID ${id} not found`);
          navigate('/home');
        }
      } catch (error) {
        console.error('Error loading course:', error);
        setError('Failed to load course details');
        // Don't navigate away immediately, show error state
      } finally {
        setCourseLoading(false);
      }
    };

    fetchCourseData();
  }, [id, navigate, dispatch, allCourses.length]);

  // Set related courses when allCourses is loaded
  useEffect(() => {
    if (course && allCourses.length > 0) {
      const related = allCourses
        .filter(c => c.id !== course.id && (c.kategori || c.category) === (course.kategori || course.category))
        .slice(0, 3);
      setRelatedCourses(related);
    }
  }, [course, allCourses]);

  if (courseLoading || isLoading) {
    return (
      <MainTemplate>
        <LoadingScreen
          message="Loading course details..."
          size="large"
          color="primary"
        />
      </MainTemplate>
    );
  }

  if (error) {
    return (
      <MainTemplate>
        <div className="max-w-7xl mx-auto px-4 py-16 text-center">
          <Typography variant="h2" className="mb-4">Error Loading Course</Typography>
          <Typography variant="body1" color="secondary" className="mb-6">{error}</Typography>
          <Button variant="primary" onClick={() => navigate('/home')}>
            Back to Home
          </Button>
        </div>
      </MainTemplate>
    );
  }

  if (!course) {
    return (
      <MainTemplate>
        <div className="max-w-7xl mx-auto px-4 py-16 text-center">
          <Typography variant="h2" className="mb-4">Course Not Found</Typography>
          <Typography variant="body1" color="secondary" className="mb-6">
            The course you're looking for doesn't exist.
          </Typography>
          <Button variant="primary" onClick={() => navigate('/home')}>
            Back to Home
          </Button>
        </div>
      </MainTemplate>
    );
  }

  // Generate star rating based on numeric rating
  const generateStars = (rating) => {
    const numRating = parseFloat(rating) || 0;
    const stars = [];
    const fullStars = Math.floor(numRating);
    const hasHalfStar = numRating % 1 >= 0.5;
    
    for (let i = 0; i < 5; i++) {
      if (i < fullStars) {
        stars.push('full');
      } else if (i === fullStars && hasHalfStar) {
        stars.push('half');
      } else {
        stars.push('empty');
      }
    }
    return stars;
  };

  const stars = generateStars(course.rating);

  return (
    <MainTemplate>
      <div className="max-w-7xl mx-auto px-4">
        {/* Breadcrumb */}
        <nav className="text-sm text-gray-500 mb-6">
          <span>Beranda</span> / <span>{course.kategori || course.category}</span> / <span className="text-gray-900">{course.judul || course.title}</span>
        </nav>

        {/* Hero Section */}
        <section className="bg-cover bg-center h-full rounded-lg"
        style={{ backgroundImage: "url('/assets/index/banner/banner_frame1.jpeg')" }}>
          <div className="p-24 text-white bg-black/80 rounded-lg">
            <Typography variant="h1" color="white" className="text-3xl font-bold mb-4">
              {course.judul || course.title}
            </Typography>
            <Typography variant="body1" color="white" className="mb-4 opacity-90">
              {course.descSingkat || course.description}
            </Typography>

            <div className="flex items-center gap-4 mb-6">
              <div className="flex text-yellow-400">
                {stars.map((star, index) => (
                  <i key={index} className={`${star === 'full' ? 'fas fa-star' : star === 'half' ? 'fas fa-star-half-stroke' : 'far fa-star'}`} />
                ))}
              </div>
              <Typography variant="body2" color="white" className='border-b-1'>
                {course.rating} (86)
              </Typography>
            </div>
          </div>
        </section>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 pt-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Description */}
            <div className="bg-white rounded-lg p-6">
              <Typography variant="h5" className="mb-4">Deskripsi</Typography>
              <Typography variant="body1" color="secondary" className="leading-relaxed">
                {course.descLengkap || course.fullDescription || 'Deskripsi lengkap akan segera tersedia.'}
              </Typography>
            </div>

            {/* Tutor */}
            <div className="bg-white rounded-lg p-6">
              <Typography variant="h5" className="mb-6">Belajar bersama Tutor Profesional</Typography>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* First Tutor */}
                <div className="flex gap-4 border border-[#3A35411F] rounded-xl p-3">
                  <img
                    src={course.imgTutor || course.teacherImage || '/assets/index/course section/course teacher/image-1.png'}
                    alt={course.namaTutor || course.teacherName}
                    className="w-16 h-16 rounded-lg object-cover"
                    onError={(e) => {
                      e.target.src = '/assets/index/course section/course teacher/image-1.png';
                    }}
                  />
                  <div className="flex-1">
                    <Typography variant="h6" className="font-semibold">
                      {course.namaTutor || course.teacherName || 'Gregorius Edrik Lawanto'}
                    </Typography>
                    <Typography variant="body2" color="secondary" className="mb-2">
                      {course.pekerjaanTutor || course.teacherJob || 'Senior Data Analyst di Shopee'}
                    </Typography>
                    <Typography variant="body2" color="secondary" className="text-sm">
                      Berpengalaman di bidang HR selama lebih dari 5 tahun. Saat ini bekerja sebagai Senior Talent Acquisition di berbagai perusahaan Grup Indonesia Dengan Misi Utama.
                    </Typography>
                  </div>
                </div>

                {/* Second Tutor */}
                <div className="flex gap-4 border border-[#3A35411F] rounded-xl p-3">
                  <img
                    src='/assets/index/course section/course teacher/image-1.png'
                    alt='Gregorius Edrik Lawanto'
                    className="w-16 h-16 rounded-lg object-cover"
                  />
                  <div className="flex-1">
                    <Typography variant="h6" className="font-semibold">
                      Gregorius Edrik Lawanto
                    </Typography>
                    <Typography variant="body2" color="secondary" className="mb-2">
                      Senior Data Analyst di Shopee
                    </Typography>
                    <Typography variant="body2" color="secondary" className="text-sm">
                      Berpengalaman di bidang HR selama lebih dari 5 tahun. Saat ini bekerja sebagai Senior Talent Acquisition di berbagai perusahaan Grup Indonesia Dengan Misi Utama.
                    </Typography>
                  </div>
                </div>
              </div>
            </div>

            {/* Course Content */}
            <div className="bg-white rounded-lg p-6">
              <Typography variant="h5" className="mb-6">Kamu akan Mempelajari</Typography>
              <div className="space-y-3">
                {courseContent.map((section) => (
                  <div key={section.id} className="border border-gray-200 rounded-lg overflow-hidden">
                    {/* Section Header */}
                    <button 
                      className="w-full p-4 text-left flex items-center justify-between hover:bg-gray-50 transition-colors duration-200"
                      onClick={() => toggleSection(section.id)}
                    >
                      <Typography variant="body1" className="font-medium text-green-600">
                        {section.title}
                      </Typography>
                      <i className={`fas fa-chevron-${expandedSections[section.id] ? 'up' : 'down'} text-gray-400 transition-transform duration-200`}></i>
                    </button>
                    
                    {/* Expanded Content */}
                    {expandedSections[section.id] && section.lessons.length > 0 && (
                      <div className="border-t border-gray-200 bg-gray-50">
                        {section.lessons.map((lesson) => (
                          <div key={lesson.id} className="px-4 py-3 flex items-center justify-between hover:bg-gray-100 transition-colors duration-150">
                            <div className="flex items-center gap-3">
                              <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                                <i className="fas fa-play text-green-600 text-xs"></i>
                              </div>
                              <Typography variant="body2" className="text-gray-700">
                                {lesson.title}
                              </Typography>
                            </div>
                            <div className="flex items-center gap-2 text-gray-500">
                              <i className="fas fa-clock text-xs"></i>
                              <Typography variant="body2" className="text-sm">
                                {lesson.duration}
                              </Typography>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Reviews */}
            <div className="bg-white rounded-lg p-6">
              <Typography variant="h5" className="mb-6">Rating dan Review</Typography>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* First Review */}
                <div className="flex gap-4 border border-[#3A35411F] rounded-xl p-3">
                  <img
                    src='/assets/index/course section/course teacher/image-1.png'
                    alt='Gregorius Edrik Lawanto'
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div className="flex-1">
                    <Typography variant="body1" className="font-semibold">
                      Gregorius Edrik Lawanto
                    </Typography>
                    <Typography variant="body2" color="secondary" className="mb-2">
                      Senior Data Analyst di Shopee
                    </Typography>
                    <Typography variant="body2" color="secondary" className="text-sm mb-2">
                      Berpengalaman di bidang HR selama lebih dari 5 tahun. Saat ini bekerja sebagai Senior Talent Acquisition di berbagai perusahaan Grup Indonesia Dengan Misi Utama selama hampir 1 tahun.
                    </Typography>
                    <div className="flex items-center gap-2">
                      <div className="flex text-yellow-400">
                        {[...Array(5)].map((_, index) => (
                          <i key={index} className="fas fa-star text-xs" />
                        ))}
                      </div>
                      <Typography variant="body2" color="secondary" className="text-xs">
                        1 minggu lalu
                      </Typography>
                    </div>
                  </div>
                </div>

                {/* Second Review */}
                <div className="flex gap-4 border border-[#3A35411F] rounded-xl p-3">
                  <img
                    src='/assets/index/course section/course teacher/image-1.png'
                    alt='Gregorius Edrik Lawanto'
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div className="flex-1">
                    <Typography variant="body1" className="font-semibold">
                      Gregorius Edrik Lawanto
                    </Typography>
                    <Typography variant="body2" color="secondary" className="mb-2">
                      Senior Data Analyst di Shopee
                    </Typography>
                    <Typography variant="body2" color="secondary" className="text-sm mb-2">
                      Berpengalaman di bidang HR selama lebih dari 5 tahun. Saat ini bekerja sebagai Senior Talent Acquisition di berbagai perusahaan Grup Indonesia Dengan Misi Utama selama hampir 1 tahun.
                    </Typography>
                    <div className="flex items-center gap-2">
                      <div className="flex text-yellow-400">
                        {[...Array(5)].map((_, index) => (
                          <i key={index} className="fas fa-star text-xs" />
                        ))}
                      </div>
                      <Typography variant="body2" color="secondary" className="text-xs">
                        1 minggu lalu
                      </Typography>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-8">
              <div className="bg-white rounded-lg shadow-sm p-6 space-y-6">
                <div>
                  <Typography variant="h6" className="mb-2 font-semibold">
                    {course.judul}
                  </Typography>
                  <div className="flex items-center gap-2 mb-2">
                    <Typography variant="h4" className="font-bold text-green-600">
                      {course.harga}
                    </Typography>
                    <span className='text-gray-300 line-through'>Rp 500k</span>
                    <span className="bg-amber-400 text-white text-xs font-semibold p-2 rounded-xl">
                      Discount 50%
                    </span>
                  </div>
                  <p className="text-blue-600 text-sm mb-1">Penawaran spesial tersisa 2 hari lagi!</p>
                </div>

                <div>
                  <Button
                    variant="primary"
                    className="w-full bg-green-500 hover:bg-green-600 border-green-500"
                  >
                    Beli Sekarang
                  </Button>

                  <Button
                    variant="secondary"
                    className="w-full hover:bg-green-100 mt-5"
                  >
                    Bagikan Kelas
                  </Button>
                </div>

                <div>
                  <Typography variant="h6" className="font-semibold mb-3">
                    Kelas Ini Sudah Termasuk
                  </Typography>
                  <div className="grid grid-cols-2 gap-y-4 gap-x-6 text-gray-700">
                    <div className="flex items-center gap-3">
                      <i className="fas fa-video text-gray-600 text-lg"></i>
                      <Typography variant="body2">Video HD</Typography>
                    </div>
                    <div className="flex items-center gap-3">
                      <i className="fas fa-file-alt text-gray-600 text-lg"></i>
                      <Typography variant="body2">Materi PDF</Typography>
                    </div>
                    <div className="flex items-center gap-3">
                      <i className="fas fa-certificate text-gray-600 text-lg"></i>
                      <Typography variant="body2">Sertifikat</Typography>
                    </div>
                    <div className="flex items-center gap-3">
                      <i className="fas fa-headset text-gray-600 text-lg"></i>
                      <Typography variant="body2">Support</Typography>
                    </div>
                  </div>
                </div>

                <div>
                  <Typography variant="h6" className="font-semibold mb-3">
                    Bahasa Pengantar
                  </Typography>
                  <div className="flex items-center gap-3 text-gray-700">
                    <i className="fas fa-globe text-gray-600"></i>
                    <Typography variant="body2">Bahasa Indonesia</Typography>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Related Courses */}
        {relatedCourses.length > 0 && (
          <div className="mt-16">
            <div className="mb-8">
              <Typography variant="h5" className="mb-2">
                Video Pembelajaran Terkait Lainnya
              </Typography>
              <Typography variant="body1" color="secondary">
                Ekspansi Pengetahuan Anda dengan Rekomendasi Spesial Kami!
              </Typography>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {relatedCourses.map((relatedCourse) => (
                <CourseCard key={relatedCourse.id} course={relatedCourse} />
              ))}
            </div>
          </div>
        )}
      </div>
    </MainTemplate>
  );
}
