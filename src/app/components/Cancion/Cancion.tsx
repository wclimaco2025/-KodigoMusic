import { useQuery } from "@tanstack/react-query";
import {TracksItem} from "@/types/types.kodigomusic";
import {fetchSongs} from "@/services/kodigomusic.service";
import { formatDuration } from "@/utils/utils.kodigomusic";

// Props para pasar el id del Album
interface CancionProps {
  albumId?: string;
  onSongClick?: (cancionId: TracksItem) => void;
}

export const Cancion = ({ albumId, onSongClick }: CancionProps) => {
  // Usando Tanstack Query para consumir el api de spotify y retornar canciones del album seleccionado
  // Habilitamos la query solo si tenemos un albumId
  const { data: songs = [], isLoading, error } = useQuery<TracksItem[], Error>({
    queryKey: ["canciones", albumId],
    queryFn: () => fetchSongs(albumId!),
    enabled: !!albumId, // Solo ejecutar la query si tenemos un albumId
    staleTime: 5 * 60 * 1000, // 5 minutos obsolete time
    gcTime: 10 * 60 * 1000, // 10 minutos garbage collector
  });

  // Evento click para manejar el album seleccionado
  const handleSongClick = (cancionSel: TracksItem) => {
    if (onSongClick) {
      onSongClick(cancionSel);
    }
    //console.log("CAncion seleccionada: ", cancionSel);
  };

  if (!albumId) {
    return (
      <div className="text-center py-8">
        <p className="text-2xl font-bold text-white">Selecciona un álbum para ver sus canciones</p>
      </div>
    );
  }

  if (isLoading) {
    return <div className="text-2xl font-bold text-white">Cargando canciones...</div>;
  }

  if (error) {
    return <div className="text-2xl font-bold text-white">Error al cargar las canciones</div>;
  }



  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-white">Lista de Canciones</h2>
        <button className="text-gray-400 hover:text-white text-sm font-medium transition-colors">
          Ver todas
        </button>
      </div>

      <div className="bg-gray-800/30 rounded-lg overflow-hidden">
        {/* Header */}
        <div className="grid grid-cols-12 gap-4 px-6 py-3 text-gray-400 text-sm font-medium border-b border-gray-700/50">
          <div className="col-span-1">#</div>
          <div className="col-span-5">TÍTULO</div>
          <div className="col-span-3">ÁLBUM</div>
          <div className="col-span-2">REPRODUCCIONES</div>
          <div className="col-span-1 text-right">
            <svg className="w-4 h-4 ml-auto" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.414-1.414L11 9.586V6z" clipRule="evenodd" />
            </svg>
          </div>
        </div>

        {/* Songs List */}
        <div>
          {songs.map((song: TracksItem, index: number) => (
            <div
              key={song.id}
              onClick={() => handleSongClick(song)}
              className="grid grid-cols-12 gap-4 px-6 py-3 hover:bg-gray-700/30 transition-colors group cursor-pointer"
            >
              <div className="col-span-1 flex items-center">
                <span className="text-gray-400 group-hover:hidden">{index + 1}</span>
                <button className="hidden group-hover:block text-white hover:text-red-400 transition-colors">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                  </svg>
                </button>
              </div>

              {/* Botón Play de la canción */}
              <div className="col-span-5 flex items-center gap-3">
                <div className="w-10 h-10 bg-gray-700 rounded flex-shrink-0 flex items-center justify-center">
                  <svg className="w-5 h-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 3a1 1 0 00-1.447-.894L8.763 6H5a3 3 0 000 6h.28l1.771 5.316A1 1 0 008 18h1a1 1 0 001-1v-4.382l6.553 3.276A1 1 0 0018 15V3z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="min-w-0">
                  <p className="font-medium truncate text-white">
                    {song.name}
                  </p>
                  <p className="text-gray-400 text-sm truncate">
                    {song.artists.map(artist => artist.name).join(', ')}
                  </p>
                </div>
              </div>

              <div className="col-span-3 flex items-center">
                <p className="text-gray-400 text-sm truncate hover:text-white transition-colors cursor-pointer">
                  Álbum
                </p>
              </div>

              <div className="col-span-2 flex items-center">
                <p className="text-gray-400 text-sm">-</p>
              </div>

              <div className="col-span-1 flex items-center justify-end gap-2">
                <button className="opacity-0 group-hover:opacity-100 text-gray-400 hover:text-white transition-all">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" />
                  </svg>
                </button>
                <span className="text-gray-400 text-sm">{formatDuration(song.duration_ms)}</span>
                <button className="opacity-0 group-hover:opacity-100 text-gray-400 hover:text-white transition-all">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
                  </svg>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
