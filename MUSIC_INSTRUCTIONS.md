# Cómo Agregar Música al Sitio Web de Cumpleaños

## Opción 1: Subir Archivos de Música Directamente

1. **Subir archivos a Replit:**
   - Haz clic en "Files" en el panel izquierdo
   - Navega a la carpeta `attached_assets`
   - Arrastra y suelta tus archivos MP3, WAV, M4A u otros formatos
   - O haz clic en el botón "+" y selecciona "Upload file"

2. **Editar la lista de canciones:**
   - Abre el archivo `client/src/components/MusicPlayer.tsx`
   - Busca la sección `const songs = [`
   - Agrega tus canciones así:
   ```javascript
   {
     name: "Nombre de tu canción",
     url: "/attached_assets/tu-archivo-de-musica.mp3"
   },
   ```

## Opción 2: Usar Música desde Internet

Puedes usar enlaces directos a archivos de música:

```javascript
{
  name: "Canción desde Internet",
  url: "https://ejemplo.com/tu-cancion.mp3"
},
```

## Opción 3: Usar Servicios de Música Gratuitos

### YouTube Audio (no recomendado para producción)
- Puedes convertir videos de YouTube a MP3 usando herramientas online
- Luego subir el archivo como en la Opción 1

### Sitios de Música Libre de Derechos:
- **Freesound.org** - Efectos de sonido y música
- **Archive.org** - Música de dominio público
- **OpenMusicArchive.org** - Música libre

## Ejemplo Completo

Si tienes un archivo llamado `happy-birthday-dalia.mp3`, la configuración sería:

```javascript
const songs = [
  {
    name: "Feliz Cumpleaños Dalia",
    url: "/attached_assets/happy-birthday-dalia.mp3"
  },
  {
    name: "Canción de Stitch",
    url: "/attached_assets/stitch-song.mp3"
  },
  {
    name: "Música de Celebración",
    url: "/attached_assets/celebration-music.mp3"
  }
];
```

## Formatos Soportados

- **MP3** - Más compatible
- **WAV** - Alta calidad
- **M4A** - Buena calidad, menor tamaño
- **OGG** - Alternativa libre

## Consejos

1. **Tamaño de archivos:** Mantén los archivos bajo 10MB para carga rápida
2. **Calidad:** 128kbps es suficiente para web
3. **Longitud:** Canciones de 2-4 minutos son ideales
4. **Volumen:** Normaliza el volumen de todos los archivos

¡Listo! Con estos pasos puedes personalizar completamente la música del sitio web de cumpleaños.