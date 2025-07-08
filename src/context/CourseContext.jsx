import React, { createContext, useContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import initialCourses from '../hooks/courseData';

const CourseContext = createContext();

const LOCAL_STORAGE_KEY = 'coursesData';

export function CourseProvider({ children }) {
  const [courses, setCourses] = useState(() => {
    const storedCourses = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (storedCourses) {
      try {
        const parsedCourses = JSON.parse(storedCourses);
        // Ensure stored courses have all required fields by merging with initial data
        const mergedCourses = parsedCourses.map(storedCourse => {
          const initialCourse = initialCourses.find(ic => ic.id === storedCourse.id);
          return initialCourse ? { ...initialCourse, ...storedCourse } : storedCourse;
        });
        return mergedCourses;
      } catch (error) {
        console.error('Error parsing stored courses:', error);
        return initialCourses;
      }
    }
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(initialCourses));
    return initialCourses;
  });

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(courses));
  }, [courses]);

  const addCourse = (newCourse) => {
    setCourses(prevCourses => [...prevCourses, { ...newCourse, id: prevCourses.length + 1 }]);
  };

  const updateCourse = (id, updatedCourse) => {
    setCourses(prevCourses => 
      prevCourses.map(course => 
        course.id === id ? { ...course, ...updatedCourse } : course
      )
    );
  };

  const deleteCourse = (id) => {
    setCourses(prevCourses => prevCourses.filter(course => course.id !== id));
  };

  const getCourseById = (id) => {
    const found = courses.find(course => course.id === parseInt(id));
    return found;
  };

  return (
    <CourseContext.Provider value={{ 
      courses, 
      addCourse, 
      updateCourse, 
      deleteCourse,
      getCourseById
    }}>
      {children}
    </CourseContext.Provider>
  );
}

CourseProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export function useCourses() {
  return useContext(CourseContext);
}
