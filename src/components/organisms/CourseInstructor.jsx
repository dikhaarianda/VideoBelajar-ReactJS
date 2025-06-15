import React from 'react';
import PropTypes from 'prop-types';
import Typography from '../atoms/Typography';

const CourseInstructor = ({ course }) => {
  const achievements = [
    {
      icon: 'fas fa-star',
      value: '4.8',
      label: 'Rating Instruktur'
    },
    {
      icon: 'fas fa-user-graduate',
      value: '12,345',
      label: 'Siswa'
    },
    {
      icon: 'fas fa-play-circle',
      value: '15',
      label: 'Kelas'
    },
    {
      icon: 'fas fa-comments',
      value: '4,321',
      label: 'Reviews'
    }
  ];

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <Typography variant="h5" className="mb-6">
        Instruktur
      </Typography>

      <div className="flex flex-col md:flex-row gap-6">
        {/* Instructor Profile */}
        <div className="md:w-1/3">
          <img
            src={course.teacherImage}
            alt={course.teacherName}
            className="w-full h-64 object-cover rounded-lg mb-4"
          />
          <div className="grid grid-cols-2 gap-4">
            {achievements.map((achievement, index) => (
              <div key={index} className="text-center p-3 bg-gray-50 rounded-lg">
                <i className={`${achievement.icon} text-orange-500 text-xl mb-2`}></i>
                <Typography variant="h6" className="font-bold">
                  {achievement.value}
                </Typography>
                <Typography variant="body2" color="secondary">
                  {achievement.label}
                </Typography>
              </div>
            ))}
          </div>
        </div>

        {/* Instructor Info */}
        <div className="md:w-2/3">
          <Typography variant="h4" className="mb-2">
            {course.teacherName}
          </Typography>
          <Typography variant="body1" color="secondary" className="mb-4">
            {course.teacherJob}
          </Typography>

          <div className="space-y-6">
            <div>
              <Typography variant="h6" className="mb-2">
                Tentang Instruktur
              </Typography>
              <Typography variant="body1" color="secondary">
                Seorang profesional berpengalaman dengan lebih dari 8 tahun di industri teknologi. 
                Memiliki passion dalam mengajar dan berbagi pengetahuan dengan cara yang mudah dipahami. 
                Telah membantu ribuan siswa mengembangkan karir mereka di bidang UI/UX design.
              </Typography>
            </div>

            <div>
              <Typography variant="h6" className="mb-2">
                Keahlian
              </Typography>
              <div className="flex flex-wrap gap-2">
                {[
                  'UI Design',
                  'UX Research',
                  'Figma',
                  'Adobe XD',
                  'Sketch',
                  'Prototyping',
                  'Design System',
                  'User Testing'
                ].map((skill, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-orange-100 text-orange-600 rounded-full text-sm"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            <div>
              <Typography variant="h6" className="mb-2">
                Pengalaman
              </Typography>
              <div className="space-y-4">
                {[
                  {
                    role: 'Senior UI/UX Designer',
                    company: 'Tech Company',
                    period: '2020 - Sekarang'
                  },
                  {
                    role: 'Product Designer',
                    company: 'Design Agency',
                    period: '2018 - 2020'
                  },
                  {
                    role: 'UI Designer',
                    company: 'Startup',
                    period: '2016 - 2018'
                  }
                ].map((exp, index) => (
                  <div key={index} className="flex justify-between items-start">
                    <div>
                      <Typography variant="body1" className="font-medium">
                        {exp.role}
                      </Typography>
                      <Typography variant="body2" color="secondary">
                        {exp.company}
                      </Typography>
                    </div>
                    <Typography variant="body2" color="secondary">
                      {exp.period}
                    </Typography>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

CourseInstructor.propTypes = {
  course: PropTypes.shape({
    teacherImage: PropTypes.string.isRequired,
    teacherName: PropTypes.string.isRequired,
    teacherJob: PropTypes.string.isRequired
  }).isRequired
};

export default CourseInstructor;
