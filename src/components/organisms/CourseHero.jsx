import React from 'react';
import PropTypes from 'prop-types';
import Typography from '../atoms/Typography';
import Button from '../atoms/Button';

const CourseHero = ({ course }) => {
  return (
    <div className="bg-gradient-to-r from-blue-900 to-purple-900 rounded-lg overflow-hidden">
      <div className="flex flex-col lg:flex-row">
        {/* Content */}
        <div className="flex-1 p-8 lg:p-12 text-white">
          <div className="mb-4">
            <span className="bg-orange-500 text-white px-3 py-1 rounded-full text-sm font-medium">
              Populer
            </span>
          </div>
          
          <Typography variant="h1" color="white" className="mb-4">
            {course.title}
          </Typography>
          
          <Typography variant="body1" color="white" className="mb-6 opacity-90">
            {course.description}
          </Typography>
          
          <div className="flex items-center gap-4 mb-6">
            <div className="flex items-center gap-2">
              <div className="flex text-yellow-400">
                {course.stars.map((star, i) => (
                  <i
                    key={i}
                    className={`${star === 'empty' ? 'far' : 'fas'} fa-star${
                      star === 'half' ? '-half-alt' : ''
                    } ${star !== 'empty' ? 'text-yellow-400' : 'text-gray-300'}`}
                  />
                ))}
              </div>
              <Typography variant="body2" color="white">
                {course.rating}
              </Typography>
            </div>
            
            <div className="flex items-center gap-2">
              <i className="fas fa-users text-white opacity-70"></i>
              <Typography variant="body2" color="white">
                1,234 siswa
              </Typography>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <img
              src={course.teacherImage}
              alt={course.teacherName}
              className="w-12 h-12 rounded-full"
            />
            <div>
              <Typography variant="body1" color="white" className="font-medium">
                {course.teacherName}
              </Typography>
              <Typography variant="body2" color="white" className="opacity-70">
                {course.teacherJob}
              </Typography>
            </div>
          </div>
        </div>
        
        {/* Image */}
        <div className="flex-1 lg:max-w-md">
          <img
            src={course.image}
            alt={course.title}
            className="w-full h-64 lg:h-full object-cover"
          />
        </div>
      </div>
    </div>
  );
};

CourseHero.propTypes = {
  course: PropTypes.shape({
    id: PropTypes.number,
    image: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    teacherImage: PropTypes.string.isRequired,
    teacherName: PropTypes.string.isRequired,
    teacherJob: PropTypes.string.isRequired,
    stars: PropTypes.arrayOf(PropTypes.oneOf(['full', 'half', 'empty'])).isRequired,
    rating: PropTypes.string.isRequired,
    price: PropTypes.string.isRequired
  }).isRequired
};

export default CourseHero;
