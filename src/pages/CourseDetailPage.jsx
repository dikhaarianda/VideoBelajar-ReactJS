import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import MainTemplate from '../components/templates/MainTemplate';
import Typography from '../components/atoms/Typography';
import Button from '../components/atoms/Button';
import CourseCard from '../components/organisms/CourseCard';
import LoadingScreen from '../components/organisms/LoadingScreen';
import { useCourses } from '../context/CourseContext';

export default function CourseDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getCourseById, courses } = useCourses();
  const [course, setCourse] = useState(null);
  const [relatedCourses, setRelatedCourses] = useState([]);
  const [expandedSections, setExpandedSections] = useState({});

  useEffect(() => {
    if (!id) {
      console.error('No course ID provided');
      navigate('/home');
      return;
    }

    if (!courses || courses.length === 0) {
      return;
    }

    try {
      const courseId = parseInt(id);

      if (isNaN(courseId)) {
        console.error('Invalid course ID format:', id);
        navigate('/home');
        return;
      }

      const foundCourse = courses.find(c => c.id === courseId);

      if (foundCourse) {
        setCourse(foundCourse);
        const related = courses
          .filter(c => c.id !== courseId)
          .slice(0, 3);
        setRelatedCourses(related);
      } else {
        console.error(`Course with ID ${courseId} not found`);
        navigate('/home');
      }
    } catch (error) {
      console.error('Error loading course:', error);
      navigate('/home');
    }
  }, [id, courses, navigate]);

  if (!courses || courses.length === 0) {
    return (
      <MainTemplate>
        <LoadingScreen 
          message="Loading courses..." 
          size="large" 
          color="primary"
        />
      </MainTemplate>
    );
  }

  const toggleSection = (sectionId) => {
    setExpandedSections(prev => ({
      ...prev,
      [sectionId]: !prev[sectionId]
    }));
  };

  if (!course) {
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

  const courseModules = course.modules || [];

  const tutors = course.tutors || [];

  const reviews = course.reviews || [];

  return (
    <MainTemplate>
      <div className="max-w-7xl mx-auto px-4">
        {/* Breadcrumb */}
        <nav className="text-sm text-gray-500 mb-6">
          <span>Beranda</span> / <span>{course.category}</span> / <span className="text-gray-900">{course.title}</span>
        </nav>

        {/* Hero Section */}
        <section className="bg-cover bg-center h-full rounded-lg"
        style={{ backgroundImage: "url('/assets/index/banner/banner_frame1.jpeg')" }}>
          <div className="p-24 text-white bg-black/80 rounded-lg">
            <Typography variant="h1" color="white" className="text-3xl font-bold mb-4">
              {course.title}
            </Typography>
            <Typography variant="body1" color="white" className="mb-4 opacity-90">
              {course.description}
            </Typography>
            
            <div className="flex items-center gap-4 mb-6">
              <div className="flex text-yellow-400">
                {course.stars.map((star, index) => (
                  <i key={index} className={`${star === 'full' ? 'fas fa-star' : star === 'half' ? 'fas fa-star-half-stroke' : 'far fa-star'}`} />
                ))}
              </div>
              <Typography variant="body2" color="white">
                {course.rating}
              </Typography>
            </div>
          </div>
        </section>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Description */}
            <div className="bg-white rounded-lg p-6">
              <Typography variant="h5" className="mb-4">Deskripsi</Typography>
              <Typography variant="body1" color="secondary" className="leading-relaxed">
                {course.fullDescription}
              </Typography>
            </div>

            {/* Tutors */}
            <div className="bg-white rounded-lg p-6">
              <Typography variant="h5" className="mb-6">Belajar bersama Tutor Profesional</Typography>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {tutors.map((tutor, index) => (
                  <div key={index} className="flex gap-4 border border-[#3A35411F] rounded-xl p-3">
                    <img
                      src="/assets/index/course section/course teacher/image-1.png"
                      alt={tutor.name}
                      className="w-16 h-16 rounded-lg object-cover"
                    />
                    <div className="flex-1">
                      <Typography variant="h6" className="font-semibold">
                        {tutor.name}
                      </Typography>
                      <Typography variant="body2" color="secondary" className="mb-2">
                        {tutor.role}
                      </Typography>
                      <Typography variant="body2" color="secondary" className="text-sm">
                        {tutor.description}
                      </Typography>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Course Content */}
            <div className="bg-white rounded-lg p-6">
              <Typography variant="h5" className="mb-6">Kamu akan Mempelajari</Typography>
              <div className="space-y-4">
                {courseModules.map((module) => (
                  <div key={module.id} className="border border-gray-200 rounded-lg">
                    <button
                      onClick={() => toggleSection(module.id)}
                      className="w-full p-4 text-left flex items-center justify-between hover:bg-gray-50"
                    >
                      <Typography variant="body1" className="font-medium text-green-600">
                        {module.title}
                      </Typography>
                      <i className={`fas fa-chevron-${expandedSections[module.id] ? 'up' : 'down'} text-gray-400`}></i>
                    </button>
                    
                    {expandedSections[module.id] && module.lessons.length > 0 && (
                      <div className="border-t border-gray-200 p-4">
                        {module.lessons.map((lesson, index) => (
                          <div key={index} className="flex items-center justify-between py-2">
                            <div className="flex items-center gap-3">
                              <i className="fas fa-play-circle text-blue-500"></i>
                              <Typography variant="body2">{lesson.title}</Typography>
                            </div>
                            <div className="flex items-center gap-4">
                              <span className="text-sm text-gray-500">Video</span>
                              <span className="text-sm text-gray-500">{lesson.duration}</span>
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
                {reviews.map((review, index) => (
                  <div key={index} className="flex gap-4 border border-[#3A35411F] rounded-xl p-3">
                    <img
                      src="/assets/index/course section/course teacher/image-1.png"
                      alt={review.name}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                    <div className="flex-1">
                      <Typography variant="body1" className="font-semibold">
                        {review.name}
                      </Typography>
                      <Typography variant="body2" color="secondary" className="mb-2">
                        {review.role}
                      </Typography>
                      <Typography variant="body2" color="secondary" className="text-sm mb-2">
                        {review.description}
                      </Typography>
                      <div className="flex items-center gap-2">
                        <div className="flex text-yellow-400">
                          {[...Array(5)].map((_, index) => (
                            <i 
                              key={index} 
                              className={`fas fa-star${index >= review.rating ? '-o' : ''} text-xs`} 
                            />
                          ))}
                        </div>
                        <Typography variant="body2" color="secondary" className="text-xs">
                          {review.date}
                        </Typography>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-8">
              <div className="bg-white rounded-lg shadow-lg p-6 space-y-6">
                <div>
                  <Typography variant="h6" className="mb-2 font-semibold">
                    {course.title}
                  </Typography>
                  <div className="flex items-center gap-2 mb-2">
                    <Typography variant="h4" className="font-bold text-green-600">
                      {course.price}
                    </Typography>
                    <span className="line-through text-gray-400">Rp 500K</span>
                    <span className="bg-yellow-300 text-yellow-900 text-xs font-semibold px-2 py-0.5 rounded">
                      Diskon 50%
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
                </div>

                <div>
                  <Typography variant="h6" className="font-semibold mb-3">
                    Kelas Ini Sudah Termasuk
                  </Typography>
                  <div className="grid grid-cols-2 gap-y-4 gap-x-6 text-gray-700">
                    <div className="flex items-center gap-3">
                      <i className="fas fa-file-alt text-gray-600 text-lg"></i>
                      <Typography variant="body2">Ujian Akhir</Typography>
                    </div>
                    <div className="flex items-center gap-3">
                      <i className="fas fa-video text-gray-600 text-lg"></i>
                      <Typography variant="body2">{course.modules ? course.modules.reduce((total, module) => total + module.lessons.length, 0) : 0} Video</Typography>
                    </div>
                    <div className="flex items-center gap-3">
                      <i className="fas fa-file-upload text-gray-600 text-lg"></i>
                      <Typography variant="body2">7 Dokumen</Typography>
                    </div>
                    <div className="flex items-center gap-3">
                      <i className="fas fa-certificate text-gray-600 text-lg"></i>
                      <Typography variant="body2">Sertifikat</Typography>
                    </div>
                    <div className="flex items-center gap-3">
                      <i className="fas fa-clipboard-check text-gray-600 text-lg"></i>
                      <Typography variant="body2">Pretest</Typography>
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
            {relatedCourses.map((course) => (
              <CourseCard key={course.id} course={course} />
            ))}
          </div>
        </div>
      </div>
    </MainTemplate>
  );
}
