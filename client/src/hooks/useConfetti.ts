import { useEffect } from 'react';

declare global {
  interface Window {
    confetti: any;
  }
}

export function useConfetti() {
  useEffect(() => {
    // Load confetti library
    const script = document.createElement('script');
    script.src = 'https://cdn.jsdelivr.net/npm/canvas-confetti@1.9.2/dist/confetti.browser.min.js';
    script.async = true;
    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script);
    };
  }, []);

  const triggerConfetti = () => {
    if (window.confetti) {
      window.confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#87CEEB', '#FFB6C1', '#800080', '#ff6b9d']
      });
    }
  };

  return { triggerConfetti };
}
