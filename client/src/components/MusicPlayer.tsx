import { useState, useRef, useEffect, useCallback } from 'react';

// Función global para pausar la música desde cualquier componente
let globalPauseMusic: (() => void) | null = null;
let globalResumeMusic: (() => void) | null = null;

// Funciones exportadas para controlar la música desde otros componentes
export const pauseMusicGlobally = () => {
  if (globalPauseMusic) {
    globalPauseMusic();
  }
};

export const resumeMusicGlobally = () => {
  if (globalResumeMusic) {
    globalResumeMusic();
  }
};

export default function MusicPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentSong, setCurrentSong] = useState(0);
  const audioRef = useRef<HTMLAudioElement>(null);
  const [hasStartedAutomatically, setHasStartedAutomatically] = useState(false);
  const [isPausedByVideo, setIsPausedByVideo] = useState(false);
  const [showMobilePrompt, setShowMobilePrompt] = useState(false);
  const [loopEnabled, setLoopEnabled] = useState(true);

  // Lista de canciones (puedes agregar más URLs aquí)
  const songs = [
    {
      name: "Yo soy tu amigo Fiel",
      url: "attached_assets/Toy Story - Yo Soy Tu Amigo Fiel » LETRA ♫ ♬ ♪ ♩ - Lyrics TOP.mp3"
    },
    {
      name: "Luz en mi Tormenta",
      url: "/attached_assets/luz-en-mi-tormenta_1752379601856.mp3"
    },

    {
    },
    {  
    }
  ];

  const toggleMusic = () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play().catch(e => {
        console.log('Audio play failed:', e);
        // Si falla, intenta con la siguiente canción
        nextSong();
      });
      setIsPlaying(true);
    }
  };

  const pauseMusic = () => {
    if (audioRef.current && isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
      setIsPausedByVideo(true);
      setLoopEnabled(false); // Detener el loop cuando video inicia
    }
  };

  const resumeMusic = () => {
    if (audioRef.current && !isPlaying && isPausedByVideo) {
      audioRef.current.play().catch(e => {
        console.log('Audio play failed:', e);
      });
      setIsPlaying(true);
      setIsPausedByVideo(false);
      setLoopEnabled(true); // Reanudar el loop cuando video termine
    }
  };

  // Función para iniciar música en móvil
  const startMusicOnInteraction = () => {
    if (!hasStartedAutomatically && audioRef.current) {
      audioRef.current.play().then(() => {
        setIsPlaying(true);
        setHasStartedAutomatically(true);
        setShowMobilePrompt(false);
      }).catch(err => console.log('Play on interaction failed:', err));
    }
  };

  const nextSong = useCallback(() => {
    setCurrentSong((prev) => (prev + 1) % songs.length);
    // Mantener reproduciendo para que continúe automáticamente
    setIsPlaying(true);
  }, [songs.length]);

  useEffect(() => {
    // La configuración de eventos 'ended' se maneja en otro useEffect

    // Configurar funciones globales para controlar música
    globalPauseMusic = pauseMusic;
    globalResumeMusic = resumeMusic;

    // Intentar autoplay inmediatamente (funciona en desktop)
    const timer = setTimeout(() => {
      if (!hasStartedAutomatically && audioRef.current) {
        audioRef.current.play().then(() => {
          setIsPlaying(true);
          setHasStartedAutomatically(true);
        }).catch(e => {
          console.log('Auto-play failed, adding interaction listeners');
          
          // Mostrar prompt en móvil después de 3 segundos
          setTimeout(() => {
            if (!hasStartedAutomatically) {
              setShowMobilePrompt(true);
            }
          }, 3000);
          
          // Si falla, agregar múltiples listeners para capturar cualquier interacción
          const events = ['click', 'touchstart', 'touchend', 'scroll', 'keydown'];
          
          events.forEach(eventType => {
            document.addEventListener(eventType, startMusicOnInteraction, { 
              once: true, 
              passive: true 
            });
          });
        });
      }
    }, 1000); // Reducir a 1 segundo

    return () => {
      clearTimeout(timer);
    };
  }, [hasStartedAutomatically]);

  // Efecto para manejar cambios de canción y loop automático
  useEffect(() => {
    if (audioRef.current && isPlaying) {
      audioRef.current.load();
      audioRef.current.play().catch(e => {
        console.log('Song change play failed:', e);
        setIsPlaying(false);
      });
    }
  }, [currentSong]);

  // Efecto adicional para asegurar que la música continúe reproduciendo
  useEffect(() => {
    const audio = audioRef.current;
    if (audio && loopEnabled) {
      // También configurar loop en el elemento audio como backup
      const handleCanPlay = () => {
        if (isPlaying && !isPausedByVideo) {
          audio.play().catch(e => console.log('Auto-continue play failed:', e));
        }
      };
      
      audio.addEventListener('canplay', handleCanPlay);
      
      return () => {
        audio.removeEventListener('canplay', handleCanPlay);
      };
    }
  }, [loopEnabled, isPlaying, isPausedByVideo]);

  // Efecto para configurar loop automático - versión simplificada
  useEffect(() => {
    const audio = audioRef.current;
    if (audio) {
      const handleEnded = () => {
        console.log('🎵 Canción terminó, loop habilitado:', loopEnabled, 'isPlaying:', isPlaying);
        // Solo cambiar a la siguiente canción si el loop está habilitado y debería estar reproduciendo
        if (loopEnabled && !isPausedByVideo) {
          console.log('🔄 Cambiando a siguiente canción...');
          nextSong();
        }
      };
      
      audio.addEventListener('ended', handleEnded);
      
      return () => {
        audio.removeEventListener('ended', handleEnded);
      };
    }
  }, [loopEnabled, nextSong, isPausedByVideo]);

  return (
    <>
      <div 
        className="hidden md:flex items-center gap-3 bg-white bg-opacity-20 px-4 py-2 rounded-full cursor-pointer hover:bg-opacity-30 transition-all"
        onClick={toggleMusic}
      >
        <img 
          src="https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=80&h=80" 
          alt="Stitch" 
          className={`w-10 h-10 rounded-full object-cover transition-transform ${isPlaying ? 'rotating' : ''}`}
        />
        <div className="flex flex-col">
          <span className="text-white font-bold text-sm">
            ♪ Música {isPausedByVideo ? '(Pausada por video)' : ''}
          </span>
          <span className="text-white text-xs opacity-80">{songs[currentSong]?.name || 'Cargando...'}</span>
        </div>
        <button 
          onClick={(e) => {
            e.stopPropagation();
            nextSong();
          }}
          className="text-white hover:text-stitch-pink transition-colors text-sm"
        >
          ⏭
        </button>
      </div>
      
      <audio 
        ref={audioRef} 
        src={songs[currentSong]?.url || ''} 
        loop={false}
        preload="auto"
        muted={false}
        autoPlay={false}
      />
      
      {/* Reproductor móvil simplificado */}
      <div 
        className="md:hidden flex items-center gap-2 bg-white bg-opacity-20 px-3 py-2 rounded-full cursor-pointer hover:bg-opacity-30 transition-all"
        onClick={toggleMusic}
      >
        <span className="text-white text-sm">♪</span>
      </div>
      
      {/* Prompt para iniciar música en móvil */}
      {showMobilePrompt && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-gradient-to-br from-stitch-blue to-stitch-purple p-8 rounded-2xl text-center max-w-sm shadow-2xl">
            <div className="text-6xl mb-4">🎵</div>
            <h3 className="text-white font-pacifico text-2xl mb-4">
              ¡Música de Cumpleaños!
            </h3>
            <p className="text-white text-lg mb-6">
              Toca aquí para escuchar música especial para Dalia
            </p>
            <button
              onClick={() => {
                startMusicOnInteraction();
                setShowMobilePrompt(false);
              }}
              className="bg-stitch-pink text-white font-bold py-4 px-8 rounded-full text-xl transition-all duration-300 hover:scale-105 shadow-lg"
            >
              🎶 Reproducir Música
            </button>
          </div>
        </div>
      )}
    </>
  );
}


