import { useState } from 'react';

const poems = [
  `En tu día especial brillarás,
como estrella que nunca se va.
Tu sonrisa ilumina el lugar,
y tu alegría nos hace soñar. ✨`,

  `Cumpleaños feliz, querida amiga,
que la vida te sonría y te siga.
Que cada momento sea especial,
y que tu felicidad sea total. 🎂`,

  `Como Stitch y su ohana querida,
nuestra amistad es para toda la vida.
En tu día te deseo lo mejor,
que tengas mucha paz y amor. 💙`,

  `Eres única y muy especial,
tu corazón es puro cristal.
Que este nuevo año que empiezas,
esté lleno de grandes sorpresas. 🌟`,

  `Tus sueños vuelan alto y van,
como las aves que libres están.
Que cada meta que te propongas,
la alcances con todas tus fuerzas. 🌈`,

  `En este día tan importante,
que la felicidad sea constante.
Que cada hora, cada momento,
sea mágico como un cuento. 🎉`,

  `Tu risa es melodía divina,
tu presencia siempre ilumina.
Que la vida te dé mil razones,
para vivir con emociones. 💖`,

  `Como flor que crece en jardín,
tu belleza no tiene fin.
Que este año nuevo que comienza,
te traiga mucha esperanza. 🌸`
];

export default function PoemGenerator() {
  const [currentPoem, setCurrentPoem] = useState("Tu poema aparecerá aquí...");
  const [isVisible, setIsVisible] = useState(false);

  const generatePoem = () => {
    setIsVisible(false);

    setTimeout(() => {
      const randomPoem = poems[Math.floor(Math.random() * poems.length)];
      setCurrentPoem(randomPoem);
      setIsVisible(true);
    }, 300);
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-8">
        <h2 className="font-pacifico text-5xl text-stitch-purple mb-4 drop-shadow-sm">
          Generador de Poemas
        </h2>
        <p className="text-lg text-gray-600">
          ¡Presiona el botón para recibir un poema especial! 📝
        </p>
      </div>

      <div className="bg-white p-10 rounded-2xl shadow-xl text-center">
        <div className={`generator-output bg-purple-50 border-2 border-stitch-pink rounded-xl p-8 mb-6 min-h-32 flex items-center justify-center text-lg ${isVisible ? 'visible' : ''}`}>
          <span className={isVisible ? "text-stitch-purple font-medium whitespace-pre-line" : "text-gray-500"}>
            {currentPoem}
          </span>
        </div>

        <button 
          onClick={generatePoem}
          className="bg-stitch-purple hover:bg-purple-600 text-white font-bold py-4 px-8 rounded-full text-lg transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
        >
          <i className="fas fa-feather-alt mr-2"></i>
          ¡Dame un poema!
        </button>
      </div>
    </div>
  );
}