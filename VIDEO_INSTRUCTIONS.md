# Cómo Agregar Video al Sitio Web de Cumpleaños

## Opción 1: Subir Video Directamente

1. **Subir archivo de video a Replit:**
   - Ve a la carpeta `attached_assets` en el panel de archivos
   - Arrastra y suelta tu archivo de video (MP4, WebM, MOV)
   - O haz clic en "+" y selecciona "Upload file"

2. **Activar el video en el código:**
   - Abre `client/src/pages/birthday.tsx`
   - Busca la sección "Video Section" (línea ~230)
   - Descomenta el código del video (quita los /* y */)
   - Cambia `tu-video.mp4` por el nombre real de tu archivo

## Ejemplo de Código Activado

```javascript
<video 
  controls 
  className="w-full h-full object-cover"
  poster="/attached_assets/video-thumbnail.jpg"
>
  <source src="/attached_assets/mi-video-cumpleanos.mp4" type="video/mp4" />
  <source src="/attached_assets/mi-video-cumpleanos.webm" type="video/webm" />
  Tu navegador no soporta el elemento de video.
</video>
```

## Opción 2: Video desde YouTube/Vimeo

Para videos de YouTube o Vimeo, reemplaza el contenido del div con un iframe:

```javascript
<iframe 
  className="w-full h-full rounded-xl"
  src="https://www.youtube.com/embed/TU_VIDEO_ID"
  title="Video especial"
  frameBorder="0"
  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
  allowFullScreen
></iframe>
```

## Formatos de Video Recomendados

- **MP4** - Más compatible con todos los navegadores
- **WebM** - Buena compresión, ideal para web
- **MOV** - Funciona pero archivos más grandes

## Consejos

1. **Tamaño de archivo:** Mantén videos bajo 50MB para carga rápida
2. **Resolución:** 1080p es ideal, 720p también funciona bien
3. **Duración:** Videos de 1-5 minutos son perfectos
4. **Miniatura:** Agrega una imagen poster para mostrar antes de reproducir

## Pasos Completos

1. Sube tu video a `attached_assets/`
2. Abre `client/src/pages/birthday.tsx`
3. Ve a la línea ~230 (sección Video)
4. Descomenta el código del video
5. Cambia el nombre del archivo por el tuyo
6. ¡Guarda y disfruta tu video personalizado!

El video aparecerá en la sección "Video Especial" del sitio web de cumpleaños.