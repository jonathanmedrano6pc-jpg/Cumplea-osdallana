import { useEffect, useRef } from 'react';

export default function FloatingHearts() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const createFloatingHeart = () => {
      if (!containerRef.current) return;

      const heart = document.createElement('div');
      heart.className = 'floating-heart';
      heart.style.left = Math.random() * 100 + '%';
      heart.style.width = (Math.random() * 15 + 10) + 'px';
      heart.style.height = heart.style.width;
      heart.style.animationDelay = Math.random() * 2 + 's';
      heart.style.animationDuration = (Math.random() * 3 + 8) + 's';
      
      containerRef.current.appendChild(heart);
      
      setTimeout(() => {
        if (heart.parentNode) {
          heart.remove();
        }
      }, 12000);
    };

    const interval = setInterval(createFloatingHeart, 3000);
    
    // Create initial hearts
    for (let i = 0; i < 3; i++) {
      setTimeout(createFloatingHeart, i * 1000);
    }

    return () => clearInterval(interval);
  }, []);

  return (
    <div 
      ref={containerRef}
      className="fixed top-0 left-0 w-full h-full pointer-events-none overflow-hidden z-0"
    />
  );
}
