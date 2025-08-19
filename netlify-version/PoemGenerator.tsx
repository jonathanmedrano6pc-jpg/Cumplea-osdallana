import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Heart, Sparkles, RefreshCw } from 'lucide-react';

const poemThemes = [
  { id: 'birthday', label: 'Cumpleaños', emoji: '🎂' },
  { id: 'friendship', label: 'Amistad', emoji: '💖' },
  { id: 'stitch', label: 'Stitch & Ohana', emoji: '💙' },
  { id: 'memories', label: 'Recuerdos', emoji: '✨' },
  { id: 'dreams', label: 'Sueños', emoji: '🌟' },
  { id: 'adventure', label: 'Aventuras', emoji: '🌈' }
];

// Static poems for Netlify version
const staticPoems = {
  birthday: `Querida Dallana, en tu día especial,
las estrellas brillan con luz celestial,
tu sonrisa ilumina cada rincón,
llenando de alegría nuestro corazón.

Como Stitch encontró su familia,
tú llegaste a mi vida con maravilla,
trayendo colores donde antes había gris,
siendo mi tesoro, mi mayor feliz.

Cada año que cumples es una celebración,
de tu bondad, tu gracia y tu compasión,
que este nuevo año te traiga mil aventuras,
y que tus sueños se vuelvan más seguros.

¡Feliz cumpleaños, mi querida Dallana!`,

  friendship: `En el jardín de la vida, Dallana,
tú eres la flor más temprana,
con pétalos de risa y hojas de ternura,
eres mi amistad más pura.

Como dos almas que se encontraron,
nuestros caminos se entrelazaron,
creando memorias doradas,
en aventuras compartidas.

Tu corazón noble y sincero,
es mi refugio verdadero,
donde encuentro paz y calma,
en la música de tu alma.

Gracias por ser mi compañía,
mi luz en cada día.`,

  stitch: `"Ohana significa familia", dice Stitch,
y tú, Dallana, eres mi match,
una familia del corazón elegida,
que nunca se abandona ni se olvida.

Como Lilo y su azul amigo,
tenemos un lazo de abrigo,
donde el amor trasciende la distancia,
y florece en cada circunstancia.

Eres mi pequeño milagro azul,
mi Stitch en forma de ángel, es veraz,
con tu travesura y tu dulzura,
haces mi vida una aventura.

Ohana para siempre seremos,
y juntos creceremos.`,

  memories: `En las páginas del tiempo, Dallana,
están escritas memorias de porcelana,
cada momento contigo es un tesoro,
que guardo en mi corazón como oro.

Recuerdo tu primera sonrisa,
como una suave brisa,
que llegó a cambiar mi mundo,
con amor tan profundo.

Las risas compartidas en tardes de sol,
los secretos susurrados en un rincón,
cada abrazo, cada conversación,
son diamantes en mi colección.

Estos recuerdos son mi fortuna,
mi luz bajo cualquier luna.`,

  dreams: `Dallana, pequeña soñadora,
el futuro te espera cada hora,
con brazos abiertos y esperanza,
para cumplir cada añoranza.

Tus sueños son mariposas de colores,
volando entre risas y amores,
cada uno más hermoso que el anterior,
pintando tu destino con primor.

No hay meta que no puedas alcanzar,
ni estrella que no puedas tocar,
porque tienes un corazón valiente,
y un alma verdaderamente ardiente.

Vuela alto, mi dulce niña,
que el mundo es tu montaña.`,

  adventure: `Dallana, compañera de aventuras,
juntos exploramos alturas,
desde montañas de almohadas,
hasta islas imaginadas.

Cada día contigo es un viaje,
lleno de magia y coraje,
donde descubrimos nuevos mundos,
en momentos tan profundos.

Eres mi co-piloto valiente,
en esta vida emocionante,
donde cada risa es un mapa,
y cada abrazo, una etapa.

Sigamos explorando juntos,
creando recuerdos únicos.`
};

export default function PoemGenerator() {
  const [selectedTheme, setSelectedTheme] = useState<string>('birthday');
  const [currentPoem, setCurrentPoem] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);

  const handleGeneratePoem = () => {
    setIsLoading(true);
    
    // Simulate loading
    setTimeout(() => {
      const poem = staticPoems[selectedTheme as keyof typeof staticPoems] || staticPoems.birthday;
      setCurrentPoem(poem);
      setIsLoading(false);
    }, 1500);
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-8">
        <h2 className="font-pacifico text-5xl text-stitch-purple mb-4 drop-shadow-sm">
          Generador de Poemas
        </h2>
        <p className="text-lg text-gray-600">
          Elige un tema y crea un poema especial para Dallana
        </p>
      </div>

      {/* Theme Selection */}
      <Card className="mb-8 shadow-lg border-2 border-stitch-pink/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-stitch-purple">
            <Sparkles className="w-5 h-5" />
            Elige un Tema
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {poemThemes.map((theme) => (
              <Badge
                key={theme.id}
                variant={selectedTheme === theme.id ? "default" : "outline"}
                className={`p-3 cursor-pointer transition-all hover:scale-105 text-center ${
                  selectedTheme === theme.id 
                    ? 'bg-stitch-purple text-white shadow-lg' 
                    : 'hover:bg-stitch-pink/10 border-stitch-pink'
                }`}
                onClick={() => setSelectedTheme(theme.id)}
              >
                <span className="text-lg mr-2">{theme.emoji}</span>
                {theme.label}
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Generate Button */}
      <div className="text-center mb-8">
        <Button
          onClick={handleGeneratePoem}
          disabled={isLoading}
          className="bg-gradient-to-r from-stitch-blue to-stitch-purple hover:from-stitch-purple hover:to-stitch-pink text-white px-8 py-3 rounded-full text-lg font-semibold shadow-lg hover:shadow-xl transition-all transform hover:scale-105 disabled:opacity-50 disabled:transform-none"
        >
          {isLoading ? (
            <>
              <RefreshCw className="w-5 h-5 mr-2 animate-spin" />
              Creando Magia...
            </>
          ) : (
            <>
              <Heart className="w-5 h-5 mr-2" />
              Generar Poema
            </>
          )}
        </Button>
      </div>

      {/* Generated Poem Display */}
      {currentPoem && (
        <Card className="shadow-xl border-2 border-stitch-pink/30 bg-gradient-to-br from-white to-pink-50">
          <CardHeader className="text-center">
            <CardTitle className="flex items-center justify-center gap-2 text-stitch-purple">
              <Sparkles className="w-6 h-6" />
              Tu Poema Especial
              <Sparkles className="w-6 h-6" />
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="bg-white p-8 rounded-lg shadow-inner border border-stitch-pink/20">
              <div className="text-center text-gray-800 text-lg leading-relaxed whitespace-pre-line font-serif">
                {currentPoem}
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}