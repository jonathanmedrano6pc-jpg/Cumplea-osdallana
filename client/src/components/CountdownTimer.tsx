import { useState, useEffect } from 'react';

export default function CountdownTimer() {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    isExpired: false
  });

  useEffect(() => {
    const updateCountdown = () => {
      const now = new Date().getTime();
      const birthday = new Date('2025-08-22T00:00:00').getTime();
      const distance = birthday - now;

      if (distance < 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0, isExpired: true });
        return;
      }

      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);

      setTimeLeft({ days, hours, minutes, seconds, isExpired: false });
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);

    return () => clearInterval(interval);
  }, []);

  if (timeLeft.isExpired) {
    return (
      <div className="bg-white bg-opacity-10 backdrop-blur-sm p-8 rounded-2xl shadow-xl max-w-2xl mx-auto">
        <div className="font-pacifico text-4xl text-stitch-pink drop-shadow-sm">
          ¡Es tu cumpleaños! 🎉
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white bg-opacity-10 backdrop-blur-sm p-8 rounded-2xl shadow-xl max-w-2xl mx-auto">
      <h3 className="text-2xl mb-6 font-quicksand">Tiempo hasta tu próximo cumpleaños:</h3>
      <div className="flex justify-center gap-8 flex-wrap">
        <div className="text-center">
          <div className="font-pacifico text-4xl md:text-5xl text-stitch-pink drop-shadow-sm">
            {timeLeft.days.toString().padStart(3, '0')}
          </div>
          <div className="text-sm md:text-base mt-2">Días</div>
        </div>
        <div className="text-center">
          <div className="font-pacifico text-4xl md:text-5xl text-stitch-pink drop-shadow-sm">
            {timeLeft.hours.toString().padStart(2, '0')}
          </div>
          <div className="text-sm md:text-base mt-2">Horas</div>
        </div>
        <div className="text-center">
          <div className="font-pacifico text-4xl md:text-5xl text-stitch-pink drop-shadow-sm">
            {timeLeft.minutes.toString().padStart(2, '0')}
          </div>
          <div className="text-sm md:text-base mt-2">Minutos</div>
        </div>
        <div className="text-center">
          <div className="font-pacifico text-4xl md:text-5xl text-stitch-pink drop-shadow-sm">
            {timeLeft.seconds.toString().padStart(2, '0')}
          </div>
          <div className="text-sm md:text-base mt-2">Segundos</div>
        </div>
      </div>
    </div>
  );
}
