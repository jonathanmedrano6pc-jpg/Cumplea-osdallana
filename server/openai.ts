// Fallback poems when API is not available
const fallbackPoems = {
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

interface PoemRequest {
  theme: string;
}

export async function generatePoem(request: PoemRequest): Promise<{ poem: string }> {
  // Always use fallback poems
  const fallbackPoem = fallbackPoems[request.theme as keyof typeof fallbackPoems] || fallbackPoems.birthday;
  return { poem: fallbackPoem };
}