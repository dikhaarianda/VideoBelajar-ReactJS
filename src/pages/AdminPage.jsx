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
      teacherName: '',
      teacherJob: '',
      price: '',
      rating: '',
      image: '',
      teacherImage: '',
      category: ''
    });
    setShowForm(false);
  };

  const handleEdit = (course) => {
    setEditingCourse(course);
    setFormData({
      title: course.title,
      description: course.description,
      teacherName: course.teacherName,
      teacherJob: course.teacherJob,
      price: course.price,
      rating: course.rating.split(' ')[0], // Extract rating number
      image: course.image,
      teacherImage: course.teacherImage,
      category: course.category || ''
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
                    Deskripsi
                  </label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    required
                    rows="3"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                      placeholder="Rp 300K"
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
                    placeholder="/assets/index/course section/course type/image-1.jpeg"
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
                    placeholder="/assets/index/course section/course teacher/image-1.png"
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
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">Pilih Kategori</option>
                    <option value="Pemasaran">Pemasaran</option>
                    <option value="Desain">Desain</option>
                    <option value="Pengembangan Diri">Pengembangan Diri</option>
                    <option value="Bisnis">Bisnis</option>
                  </select>
                </div>

                <div className="flex gap-4 pt-4">
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
