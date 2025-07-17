import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import CourseCard from '../components/organisms/CourseCard';
import { fetchKursus, selectKursus, selectKursusLoading, selectKursusError } from '../store/redux/kursusSlice';

const dummyData = {
  descLengkap: 'Deskripsi lengkap belum tersedia',
  kategori: 'Kategori belum tersedia',
  imgKursus: 'https://via.placeholder.com/150',
  imgTutor: 'https://via.placeholder.com/50',
  harga: 'Gratis',
  rating: '0',
  pekerjaanTutor: 'Pekerjaan tutor belum tersedia',
};

const KursusPage = () => {
  const dispatch = useDispatch();
  const kursus = useSelector(selectKursus);
  const loading = useSelector(selectKursusLoading);
  const error = useSelector(selectKursusError);

  useEffect(() => {
    dispatch(fetchKursus());
  }, [dispatch]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="kursus-list grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 p-4">
      {kursus.map((course) => {
        // Map API data to CourseCard props, fill missing fields with dummy data
        const courseData = {
          id: course.id,
          title: course.judul,
          description: course.descSingkat,
          teacherName: course.namaTutor || dummyData.pekerjaanTutor,
          teacherJob: course.pekerjaanTutor || dummyData.pekerjaanTutor,
          image: course.imgKursus || dummyData.imgKursus,
          teacherImage: course.imgTutor || dummyData.imgTutor,
          stars: Array(5).fill('full'), // Dummy stars, can be improved
          rating: course.rating || dummyData.rating,
          price: course.harga || dummyData.harga,
        };
        return <CourseCard key={course.id} course={courseData} />;
      })}
    </div>
  );
};

export default KursusPage;
