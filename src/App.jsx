import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from '@/context/AuthContext';

// Public Layout & Pages
import Layout from '@/components/common/Layout';
import Home from '@/pages/Home';
import About from '@/pages/About';
import Academics from '@/pages/Academics';
import Admissions from '@/pages/Admissions';
import Blog from '@/pages/Blog';
import BlogDetail from '@/pages/BlogDetail';
import NoticeDetail from '@/pages/NoticeDetail';
import Gallery from '@/pages/Gallery';
import Faculty from '@/pages/Faculty';
import Contact from '@/pages/Contact';

// Admin Layout & Pages
import AdminLayout from '@/admin/layouts/AdminLayout';
import Login from '@/admin/pages/Login';
import Dashboard from '@/admin/pages/Dashboard';
import HeroManager from '@/admin/pages/HeroManager';
import NoticesManager from '@/admin/pages/NoticesManager';
import AcademicsManager from '@/admin/pages/AcademicsManager';
import BlogManager from '@/admin/pages/BlogManager';
import GalleryManager from '@/admin/pages/GalleryManager';
import TeachersManager from '@/admin/pages/TeachersManager';
import InquiriesViewer from '@/admin/pages/InquiriesViewer';
import MessagesViewer from '@/admin/pages/MessagesViewer';

import './index.css';

import { Toaster } from 'sonner';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="about" element={<About />} />
            <Route path="academics" element={<Academics />} />
            <Route path="admissions" element={<Admissions />} />
            <Route path="blog" element={<Blog />} />
            <Route path="blog/:slug" element={<BlogDetail />} />
            <Route path="gallery" element={<Gallery />} />
            <Route path="faculty" element={<Faculty />} />
            <Route path="contact" element={<Contact />} />
            <Route path="notices/:id" element={<NoticeDetail />} />
          </Route>

          {/* Admin Login Route */}
          <Route path="/admin/login" element={<Login />} />

          {/* Protected Admin Routes */}
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<Dashboard />} />
            <Route path="hero" element={<HeroManager />} />
            <Route path="notices" element={<NoticesManager />} />
            <Route path="academics" element={<AcademicsManager />} />
            <Route path="blog" element={<BlogManager />} />
            <Route path="gallery" element={<GalleryManager />} />
            <Route path="teachers" element={<TeachersManager />} />
            <Route path="inquiries" element={<InquiriesViewer />} />
            <Route path="messages" element={<MessagesViewer />} />
          </Route>
        </Routes>
        <Toaster richColors position="top-right" />
      </Router>
    </AuthProvider>
  );
}

export default App;
