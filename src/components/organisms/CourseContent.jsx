import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Typography from '../atoms/Typography';

const CourseContent = ({ course }) => {
  const [expandedModules, setExpandedModules] = useState({});

  const courseModules = [
    {
      id: 1,
      title: 'Pengenalan UI/UX Design',
      duration: '45 menit',
      lessons: [
        { title: 'Apa itu UI/UX Design?', duration: '10 menit', type: 'video' },
        { title: 'Perbedaan UI dan UX', duration: '8 menit', type: 'video' },
        { title: 'Tools yang digunakan', duration: '12 menit', type: 'video' },
        { title: 'Quiz: Dasar UI/UX', duration: '15 menit', type: 'quiz' }
      ]
    },
    {
      id: 2,
      title: 'Design Thinking Process',
      duration: '60 menit',
      lessons: [
        { title: 'Empathize - Memahami User', duration: '15 menit', type: 'video' },
        { title: 'Define - Mendefinisikan Masalah', duration: '12 menit', type: 'video' },
        { title: 'Ideate - Brainstorming Solusi', duration: '18 menit', type: 'video' },
        { title: 'Prototype - Membuat Prototipe', duration: '15 menit', type: 'video' }
      ]
    },
    {
      id: 3,
      title: 'User Research & Analysis',
      duration: '75 menit',
      lessons: [
        { title: 'Metode User Research', duration: '20 menit', type: 'video' },
        { title: 'Membuat User Persona', duration: '25 menit', type: 'video' },
        { title: 'User Journey Mapping', duration: '30 menit', type: 'video' }
      ]
    },
    {
      id: 4,
      title: 'Wireframing & Prototyping',
      duration: '90 menit',
      lessons: [
        { title: 'Low-fidelity Wireframes', duration: '25 menit', type: 'video' },
        { title: 'High-fidelity Mockups', duration: '35 menit', type: 'video' },
        { title: 'Interactive Prototypes', duration: '30 menit', type: 'video' }
      ]
    },
    {
      id: 5,
      title: 'Visual Design Principles',
      duration: '80 menit',
      lessons: [
        { title: 'Typography dalam Design', duration: '20 menit', type: 'video' },
        { title: 'Color Theory', duration: '25 menit', type: 'video' },
        { title: 'Layout dan Composition', duration: '35 menit', type: 'video' }
      ]
    }
  ];

  const toggleModule = (moduleId) => {
    setExpandedModules(prev => ({
      ...prev,
      [moduleId]: !prev[moduleId]
    }));
  };

  const getIconForType = (type) => {
    switch (type) {
      case 'video':
        return 'fas fa-play-circle text-blue-500';
      case 'quiz':
        return 'fas fa-question-circle text-orange-500';
      case 'reading':
        return 'fas fa-book text-green-500';
      default:
        return 'fas fa-file text-gray-500';
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <Typography variant="h5" className="mb-6">
        Kurikulum Kelas
      </Typography>

      <div className="mb-6 flex flex-wrap gap-4 text-sm text-gray-600">
        <span>
          <i className="fas fa-book mr-2"></i>
          {courseModules.length} Modul
        </span>
        <span>
          <i className="fas fa-video mr-2"></i>
          {courseModules.reduce((total, module) => total + module.lessons.length, 0)} Video
        </span>
        <span>
          <i className="fas fa-clock mr-2"></i>
          {courseModules.reduce((total, module) => {
            const duration = parseInt(module.duration);
            return total + duration;
          }, 0)} menit total
        </span>
      </div>

      <div className="space-y-4">
        {courseModules.map((module) => (
          <div key={module.id} className="border border-gray-200 rounded-lg">
            <button
              onClick={() => toggleModule(module.id)}
              className="w-full p-4 text-left flex items-center justify-between hover:bg-gray-50 transition-colors"
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-orange-100 flex items-center justify-center">
                  <Typography variant="body2" className="font-medium text-orange-600">
                    {module.id}
                  </Typography>
                </div>
                <div>
                  <Typography variant="body1" className="font-medium">
                    {module.title}
                  </Typography>
                  <Typography variant="body2" color="secondary">
                    {module.lessons.length} pelajaran • {module.duration}
                  </Typography>
                </div>
              </div>
              <i className={`fas fa-chevron-${expandedModules[module.id] ? 'up' : 'down'} text-gray-400`}></i>
            </button>

            {expandedModules[module.id] && (
              <div className="border-t border-gray-200">
                {module.lessons.map((lesson, index) => (
                  <div key={index} className="p-4 pl-16 flex items-center justify-between hover:bg-gray-50">
                    <div className="flex items-center gap-3">
                      <i className={getIconForType(lesson.type)}></i>
                      <div>
                        <Typography variant="body2" className="font-medium">
                          {lesson.title}
                        </Typography>
                      </div>
                    </div>
                    <Typography variant="body2" color="secondary">
                      {lesson.duration}
                    </Typography>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="mt-8 p-4 bg-blue-50 rounded-lg">
        <div className="flex items-start gap-3">
          <i className="fas fa-info-circle text-blue-500 mt-1"></i>
          <div>
            <Typography variant="body1" className="font-medium text-blue-900">
              Akses Selamanya
            </Typography>
            <Typography variant="body2" color="secondary">
              Setelah membeli kelas ini, Anda akan mendapatkan akses selamanya untuk semua materi pembelajaran.
            </Typography>
          </div>
        </div>
      </div>
    </div>
  );
};

CourseContent.propTypes = {
  course: PropTypes.object.isRequired
};

export default CourseContent;
