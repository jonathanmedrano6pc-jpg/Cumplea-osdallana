import { useState, useEffect } from 'react';
import MusicPlayer from './MusicPlayer';

export default function Navigation() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      if (currentScrollY < 50) {
        // Siempre mostrar en la parte superior
        setIsVisible(true);
      } else if (currentScrollY > lastScrollY && currentScrollY > 100) {
        // Scrolling hacia abajo - ocultar
        setIsVisible(false);
        setIsMobileMenuOpen(false); // Cerrar menú móvil también
      } else if (currentScrollY < lastScrollY) {
        // Scrolling hacia arriba - mostrar
        setIsVisible(true);
      }
      
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [lastScrollY]);

  return (
    <header className={`gradient-stitch-header text-white p-4 shadow-lg sticky top-0 z-50 transition-transform duration-300 ${
      isVisible ? 'translate-y-0' : '-translate-y-full'
    }`}>
      <nav className="container mx-auto flex justify-between items-center">
        <div className="font-pacifico text-2xl text-white drop-shadow-md">
          Dallana's Birthday 🎉
        </div>
        
        {/* Desktop Navigation */}
        <ul className="hidden md:flex space-x-8 font-bold">
          <li><a href="#cover" className="hover:text-stitch-pink transition-colors">Inicio</a></li>
          <li><a href="#message" className="hover:text-stitch-pink transition-colors">Mensaje</a></li>
          <li><a href="#gallery" className="hover:text-stitch-pink transition-colors">Galería</a></li>
          <li><a href="#compliments" className="hover:text-stitch-pink transition-colors">Cumplidos</a></li>
          <li><a href="#poems" className="hover:text-stitch-pink transition-colors">Poemas</a></li>
          <li><a href="#memories" className="hover:text-stitch-pink transition-colors">Recuerdos</a></li>
        </ul>

        {/* Music Player */}
        <MusicPlayer />

        {/* Mobile Hamburger */}
        <button 
          className="md:hidden flex flex-col space-y-1 cursor-pointer" 
          onClick={toggleMobileMenu}
        >
          <span className="h-1 w-6 bg-white rounded"></span>
          <span className="h-1 w-6 bg-white rounded"></span>
          <span className="h-1 w-6 bg-white rounded"></span>
        </button>
      </nav>

      {/* Mobile Navigation Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden mt-4">
          <ul className="space-y-4 text-center">
            <li><a href="#cover" className="block hover:text-stitch-pink transition-colors" onClick={closeMobileMenu}>Inicio</a></li>
            <li><a href="#message" className="block hover:text-stitch-pink transition-colors" onClick={closeMobileMenu}>Mensaje</a></li>
            <li><a href="#gallery" className="block hover:text-stitch-pink transition-colors" onClick={closeMobileMenu}>Galería</a></li>
            <li><a href="#compliments" className="block hover:text-stitch-pink transition-colors" onClick={closeMobileMenu}>Cumplidos</a></li>
            <li><a href="#poems" className="block hover:text-stitch-pink transition-colors" onClick={closeMobileMenu}>Poemas</a></li>
            <li><a href="#memories" className="block hover:text-stitch-pink transition-colors" onClick={closeMobileMenu}>Recuerdos</a></li>
          </ul>
        </div>
      )}
    </header>
  );
}
