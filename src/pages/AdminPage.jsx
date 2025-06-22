import React, { useState } from 'react';
import { useCourses } from '../context/CourseContext';
import Typography from '../components/atoms/Typography';
import Button from '../components/atoms/Button';
import Input from '../components/atoms/Input';

export default function AdminPage() {
  const { courses, addCourse, updateCourse, deleteCourse } = useCourses();
  const [showForm, setShowForm] = useState(false);
  const [editingCourse, setEditingCourse] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    fullDescription: '',
    teacherName: '',
    teacherJob: '',
    teacherDescription: '',
    price: '',
    rating: '',
    image: '',
    teacherImage: '',
    category: '',
    modules: [
      {
        id: 1,
        title: '',
        lessons: [
          { title: '', type: 'video', duration: '15 Menit' }
        ]
      }
    ],
    tutors: [
      {
        name: '',
        role: '',
        description: '',
        rating: 0,
        reviews: []
      }
    ],
    reviews: [
      {
        name: '',
        role: '',
        description: '',
        rating: 0,
        date: ''
      }
    ]
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const courseData = {
      ...formData,
      stars: ['full', 'full', 'half', 'empty', 'empty'], // Default stars
      rating: `${formData.rating} (86)` // Format rating
    };

    if (editingCourse) {
      updateCourse(editingCourse.id, courseData);
      setEditingCourse(null);
    } else {
      addCourse(courseData);
    }

    // Reset form
    setFormData({
      title: '',
      description: '',
      fullDescription: '',
      teacherName: '',
      teacherJob: '',
      teacherDescription: '',
      price: '',
      rating: '',
      image: '',
      teacherImage: '',
      category: '',
      modules: [
        {
          id: 1,
          title: '',
          lessons: [
            { title: '', type: 'video', duration: '15 Menit' }
          ]
        }
      ],
      tutors: [
        {
          name: '',
          role: '',
          description: '',
          rating: 0,
          reviews: []
        }
      ],
      reviews: [
        {
          name: '',
          role: '',
          description: '',
          rating: 0,
          date: ''
        }
      ]
    });
    setShowForm(false);
  };

  const handleEdit = (course) => {
    setEditingCourse(course);
    setFormData({
      title: course.title,
      description: course.description,
      fullDescription: course.fullDescription || '',
      teacherName: course.teacherName,
      teacherJob: course.teacherJob,
      teacherDescription: course.teacherDescription || '',
      price: course.price,
      rating: course.rating.split(' ')[0], // Extract rating number
      image: course.image,
      teacherImage: course.teacherImage,
      category: course.category || '',
      modules: course.modules || [
        {
          id: 1,
          title: '',
          lessons: [
            { title: '', type: 'video', duration: '15 Menit' }
          ]
        }
      ],
      tutors: course.tutors || [
        {
          name: '',
          role: '',
          description: '',
          rating: 0,
          reviews: []
        }
      ],
      reviews: course.reviews || [
        {
          name: '',
          role: '',
          description: '',
          rating: 0,
          date: ''
        }
      ]
    });
    setShowForm(true);
  };

  const handleDelete = (id) => {
    if (window.confirm('Apakah Anda yakin ingin menghapus kursus ini?')) {
      deleteCourse(id);
    }
  };

  const handleCancel = () => {
    setShowForm(false);
    setEditingCourse(null);
    setFormData({
      title: '',
      description: '',
      teacherName: '',
      teacherJob: '',
      price: '',
      rating: '',
      image: '',
      teacherImage: '',
      category: ''
    });
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <div className="flex justify-between items-center">
            <div>
              <Typography variant="h2" className="text-gray-800">
                Admin Dashboard
              </Typography>
              <Typography variant="body1" color="secondary">
                Kelola data kursus video pembelajaran
              </Typography>
            </div>
            <div className="flex gap-4">
              <div className="text-center">
                <Typography variant="h4" className="text-blue-600">
                  {courses.length}
                </Typography>
                <Typography variant="body2" color="secondary">
                  Total Kursus
                </Typography>
              </div>
            </div>
          </div>
        </div>

        {/* Add Course Button */}
        <div className="mb-6">
          <Button 
            variant="primary" 
            onClick={() => setShowForm(true)}
            className="bg-green-600 hover:bg-green-700"
          >
            + Tambah Kursus Baru
          </Button>
        </div>

        {/* Form Modal */}
        {showForm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
              <Typography variant="h5" className="mb-4">
                {editingCourse ? 'Edit Kursus' : 'Tambah Kursus Baru'}
              </Typography>
              
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Judul Kursus
                  </label>
                  <Input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    required
                    className="w-full"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Deskripsi Singkat
                  </label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    required
                    rows="3"
                    className="w-full px-3 py-2 border border-[#F1F1F1] rounded-md focus:outline-none focus:ring-2 focus:ring-[#3ECF4C] focus:border-transparent hover:border-[#3ECF4C]"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Deskripsi Lengkap
                  </label>
                  <textarea
                    name="fullDescription"
                    value={formData.fullDescription}
                    onChange={handleInputChange}
                    rows="4"
                    className="w-full px-3 py-2 border border-[#F1F1F1] rounded-md focus:outline-none focus:ring-2 focus:ring-[#3ECF4C] focus:border-transparent hover:border-[#3ECF4C]"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Nama Instruktur
                    </label>
                    <Input
                      type="text"
                      name="teacherName"
                      value={formData.teacherName}
                      onChange={handleInputChange}
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Pekerjaan Instruktur
                    </label>
                    <Input
                      type="text"
                      name="teacherJob"
                      value={formData.teacherJob}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Harga
                    </label>
                    <Input
                      type="text"
                      name="price"
                      value={formData.price}
                      onChange={handleInputChange}
                      placeholder="Rp {input nominal}K"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Rating (1-5)
                    </label>
                    <Input
                      type="number"
                      name="rating"
                      value={formData.rating}
                      onChange={handleInputChange}
                      min="1"
                      max="5"
                      step="0.1"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    URL Gambar Kursus
                  </label>
                  <Input
                    type="text"
                    name="image"
                    value={formData.image}
                    onChange={handleInputChange}
                    placeholder="/assets/index/course section/course type/image-{image number | 1-9}.jpeg"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    URL Foto Instruktur
                  </label>
                  <Input
                    type="text"
                    name="teacherImage"
                    value={formData.teacherImage}
                    onChange={handleInputChange}
                    placeholder="/assets/index/course section/course teacher/image-{image number | 1-8}.png"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Kategori
                  </label>
                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 border border-[#F1F1F1] rounded-md focus:outline-none focus:ring-2 focus:ring-[#3ECF4C] focus:border-transparent hover:border-[#3ECF4C]"
                  >
                    <option value="">Pilih Kategori</option>
                    <option value="Pemasaran">Pemasaran</option>
                    <option value="Desain">Desain</option>
                    <option value="Pengembangan Diri">Pengembangan Diri</option>
                    <option value="Bisnis">Bisnis</option>
                  </select>
                </div>

                {/* Modules Section */}
                <div className="pt-6 border-t border-gray-300">
                  <Typography variant="h6" className="mb-2">Modul Kursus</Typography>
                  {formData.modules.map((module, mIndex) => (
                    <div key={module.id} className="mb-4 p-4 border border-gray-300 rounded">
                      <div className="flex justify-between items-center mb-2">
                        <div className='w-full'>
                        <label className='block'>Judul Modul</label>
                        <Input
                          type="text"
                          name={`module-title-${module.id}`}
                          value={module.title}
                          onChange={(e) => {
                            const newModules = [...formData.modules];
                            newModules[mIndex].title = e.target.value;
                            setFormData(prev => ({ ...prev, modules: newModules }));
                          }}
                          // className="flex-grow"
                        />
                        </div>
                        <button
                          type="button"
                          onClick={() => {
                            const newModules = formData.modules.filter((_, idx) => idx !== mIndex);
                            setFormData(prev => ({ ...prev, modules: newModules }));
                          }}
                          className=" text-red-600 hover:text-red-900"
                        >
                          Hapus Modul
                        </button>
                      </div>

                      {/* Lessons */}
                      <div>
                        <Typography variant="subtitle1" className="mb-1">Judul Pelajaran</Typography>
                        {module.lessons.map((lesson, lIndex) => (
                          <div key={lIndex} className="flex gap-2 mb-2 items-center">
                            <Input
                              type="text"
                              name={`lesson-title-${module.id}-${lIndex}`}
                              value={lesson.title}
                              onChange={(e) => {
                                const newModules = [...formData.modules];
                                newModules[mIndex].lessons[lIndex].title = e.target.value;
                                setFormData(prev => ({ ...prev, modules: newModules }));
                              }}
                              className="flex-grow"
                            />
                            <select
                              name={`lesson-type-${module.id}-${lIndex}`}
                              value={lesson.type}
                              onChange={(e) => {
                                const newModules = [...formData.modules];
                                newModules[mIndex].lessons[lIndex].type = e.target.value;
                                setFormData(prev => ({ ...prev, modules: newModules }));
                              }}
                              className="border border-gray-300 rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-[#3ECF4C] focus:border-transparent hover:border-[#3ECF4C]"
                            >
                              <option value="video">Video</option>
                              <option value="article">Artikel</option>
                              <option value="quiz">Kuis</option>
                            </select>
                            <Input
                              type="text"
                              name={`lesson-duration-${module.id}-${lIndex}`}
                              value={lesson.duration}
                              onChange={(e) => {
                                const newModules = [...formData.modules];
                                newModules[mIndex].lessons[lIndex].duration = e.target.value;
                                setFormData(prev => ({ ...prev, modules: newModules }));
                              }}
                              placeholder="Durasi (misal: 15 Menit)"
                              className="w-24"
                            />
                            <button
                              type="button"
                              onClick={() => {
                                const newModules = [...formData.modules];
                                newModules[mIndex].lessons.splice(lIndex, 1);
                                setFormData(prev => ({ ...prev, modules: newModules }));
                              }}
                              className="text-red-600 hover:text-red-900"
                            >
                              Hapus
                            </button>
                          </div>
                        ))}
                        <button
                          type="button"
                          onClick={() => {
                            const newModules = [...formData.modules];
                            newModules[mIndex].lessons.push({ title: '', type: 'video', duration: '' });
                            setFormData(prev => ({ ...prev, modules: newModules }));
                          }}
                          className="text-blue-600 hover:text-blue-900"
                        >
                          + Tambah Pelajaran
                        </button>
                      </div>
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={() => {
                      const newModules = [...formData.modules];
                      newModules.push({
                        id: newModules.length + 1,
                        title: '',
                        lessons: [{ title: '', type: 'video', duration: '' }]
                      });
                      setFormData(prev => ({ ...prev, modules: newModules }));
                    }}
                    className="text-blue-600 hover:text-blue-900"
                  >
                    + Tambah Modul
                  </button>
                </div>

                {/* Tutors Section */}
                <div className="pt-6 border-t border-gray-300">
                  <Typography variant="h6" className="mb-2">Tutor</Typography>
                  {formData.tutors.map((tutor, tIndex) => (
                    <div key={tIndex} className="mb-4 p-4 border border-gray-300 rounded">
                      <Input
                        type="text"
                        name={`tutor-name-${tIndex}`}
                        value={tutor.name}
                        onChange={(e) => {
                          const newTutors = [...formData.tutors];
                          newTutors[tIndex].name = e.target.value;
                          setFormData(prev => ({ ...prev, tutors: newTutors }));
                        }}
                        placeholder="Nama Tutor"
                        disableAutoFillOnFocus
                        className="mb-2"
                      />
                      <Input
                        type="text"
                        name={`tutor-role-${tIndex}`}
                        value={tutor.role}
                        onChange={(e) => {
                          const newTutors = [...formData.tutors];
                          newTutors[tIndex].role = e.target.value;
                          setFormData(prev => ({ ...prev, tutors: newTutors }));
                        }}
                        placeholder="Peran Tutor"
                        disableAutoFillOnFocus
                        className="mb-2"
                      />
                      <textarea
                        name={`tutor-description-${tIndex}`}
                        value={tutor.description}
                        onChange={(e) => {
                          const newTutors = [...formData.tutors];
                          newTutors[tIndex].description = e.target.value;
                          setFormData(prev => ({ ...prev, tutors: newTutors }));
                        }}
                        placeholder="Deskripsi Tutor"
                        rows="3"
                        className="w-full px-3 py-2 border border-[#F1F1F1] rounded-md mb-2 focus:outline-none focus:ring-2 focus:ring-[#3ECF4C] focus:border-transparent hover:border-[#3ECF4C]"
                      />
                      <label className='block text-gray-500'>Rating</label>
                      <Input
                        type="number"
                        name={`tutor-rating-${tIndex}`}
                        value={tutor.rating}
                        onChange={(e) => {
                          const newTutors = [...formData.tutors];
                          newTutors[tIndex].rating = Number(e.target.value);
                          setFormData(prev => ({ ...prev, tutors: newTutors }));
                        }}
                        min="0"
                        max="5"
                        step="0.1"
                        className="mb-2"
                      />
                      <button
                        type="button"
                        onClick={() => {
                          const newTutors = formData.tutors.filter((_, idx) => idx !== tIndex);
                          setFormData(prev => ({ ...prev, tutors: newTutors }));
                        }}
                        className="text-red-600 hover:text-red-900"
                      >
                        Hapus Tutor
                      </button>
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={() => {
                      const newTutors = [...formData.tutors];
                      newTutors.push({ name: '', role: '', description: '', rating: 0, reviews: [] });
                      setFormData(prev => ({ ...prev, tutors: newTutors }));
                    }}
                    className="text-blue-600 hover:text-blue-900"
                  >
                    + Tambah Tutor
                  </button>
                </div>

                {/* Reviews Section */}
                <div className="pt-6 border-t border-gray-300">
                  <Typography variant="h6" className="mb-2">Review</Typography>
                  {formData.reviews.map((review, rIndex) => (
                    <div key={rIndex} className="mb-4 p-4 border border-gray-300 rounded">
                      <Input
                        type="text"
                        name={`review-name-${rIndex}`}
                        value={review.name}
                        onChange={(e) => {
                          const newReviews = [...formData.reviews];
                          newReviews[rIndex].name = e.target.value;
                          setFormData(prev => ({ ...prev, reviews: newReviews }));
                        }}
                        placeholder="Nama Reviewer"
                        disableAutoFillOnFocus
                        className="mb-2"
                      />
                      <Input
                        type="text"
                        name={`review-role-${rIndex}`}
                        value={review.role}
                        onChange={(e) => {
                          const newReviews = [...formData.reviews];
                          newReviews[rIndex].role = e.target.value;
                          setFormData(prev => ({ ...prev, reviews: newReviews }));
                        }}
                        placeholder="Peran Reviewer"
                        disableAutoFillOnFocus
                        className="mb-2"
                      />
                      <textarea
                        name={`review-description-${rIndex}`}
                        value={review.description}
                        onChange={(e) => {
                          const newReviews = [...formData.reviews];
                          newReviews[rIndex].description = e.target.value;
                          setFormData(prev => ({ ...prev, reviews: newReviews }));
                        }}
                        placeholder="Deskripsi Review"
                        rows="3"
                        className="w-full px-3 py-2 border border-[#F1F1F1] rounded-md mb-2 focus:outline-none focus:ring-2 focus:ring-[#3ECF4C] focus:border-transparent hover:border-[#3ECF4C]"
                      />
                      <label className='block text-gray-500'>Rating</label>
                      <Input
                        type="number"
                        name={`review-rating-${rIndex}`}
                        value={review.rating}
                        onChange={(e) => {
                          const newReviews = [...formData.reviews];
                          newReviews[rIndex].rating = Number(e.target.value);
                          setFormData(prev => ({ ...prev, reviews: newReviews }));
                        }}
                        placeholder="Rating Review"
                        min="0"
                        max="5"
                        step="0.1"
                        className="mb-2"
                      />
                      <label className='block text-gray-500'>Date Review</label>
                      <Input
                        type="date"
                        name={`review-date-${rIndex}`}
                        value={review.date}
                        onChange={(e) => {
                          const newReviews = [...formData.reviews];
                          newReviews[rIndex].date = e.target.value;
                          setFormData(prev => ({ ...prev, reviews: newReviews }));
                        }}
                        className="mb-2"
                      />
                      <button
                        type="button"
                        onClick={() => {
                          const newReviews = formData.reviews.filter((_, idx) => idx !== rIndex);
                          setFormData(prev => ({ ...prev, reviews: newReviews }));
                        }}
                        className="text-red-600 hover:text-red-900"
                      >
                        Hapus Review
                      </button>
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={() => {
                      const newReviews = [...formData.reviews];
                      newReviews.push({ name: '', role: '', description: '', rating: 0, date: '' });
                      setFormData(prev => ({ ...prev, reviews: newReviews }));
                    }}
                    className="text-blue-600 hover:text-blue-900"
                  >
                    + Tambah Review
                  </button>
                </div>
                <div className="flex gap-4 pt-6 border-t border-gray-300">
                  <Button type="submit" variant="primary">
                    {editingCourse ? 'Update Kursus' : 'Tambah Kursus'}
                  </Button>
                  <Button 
                    type="button" 
                    variant="secondary" 
                    onClick={handleCancel}
                  >
                    Batal
                  </Button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Courses Table */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <Typography variant="h5">Daftar Kursus</Typography>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    ID
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Kursus
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Instruktur
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Kategori
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Harga
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Rating
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Aksi
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {courses.map((course) => (
                  <tr key={course.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {course.id}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center">
                        <img 
                          src={course.image} 
                          alt={course.title}
                          className="w-12 h-12 rounded-lg object-cover mr-4"
                        />
                        <div>
                          <Typography variant="body1" className="font-medium text-gray-900">
                            {course.title}
                          </Typography>
                          <Typography variant="body2" color="secondary" className="truncate max-w-xs">
                            {course.description}
                          </Typography>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center">
                        <img 
                          src={course.teacherImage} 
                          alt={course.teacherName}
                          className="w-8 h-8 rounded-full object-cover mr-3"
                        />
                        <div>
                          <Typography variant="body2" className="font-medium">
                            {course.teacherName}
                          </Typography>
                          <Typography variant="body2" color="secondary" className="text-xs">
                            {course.teacherJob}
                          </Typography>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                        {course.category || 'Tidak ada kategori'}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <Typography variant="body2" className="text-green-600 font-semibold">
                        {course.price}
                      </Typography>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <Typography variant="body2">
                        {course.rating}
                      </Typography>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleEdit(course)}
                          className="text-blue-600 hover:text-blue-900 px-3 py-1 rounded bg-blue-100 hover:bg-blue-200"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(course.id)}
                          className="text-red-600 hover:text-red-900 px-3 py-1 rounded bg-red-100 hover:bg-red-200"
                        >
                          Hapus
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
