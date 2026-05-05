// hooks/useMobileOptimization.js
import { useState, useEffect } from 'react';

export const useMobileOptimization = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [isLowEndDevice, setIsLowEndDevice] = useState(false);
  const [screenSize, setScreenSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  useEffect(() => {
    const checkDevice = () => {
      const width = window.innerWidth;
      const isMobileDevice = width < 768;
      
      // Check for low-end device by memory and cores
      const isLowEnd = (
        (navigator.deviceMemory && navigator.deviceMemory < 4) || // Less than 4GB RAM
        (navigator.hardwareConcurrency && navigator.hardwareConcurrency < 4) || // Less than 4 cores
        /Android [1-4]/.test(navigator.userAgent) || // Old Android
        /iPhone OS [1-9]_/.test(navigator.userAgent) // Old iOS
      );
      
      setIsMobile(isMobileDevice);
      setIsLowEndDevice(isLowEnd);
      setScreenSize({ width, height: window.innerHeight });
    };

    checkDevice();
    
    let timeoutId;
    const handleResize = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(checkDevice, 150);
    };
    
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
      clearTimeout(timeoutId);
    };
  }, []);

  return { 
    isMobile, 
    isLowEndDevice, 
    screenSize,
    isTablet: screenSize.width >= 768 && screenSize.width < 1024,
    isDesktop: screenSize.width >= 1024,
  };
};