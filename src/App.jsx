import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import HomePage from './pages/HomePage';
import CourseDetailPage from './pages/CourseDetailPage';
import AdminPage from './pages/AdminPage';
import ProfilePage from './pages/ProfilePage';
import LoadingScreen from './components/organisms/LoadingScreen';

function AppRoutes() {
  const { isInitializing } = useSelector((state) => state.user);

  if (isInitializing) {
    return (
      <LoadingScreen 
        message="Memuat aplikasi..." 
        size="large" 
        color="primary"
        fullScreen={true}
      />
    );
  }

  return (
    <Router>
      <Routes>
        {/* Add root path redirect */}
        <Route path="/" element={<Navigate to="/home" replace />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/course/:id" element={<CourseDetailPage />} />
        <Route path="/admin" element={<AdminPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        {/* Redirect unknown routes to home */}
        <Route path="*" element={<Navigate to="/home" replace />} />
      </Routes>
    </Router>
  );
}

export default function App() {
  return <AppRoutes />;
}
