import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Typography from '../components/atoms/Typography';
import Button from '../components/atoms/Button';
import Input from '../components/atoms/Input';
import LoadingSpinner from '../components/atoms/LoadingSpinner';
import {
  fetchKursus,
  createKursus,
  editKursus,
  removeKursus,
  selectKursus,
  selectKursusLoading,
  selectKursusError,
} from '../store/redux/kursusSlice';

export default function AdminPage() {
  const dispatch = useDispatch();
  const kursusList = useSelector(selectKursus);
  const loading = useSelector(selectKursusLoading);
  const error = useSelector(selectKursusError);

  const [showForm, setShowForm] = useState(false);
  const [editingKursus, setEditingKursus] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    judul: '',
    descSingkat: '',
    descLengkap: '',
    namaTutor: '',
    pekerjaanTutor: '',
    harga: '',
    rating: '',
    imgKursus: '',
    imgTutor: '',
    kategori: '',
  });

  useEffect(() => {
    dispatch(fetchKursus());
  }, [dispatch]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      if (editingKursus) {
        await dispatch(editKursus({ id: editingKursus.id, kursusData: formData })).unwrap();
        alert('Kursus berhasil diupdate!');
      } else {
        await dispatch(createKursus(formData)).unwrap();
        alert('Kursus berhasil ditambahkan!');
      }
      setShowForm(false);
      setEditingKursus(null);
      setFormData({
        judul: '',
        descSingkat: '',
        descLengkap: '',
        namaTutor: '',
        pekerjaanTutor: '',
        harga: '',
        rating: '',
        imgKursus: '',
        imgTutor: '',
        kategori: '',
      });
    } catch (err) {
      alert('Terjadi kesalahan: ' + err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleEdit = (kursus) => {
    setEditingKursus(kursus);
    setFormData({
      judul: kursus.judul,
      descSingkat: kursus.descSingkat,
      descLengkap: kursus.descLengkap || '',
      namaTutor: kursus.namaTutor,
      pekerjaanTutor: kursus.pekerjaanTutor,
      harga: kursus.harga,
      rating: kursus.rating,
      imgKursus: kursus.imgKursus,
      imgTutor: kursus.imgTutor,
      kategori: kursus.kategori || '',
    });
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Apakah Anda yakin ingin menghapus kursus ini?')) {
      try {
        await dispatch(removeKursus(id)).unwrap();
        alert('Kursus berhasil dihapus!');
      } catch (err) {
        alert('Terjadi kesalahan saat menghapus: ' + err);
      }
    }
  };

  const handleCancel = () => {
    setShowForm(false);
    setEditingKursus(null);
    setFormData({
      judul: '',
      descSingkat: '',
      namaTutor: '',
      pekerjaanTutor: '',
      harga: '',
      rating: '',
      imgKursus: '',
      imgTutor: '',
      kategori: '',
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
                  {kursusList.length}
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
                {editingKursus ? 'Edit Kursus' : 'Tambah Kursus Baru'}
              </Typography>
              
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Judul Kursus
                  </label>
                  <Input
                    type="text"
                    name="judul"
                    value={formData.judul}
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
                    name="descSingkat"
                    value={formData.descSingkat}
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
                    name="descLengkap"
                    value={formData.descLengkap}
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
                      name="namaTutor"
                      value={formData.namaTutor}
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
                      name="pekerjaanTutor"
                      value={formData.pekerjaanTutor}
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
                      name="harga"
                      value={formData.harga}
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
                    name="imgKursus"
                    value={formData.imgKursus}
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
                    name="imgTutor"
                    value={formData.imgTutor}
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
                    name="kategori"
                    value={formData.kategori}
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

                <div className="flex gap-4 pt-6 border-t border-gray-300">
                  <Button 
                    type="submit" 
                    variant="primary"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <div className="flex items-center justify-center gap-2">
                        <LoadingSpinner size="small" color="white" />
                        <span>Menyimpan...</span>
                      </div>
                    ) : (
                      editingKursus ? 'Update Kursus' : 'Tambah Kursus'
                    )}
                  </Button>
                  <Button 
                    type="button" 
                    variant="secondary" 
                    onClick={handleCancel}
                    disabled={isSubmitting}
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
                {kursusList.map((kursus) => (
                  <tr key={kursus.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {kursus.id}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center">
                        <img 
                          src={kursus.imgKursus} 
                          alt={kursus.judul}
                          className="w-12 h-12 rounded-lg object-cover mr-4"
                        />
                        <div>
                          <Typography variant="body1" className="font-medium text-gray-900">
                            {kursus.judul}
                          </Typography>
                          <Typography variant="body2" color="secondary" className="truncate max-w-xs">
                            {kursus.descSingkat}
                          </Typography>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center">
                        <img 
                          src={kursus.imgTutor} 
                          alt={kursus.namaTutor}
                          className="w-8 h-8 rounded-full object-cover mr-3"
                        />
                        <div>
                          <Typography variant="body2" className="font-medium">
                            {kursus.namaTutor}
                          </Typography>
                          <Typography variant="body2" color="secondary" className="text-xs">
                            {kursus.pekerjaanTutor}
                          </Typography>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                        {kursus.kategori || 'Tidak ada kategori'}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <Typography variant="body2" className="text-green-600 font-semibold">
                        {kursus.harga}
                      </Typography>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <Typography variant="body2">
                        {kursus.rating}
                      </Typography>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleEdit(kursus)}
                          className="text-blue-600 hover:text-blue-900 px-3 py-1 rounded bg-blue-100 hover:bg-blue-200"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(kursus.id)}
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
