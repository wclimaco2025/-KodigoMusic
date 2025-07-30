"use client";
import { fetchAlbums } from "@/services/kodigomusic.service";
import { AlbumResponse } from "@/types/types.kodigomusic";
import { useQuery } from "@tanstack/react-query";

// Props para pasar el id del Album seleccionado para ver las canciones
interface AlbumProps {
  onAlbumClick?: (albumId: string) => void;
  selectedAlbum?: AlbumResponse; // Para manejar el álbum seleccionado 
}

export const Album = ({ onAlbumClick }: AlbumProps) => {

  // Usando Tanstack Query para consumir el api de spotify y retornar albumes 
  const { data: albums = [], isLoading, error } =useQuery<AlbumResponse[], Error>({
    queryKey: ["albums"],
    queryFn: fetchAlbums,
    staleTime: 5 * 60 * 1000, // 5 minutos obsolete time
    gcTime: 10 * 60 * 1000, // 10 minutos garbage collector
  });

  // Evento click para manejar el album seleccionado
  const handleAlbumClick = (albumId: string) => {
    if (onAlbumClick) {
      onAlbumClick(albumId);
    }
  };

  if (isLoading) {
    return <div className="text-2xl font-bold text-white">Cargando Albumes...</div>;
  }

  if (error) {
    return <div className="text-2xl font-bold text-white">Fallo al obtener Albumes</div>;
  }

  return (
    <div className="mb-8">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-white">Álbumes Populares</h2>
        <button className="text-gray-400 hover:text-white text-sm font-medium transition-colors">
          Ver todos
        </button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
        {albums.map((album) => (
          <div
            key={album.id}
            onClick={() => handleAlbumClick(album.id)}
            className="bg-gray-800/50 p-4 rounded-lg hover:bg-gray-700/50 transition-all duration-300 cursor-pointer group"
          >
            <div className="relative mb-4">
              <img
                src={album.images[0].url}
                alt={album.name}
                className="w-full aspect-square object-cover rounded-lg shadow-lg"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300 rounded-lg flex items-center justify-center">
               
                {/* Botón de reproducción que aparece al pasar el mouse de color rojo*/}
                <button className="bg-red-500 text-white p-3 rounded-full opacity-0 group-hover:opacity-100 transform scale-75 group-hover:scale-100 transition-all duration-300 hover:bg-red-600">
                 {/* Icono de Play */}
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
                </button>
              </div>
            </div>

            <div>
              {/* Título del álbum, nombre del artista y año de lanzamiento, cambia el color del título con el hover */}
              <h3 className="text-white font-medium text-sm mb-1 truncate group-hover:text-red-400 transition-colors">
                {album.name}
              </h3>
              <p className="text-gray-400 text-xs mb-1 truncate">
                {album.artists[0].name}
              </p>
              <p className="text-gray-500 text-xs">
                {new Date(album.release_date).getFullYear()} •{" "}
                {album.total_tracks} canciones
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
