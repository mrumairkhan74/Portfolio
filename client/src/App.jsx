import { BrowserRouter, Route, Routes, useNavigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Loading from './components/Loading';
import { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import { ThemeProvider } from './context/ThemeContext';
import ProjectDetailsPage from './components/ProjectDetails';
import ProjectsSection from './components/ProjectSection';

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
              <Route path='/projects' element={<ProjectsSection />} />
              <Route path="/project/:id" element={<ProjectDetailsPage />} />
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