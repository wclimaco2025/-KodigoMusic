import { TracksItem } from "@/types/types.kodigomusic";
import { formatDuration, formatTime } from "@/utils/utils.kodigomusic";
import { useState, useRef, useEffect } from "react";
import { searchJamendo } from "@/api/music-streaming.api";

// Props para pasar el id de la Canción
interface CancionesProps {
  cancionProp?: TracksItem;
}

export const Player = ({ cancionProp }: CancionesProps) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [audioSource, setAudioSource] = useState<string>("");
  const audioRef = useRef<HTMLAudioElement>(null);

  // Buscar fuentes de audio (Spotify + Jamendo)
  const findAudioSource = async (songName: string, artistName: string) => {
    setIsLoading(true);
    setAudioUrl(null);
    setAudioSource("");

    try {
      // 1. Intentar con Spotify preview primero
      if (cancionProp?.preview_url) {
        setAudioUrl(cancionProp.preview_url);
        setAudioSource("Spotify Preview (30s)");
        setIsLoading(false);
        return;
      }

      // 2. Buscar en Jamendo (música libre)
      const jamendoResult = await searchJamendo(songName, artistName);
      if (jamendoResult?.audioUrl) {
        setAudioUrl(jamendoResult.audioUrl);
        setAudioSource("Jamendo");
        setIsLoading(false);
        return;
      }

      // No se encontró ninguna fuente
      setAudioSource("No disponible");
      setIsLoading(false);
    } catch (error) {
      console.error("Error buscando fuente de audio:", error);
      setAudioSource("Error");
      setIsLoading(false);
    }
  };

  // Calcular el porcentaje de progreso
  const progressPercentage = duration > 0 ? (currentTime / duration) * 100 : 0;

  // Manejar play/pause
  const togglePlayPause = async () => {
    if (!audioUrl && cancionProp) {
      // Buscar fuente de audio si no existe
      const songName = cancionProp.name;
      const artistName =
        cancionProp.artists?.map((a) => a.name).join(", ") || "";
      await findAudioSource(songName, artistName);
      return;
    }

    if (audioRef.current && audioUrl) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  // Manejar click en la barra de progreso
  const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (audioRef.current && duration > 0) {
      const rect = e.currentTarget.getBoundingClientRect();
      const clickX = e.clientX - rect.left;
      const newTime = (clickX / rect.width) * duration;
      audioRef.current.currentTime = newTime;
      setCurrentTime(newTime);
    }
  };

  // Efectos para manejar eventos del audio
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const updateTime = () => setCurrentTime(audio.currentTime);
    const updateDuration = () => setDuration(audio.duration);
    const handleEnded = () => setIsPlaying(false);

    audio.addEventListener("timeupdate", updateTime);
    audio.addEventListener("loadedmetadata", updateDuration);
    audio.addEventListener("ended", handleEnded);

    return () => {
      audio.removeEventListener("timeupdate", updateTime);
      audio.removeEventListener("loadedmetadata", updateDuration);
      audio.removeEventListener("ended", handleEnded);
    };
  }, [audioUrl]);

  // Efecto para buscar audio cuando cambia la canción
  useEffect(() => {
    if (cancionProp) {
      const songName = cancionProp.name;
      const artistName =
        cancionProp.artists?.map((a) => a.name).join(", ") || "";
      findAudioSource(songName, artistName);
    }
  }, [cancionProp]);

  return (
    <div className="bg-gradient-to-r from-gray-900 to-black p-4 shadow-2xl fixed bottom-0 left-0 right-0 border-t border-gray-700">
      {/* Audio element oculto */}
      {audioUrl && <audio ref={audioRef} src={audioUrl} preload="metadata" />}

      <div className="max-w-7xl mx-auto">
        {/* Progress Bar */}
        <div className="mb-3">
          <div className="flex items-center gap-2 text-xs text-gray-400">
            <span>{formatTime(currentTime)}</span>
            <div
              className="flex-1 bg-gray-700 rounded-full h-1 group cursor-pointer"
              onClick={handleProgressClick}
            >
              <div
                className="bg-white h-1 rounded-full group-hover:bg-red-500 transition-colors relative"
                style={{ width: `${progressPercentage}%` }}
              >
                <div className="absolute right-0 top-1/2 transform -translate-y-1/2 w-3 h-3 bg-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></div>
              </div>
            </div>
            <span>
              {duration > 0
                ? formatTime(duration)
                : formatDuration(cancionProp?.duration_ms || 0)}
            </span>
          </div>
        </div>

        <div className="flex items-center justify-between">
          {/* Current Song Info */}
          <div className="flex items-center gap-4 flex-1 min-w-0">
            <div className="w-14 h-14 bg-gray-700 rounded-lg overflow-hidden flex-shrink-0">
              <div className="w-full h-full bg-gradient-to-br from-red-500 to-red-600 flex items-center justify-center">
                <svg
                  className="w-6 h-6 text-white"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M18 3a1 1 0 00-1.447-.894L8.763 6H5a3 3 0 000 6h.28l1.771 5.316A1 1 0 008 18h1a1 1 0 001-1v-4.382l6.553 3.276A1 1 0 0018 15V3z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
            </div>
            <div className="min-w-0 flex-1">
              <h3 className="text-white font-medium truncate">
                {cancionProp?.name || "Selecciona una canción"}
              </h3>
              <p className="text-gray-400 text-sm truncate">
                {cancionProp?.artists
                  ?.map((artist) => artist.name)
                  .join(", ") || "Artista desconocido"}
              </p>
              {audioSource && (
                <p className="text-xs text-gray-500 truncate">
                  {isLoading ? "Buscando audio..." : `Fuente: ${audioSource}`}
                </p>
              )}
            </div>
            <button className="text-gray-400 hover:text-white transition-colors p-2">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" />
              </svg>
            </button>
          </div>

          {/* Player Controls */}
          <div className="flex items-center gap-4 flex-1 justify-center">
            <button className="text-gray-400 hover:text-white transition-colors">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path d="M8.445 14.832A1 1 0 0010 14v-2.798l5.445 3.63A1 1 0 0017 14V6a1 1 0 00-1.555-.832L10 8.798V6a1 1 0 00-1.555-.832l-6 4a1 1 0 000 1.664l6 4z" />
              </svg>
            </button>

            <button className="text-gray-400 hover:text-white transition-colors">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M15.707 15.707a1 1 0 01-1.414 0l-5-5a1 1 0 010-1.414l5-5a1 1 0 111.414 1.414L11.414 9H17a1 1 0 110 2h-5.586l3.293 3.293a1 1 0 010 1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </button>

            <button
              className="bg-white text-black rounded-full p-3 hover:scale-105 transition-transform disabled:opacity-50 disabled:cursor-not-allowed"
              onClick={togglePlayPause}
              disabled={isLoading || (!audioUrl && !cancionProp)}
            >
              {isLoading ? (
                <svg
                  className="w-6 h-6 animate-spin"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M4 2a2 2 0 00-2 2v11a2 2 0 002 2h2a2 2 0 002-2V4a2 2 0 00-2-2H4zm6 0a2 2 0 00-2 2v11a2 2 0 002 2h2a2 2 0 002-2V4a2 2 0 00-2-2h-2z"
                    clipRule="evenodd"
                  />
                </svg>
              ) : isPlaying ? (
                <svg
                  className="w-6 h-6"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zM7 8a1 1 0 012 0v4a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v4a1 1 0 102 0V8a1 1 0 00-1-1z"
                    clipRule="evenodd"
                  />
                </svg>
              ) : (
                <svg
                  className="w-6 h-6"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z"
                    clipRule="evenodd"
                  />
                </svg>
              )}
            </button>

            <button className="text-gray-400 hover:text-white transition-colors">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0l5 5a1 1 0 010 1.414l-5 5a1 1 0 01-1.414-1.414L8.586 11H3a1 1 0 110-2h5.586L4.293 5.707a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </button>

            <button className="text-gray-400 hover:text-white transition-colors">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path d="M11.555 5.168A1 1 0 0010 6v8a1 1 0 001.555.832l6-4a1 1 0 000-1.664l-6-4zM3 6a1 1 0 011.555-.832L10 8.798V6a1 1 0 011.555-.832l6 4a1 1 0 010 1.664l-6 4A1 1 0 0110 14v-2.798l-5.445 3.63A1 1 0 003 14V6z" />
              </svg>
            </button>
          </div>

          {/* Volume and Additional Controls */}
          <div className="flex items-center gap-4 flex-1 justify-end">
            <button className="text-gray-400 hover:text-white transition-colors">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M9.383 3.076A1 1 0 0110 4v12a1 1 0 01-1.617.816L4.846 13H2a1 1 0 01-1-1V8a1 1 0 011-1h2.846l3.537-3.816a1 1 0 011.617.816zM16.446 6.88a1 1 0 011.414 1.414L16.414 10l1.446 1.706a1 1 0 11-1.414 1.414L15 11.414l-1.446 1.706a1 1 0 11-1.414-1.414L13.586 10l-1.446-1.706a1 1 0 111.414-1.414L15 8.586l1.446-1.706z"
                  clipRule="evenodd"
                />
              </svg>
            </button>

            <div className="flex items-center gap-2 w-32">
              <svg
                className="w-4 h-4 text-gray-400"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M9.383 3.076A1 1 0 0110 4v12a1 1 0 01-1.617.816L4.846 13H2a1 1 0 01-1-1V8a1 1 0 011-1h2.846l3.537-3.816a1 1 0 011.617.816zM12.828 7.172a4 4 0 010 5.656 1 1 0 01-1.414-1.414 2 2 0 000-2.828 1 1 0 011.414-1.414z"
                  clipRule="evenodd"
                />
              </svg>
              <div className="flex-1 bg-gray-700 rounded-full h-1 group cursor-pointer">
                <div className="bg-white h-1 rounded-full w-3/4 group-hover:bg-red-500 transition-colors relative">
                  <div className="absolute right-0 top-1/2 transform -translate-y-1/2 w-3 h-3 bg-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></div>
                </div>
              </div>
            </div>

            <button className="text-gray-400 hover:text-white transition-colors">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M3 4a1 1 0 011-1h4a1 1 0 010 2H6.414l2.293 2.293a1 1 0 01-1.414 1.414L5 6.414V8a1 1 0 01-2 0V4zm9 1a1 1 0 010-2h4a1 1 0 011 1v4a1 1 0 01-2 0V6.414l-2.293 2.293a1 1 0 11-1.414-1.414L13.586 5H12zm-9 7a1 1 0 012 0v1.586l2.293-2.293a1 1 0 111.414 1.414L6.414 15H8a1 1 0 010 2H4a1 1 0 01-1-1v-4zm13-1a1 1 0 011 1v4a1 1 0 01-1 1h-4a1 1 0 010-2h1.586l-2.293-2.293a1 1 0 111.414-1.414L15.586 13H14a1 1 0 01-1-1z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
