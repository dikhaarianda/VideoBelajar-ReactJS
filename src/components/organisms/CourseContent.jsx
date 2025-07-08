import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Typography from '../atoms/Typography';

const CourseContent = ({ course }) => {
  const [expandedModules, setExpandedModules] = useState({});

  if (!course || !course.modules) {
    return (
      <div className="bg-white rounded-lg shadow-lg p-6">
        <Typography variant="h5" className="mb-6">
          Kurikulum Kelas
        </Typography>
        <Typography variant="body1" color="secondary">
          Data kursus tidak tersedia.
        </Typography>
      </div>
    );
  }

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

  const totalVideos = course.modules.reduce((total, module) => {
    return total + module.lessons.filter(lesson => lesson.type === 'video').length;
  }, 0);

  const totalDuration = course.modules.reduce((total, module) => {
    return total + module.lessons.reduce((modTotal, lesson) => {
      const durationNum = parseInt(lesson.duration);
      return modTotal + (isNaN(durationNum) ? 0 : durationNum);
    }, 0);
  }, 0);

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <Typography variant="h5" className="mb-6">
        Kurikulum Kelas
      </Typography>

      <div className="mb-6 flex flex-wrap gap-4 text-sm text-gray-600">
        <span>
          <i className="fas fa-book mr-2"></i>
          {course.modules.length} Modul
        </span>
        <span>
          <i className="fas fa-video mr-2"></i>
          {totalVideos} Video
        </span>
        <span>
          <i className="fas fa-clock mr-2"></i>
          {totalDuration} menit total
        </span>
      </div>

      <div className="space-y-4">
        {course.modules.map((module) => (
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
                    {module.lessons.length} pelajaran
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
  course: PropTypes.shape({
    modules: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number.isRequired,
        title: PropTypes.string.isRequired,
        lessons: PropTypes.arrayOf(
          PropTypes.shape({
            title: PropTypes.string.isRequired,
            duration: PropTypes.string.isRequired,
            type: PropTypes.string.isRequired,
          })
        ).isRequired,
      })
    ).isRequired,
  }).isRequired,
};

export default CourseContent;
