import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Typography from '../atoms/Typography';

const CourseCard = ({ course }) => {
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
    <Link 
      to={`/course/${course.id}`}
      className="block bg-white p-4 rounded-lg shadow cursor-pointer transition-transform hover:scale-105"
    >
      <div className="flex sm:block gap-5">
        <img
          src={course.imgKursus || course.image || '/assets/index/course section/course type/image-1.jpeg'}
          alt={`${course.judul || course.title} Cover`}
          className="w-1/6 h-24 sm:w-full sm:h-64 rounded-lg object-cover"
          onError={(e) => {
            e.target.src = '/assets/index/course section/course type/image-1.jpeg';
          }}
        />
        <div className="w-5/6 sm:w-full">
          <Typography
            variant="h6"
            className="mt-0 sm:mt-4"
          >
            {course.judul || course.title}
          </Typography>

          <Typography
            variant="body1"
            color="secondary"
            className="hidden sm:block line-clamp-2"
          >
            {course.descSingkat || course.description}
          </Typography>

          <div className="flex items-center my-3">
            <img
              src={course.imgTutor || course.teacherImage || '/assets/index/course section/course teacher/image-1.png'}
              alt={course.namaTutor || course.teacherName}
              className="size-7 sm:size-8 rounded-md"
              onError={(e) => {
                e.target.src = '/assets/index/course section/course teacher/image-1.png';
              }}
            />
            <div className="ml-2">
              <Typography variant="body1">
                {course.namaTutor || course.teacherName}
              </Typography>
              <Typography
                variant="body2"
                color="secondary"
                className="font-normal"
              >
                {course.pekerjaanTutor || course.teacherJob}
              </Typography>
            </div>
          </div>
        </div>
      </div>

      <div className="flex gap-5 sm:justify-between sm:gap-0 items-center mt-3">
        <div className="flex gap-2 items-center">
          <ul className="flex text-yellow-400 space-x-1">
            {stars.map((star, i) => (
              <i
                key={i}
                className={`${star === 'empty' ? 'far' : 'fas'} fa-star${
                  star === 'half' ? '-half-alt' : ''
                } ${star !== 'empty' ? 'text-yellow-400' : 'text-gray-300'}`}
                aria-hidden="true"
              />
            ))}
          </ul>
          <Typography
            variant="body2"
            color="secondary"
            className="underline hover:text-[#3ECF4C] transition-colors"
          >
            {course.rating} (86)
          </Typography>
        </div>
        <Typography
          variant="body1"
          color="primary"
          className="font-bold"
        >
          {course.harga || course.price}
        </Typography>
      </div>
    </Link>
  );
};

CourseCard.propTypes = {
  course: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    judul: PropTypes.string,
    title: PropTypes.string,
    descSingkat: PropTypes.string,
    description: PropTypes.string,
    imgKursus: PropTypes.string,
    image: PropTypes.string,
    imgTutor: PropTypes.string,
    teacherImage: PropTypes.string,
    namaTutor: PropTypes.string,
    teacherName: PropTypes.string,
    pekerjaanTutor: PropTypes.string,
    teacherJob: PropTypes.string,
    rating: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    harga: PropTypes.string,
    price: PropTypes.string,
    kategori: PropTypes.string,
    category: PropTypes.string
  }).isRequired
};

export default CourseCard;
