import React from 'react';
import PropTypes from 'prop-types';
import Typography from '../atoms/Typography';
import CourseCard from './CourseCard';

const RelatedCourses = ({ courses }) => {
  return (
    <div className="mt-16">
      <div className="mb-8">
        <Typography variant="h5">
          Kelas Lainnya yang Mungkin Kamu Suka
        </Typography>
        <Typography variant="body1" color="secondary">
          Pelajari lebih banyak kelas untuk meningkatkan skillmu
        </Typography>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {courses.map((course) => (
          <CourseCard key={course.id} course={course} />
        ))}
      </div>
    </div>
  );
};

RelatedCourses.propTypes = {
  courses: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      image: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
      teacherImage: PropTypes.string.isRequired,
      teacherName: PropTypes.string.isRequired,
      teacherJob: PropTypes.string.isRequired,
      stars: PropTypes.arrayOf(PropTypes.oneOf(['full', 'half', 'empty'])).isRequired,
      rating: PropTypes.string.isRequired,
      price: PropTypes.string.isRequired
    })
  ).isRequired
};

export default RelatedCourses;
