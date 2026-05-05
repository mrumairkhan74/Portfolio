import { BrowserRouter, Route, Routes, useNavigate, useLocation } from 'react-router-dom';
import { lazy, Suspense, useState, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import { useMobileOptimization } from './hooks/useMobileOptimization';
import Navbar from './components/Navbar';

// Lazy load components
const Loading = lazy(() => import('./components/Loading'));
const HomePage = lazy(() => import('./pages/Home'));
const SkillsPage = lazy(() => import('./pages/Skill'));
const ContactPage = lazy(() => import('./pages/Contact'));
const ProjectDetailsPage = lazy(() => import('./components/ProjectDetails'));
const LoginPage = lazy(() => import('./pages/Login'));
const AdminDashboard = lazy(() => import('./pages/AdminDashboard'));
const Projects = lazy(() => import('./pages/Projects'));
const Blog = lazy(() => import('./pages/Blog'));
const BlogPost = lazy(() => import('./pages/BlogPost'));

const PageLoader = () => (
  <div className="min-h-screen flex items-center justify-center bg-dark-primary">
    <img src="./loading.svg" className='animate-spin w-12 h-12' alt="" />
  </div>
);

function AppContent() {
  const [showLoading, setShowLoading] = useState(() => {
    // Only show loading on first visit (desktop only)
    const hasVisited = sessionStorage.getItem('hasVisited');
    return !hasVisited;
  });

  const navigate = useNavigate();
  const location = useLocation();
  // const { isMobile } = useMobileOptimization();
  const [pendingPath, setPendingPath] = useState(null);

  // Store the intended path before showing loading
  useEffect(() => {
    if (showLoading && location.pathname !== '/') {
      setPendingPath(location.pathname);
      navigate('/', { replace: true });
    }
  }, []);

  // Skip loading screen on mobile devices
  // useEffect(() => {
  //   if (isMobile) {
  //     setShowLoading(false);
  //     sessionStorage.setItem('hasVisited', 'true');
  //   }
  // }, [isMobile]);

  const handleLoadingComplete = () => {
    setShowLoading(false);
    sessionStorage.setItem('hasVisited', 'true');

    // Navigate to the intended path after loading completes
    if (pendingPath && pendingPath !== '/') {
      navigate(pendingPath, { replace: true });
      setPendingPath(null);
    }
  };

  // On mobile, don't show loading screen at all
  // if (isMobile) {
  //   return (
  //     <Suspense fallback={<PageLoader />}>
  //       <Navbar />
  //       <div className="pt-16">
  //         <Routes>
  //           <Route path="/" element={<HomePage />} />
  //           <Route path="/projects" element={<Projects />} />
  //           <Route path="/skills" element={<SkillsPage />} />
  //           <Route path="/contact" element={<ContactPage />} />
  //           <Route path="/project/:id" element={<ProjectDetailsPage />} />
  //           <Route path="/login" element={<LoginPage />} />
  //           <Route path="/admin" element={<AdminDashboard />} />
  //           <Route path="/blog" element={<Blog />} />
  //           <Route path="/blog/:id" element={<BlogPost />} />
  //         </Routes>
  //       </div>
  //     </Suspense>
  //   );
  // }

  return (
    <>
      <AnimatePresence mode="wait">
        {showLoading && (
          <Suspense fallback={<PageLoader />}>
            <Loading key="loading" onComplete={handleLoadingComplete} />
          </Suspense>
        )}
      </AnimatePresence>
      {!showLoading && (
        <Suspense fallback={<PageLoader />}>
          <Navbar />
          <div className="pt-16">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/projects" element={<Projects />} />
              <Route path="/skills" element={<SkillsPage />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route path="/project/:id" element={<ProjectDetailsPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/admin" element={<AdminDashboard />} />
              <Route path="/blog" element={<Blog />} />
              <Route path="/blog/:id" element={<BlogPost />} />
            </Routes>
          </div>
        </Suspense>
      )}
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}

export default App;