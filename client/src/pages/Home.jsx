import { useTheme } from '../context/ThemeContext';
import { useMobileOptimization } from '../hooks/useMobileOptimization';
import MolecularBackground from '../components/MolecularBackground';
import HeroSection from '../components/HeroSection';
import ProjectsSection from '../components/ProjectSection';
import HomeSkills from '../components/HomeSkills';
import HomeQuote from '../components/widgets/HomeQuotes';
import HomeBlog from '../components/HomeBlog';
import HomeContact from '../components/HomeContact';

const Home = () => {
  const { isDark } = useTheme();
  const { isMobile, reduceAnimations } = useMobileOptimization();

  return (
    <div className="relative min-h-screen overflow-x-hidden">
      {/* Only show molecular background on desktop for performance */}
      {!isMobile && <MolecularBackground />}
      
      {/* Mobile-optimized background */}
      <div
        className="fixed inset-0 pointer-events-none z-[1]"
        style={{
          background: isDark
            ? isMobile
              ? '#0A0A0F' // Solid color on mobile for performance
              : 'radial-gradient(circle at 50% 30%, rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.8))'
            : isMobile
              ? '#F8FAFC' // Solid color on mobile for performance
              : 'radial-gradient(circle at 50% 30%, rgba(255, 255, 255, 0.3), rgba(248, 250, 252, 0.9))',
          transition: reduceAnimations ? 'none' : 'background 0.3s ease',
        }}
      />

      {/* Main Content */}
      <div className="relative z-10">
        <HeroSection />

        {/* Quote Widget - Between Hero and Skills */}
        <div className="container mx-auto max-w-6xl px-4 mt-4 mb-4">
          <HomeQuote />
        </div>

        <HomeSkills />
        <ProjectsSection />
        <HomeBlog />
        <HomeContact />
      </div>
    </div>
  );
};

export default Home;