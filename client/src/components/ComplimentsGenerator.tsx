import { useState } from 'react';

const compliments = [
  "Eres la persona más increíble que conozco ✨",
  "Tu sonrisa puede iluminar el día más oscuro 😊",
  "Tienes un corazón tan grande como el océano 💙",
  "Eres más brillante que todas las estrellas juntas ⭐",
  "Tu bondad inspira a todos a tu alrededor 🌟",
  "Eres un regalo para este mundo 🎁",
  "Tu risa es la melodía más hermosa 🎵",
  "Tienes la fuerza de mil guerreros 💪",
  "Eres tan especial como un unicornio 🦄",
  "Tu presencia hace que todo sea mejor 💕",
  "Eres la definición perfecta de belleza interior y exterior 🌸",
  "Tu energía positiva es contagiosa 🌈",
  "Eres más valiosa que todos los tesoros del mundo 💎",
  "Tu inteligencia brilla como un diamante 💎",
  "Eres la razón por la que creo en la magia ✨"
];

export default function ComplimentsGenerator() {
  const [currentCompliment, setCurrentCompliment] = useState("Tu cumplido aparecerá aquí...");
  const [isVisible, setIsVisible] = useState(false);

  const generateCompliment = () => {
    setIsVisible(false);
    
    setTimeout(() => {
      const randomCompliment = compliments[Math.floor(Math.random() * compliments.length)];
      setCurrentCompliment(randomCompliment);
      setIsVisible(true);
    }, 300);
  };

  return (
    <div className="bg-white p-10 rounded-2xl shadow-xl text-center">
      <p className="text-gray-600 mb-6 text-lg">
        ¡Presiona el botón para recibir un cumplido especial! 💝
      </p>
      
      <div className={`generator-output bg-blue-50 border-2 border-stitch-pink rounded-xl p-6 mb-6 min-h-24 flex items-center justify-center text-lg font-medium ${isVisible ? 'visible' : ''}`}>
        <span className={isVisible ? "text-stitch-purple font-medium" : "text-gray-500"}>
          {currentCompliment}
        </span>
      </div>
      
      <button 
        onClick={generateCompliment}
        className="bg-stitch-pink hover:bg-pink-300 text-white font-bold py-4 px-8 rounded-full text-lg transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
      >
        <i className="fas fa-heart mr-2"></i>
        ¡Dame un cumplido!
      </button>
    </div>
  );
}
