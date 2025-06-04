import React from 'react';
import PropTypes from 'prop-types';
import Typography from '../atoms/Typography';

const CourseCard = ({ course }) => {
  return (
    <article className="bg-white p-4 rounded-lg shadow">
      <div className="flex sm:block gap-5">
        <img
          src={course.image}
          alt={`${course.title} Cover`}
          className="w-1/6 h-24 sm:w-full sm:h-64 rounded-lg object-cover"
        />
        <div className="w-5/6 sm:w-full">
          <Typography
            variant="h6"
            className="mt-0 sm:mt-4 font-['Poppins']"
          >
            {course.title}
          </Typography>

          <Typography
            variant="body1"
            color="secondary"
            className="hidden sm:block line-clamp-2"
          >
            {course.description}
          </Typography>

          <div className="flex items-center my-3">
            <img
              src={course.teacherImage}
              alt={course.teacherName}
              className="size-7 sm:size-8 rounded-md"
            />
            <div className="ml-2">
              <Typography variant="body1">
                {course.teacherName}
              </Typography>
              <Typography
                variant="body2"
                color="secondary"
                className="font-normal"
              >
                {course.teacherJob}
              </Typography>
            </div>
          </div>
        </div>
      </div>

      <div className="flex gap-5 sm:justify-between sm:gap-0 items-center mt-3">
        <div className="flex gap-2 items-center">
          <ul className="flex text-yellow-400 space-x-1">
            {course.stars.map((star, i) => (
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
            {course.rating}
          </Typography>
        </div>
        <Typography
          variant="body1"
          color="primary"
          className="font-bold"
        >
          {course.price}
        </Typography>
      </div>
    </article>
  );
};

CourseCard.propTypes = {
  course: PropTypes.shape({
    id: PropTypes.string,
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

export default CourseCard;
