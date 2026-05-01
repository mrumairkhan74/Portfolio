import { BrowserRouter, Route, Routes, useNavigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Loading from './components/Loading';
import { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import { ThemeProvider } from './context/ThemeContext';
import ProjectDetailsPage from './components/ProjectDetails';
import Projects from './pages/Projects';
import ContactPage from './pages/Contact';
import SkillsPage from './pages/Skill';
import Blog from './pages/Blog';
import BlogPost from './pages/BlogPost';
import LoginPage from './pages/Login';
import AdminDashboard from './pages/AdminDashboard';

function AppContent() {
  const [showLoading, setShowLoading] = useState(true);
  const navigate = useNavigate();

  const handleLoadingComplete = () => {
    setShowLoading(false);
    navigate('/', { replace: true });
  };

  return (
    <>
      <AnimatePresence mode='wait'>
        {showLoading && <Loading key={'loading'} onComplete={handleLoadingComplete} />}
      </AnimatePresence>
      {!showLoading && (
        <>
          <Navbar />
          <div className="pt-16">
            <Routes>
              <Route path='/' element={<Home />} />
              <Route path='/login' element={<LoginPage />} />
              <Route path='/admin' element={<AdminDashboard />} />
              <Route path='/projects' element={<Projects />} />
              <Route path='/skills' element={<SkillsPage />} />
              <Route path='/contact' element={<ContactPage />} />
              <Route path="/project/:id" element={<ProjectDetailsPage />} />
              <Route path="/blog" element={<Blog />} />
              <Route path="/blog/:id" element={<BlogPost />} />
            </Routes>
          </div>
        </>
      )}
    </>
  );
}

const App = () => {
  return (
    <BrowserRouter>
      <ThemeProvider>
        <AppContent />
      </ThemeProvider>
    </BrowserRouter>
  );
};

export default App;