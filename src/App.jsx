import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { CourseProvider } from './context/CourseContext';
import { AuthProvider } from './context/AuthContext';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import HomePage from './pages/HomePage';
import CourseDetailPage from './pages/CourseDetailPage';
import AdminPage from './pages/AdminPage';

export default function App() {
  return (
    <AuthProvider>
      <CourseProvider>
        <Router>
          <Routes>
            {/* Add root path redirect */}
            <Route path="/" element={<Navigate to="/home" replace />} />
            <Route path="/home" element={<HomePage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/course/:id" element={<CourseDetailPage />} />
            <Route path="/admin" element={<AdminPage />} />
            {/* Redirect unknown routes to home */}
            <Route path="*" element={<Navigate to="/home" replace />} />
          </Routes>
        </Router>
      </CourseProvider>
    </AuthProvider>
  );
}
