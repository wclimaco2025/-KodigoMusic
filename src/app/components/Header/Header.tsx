import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { searchContent } from "@/services/kodigomusic.service";
import { SearchResults, AlbumResponse, ArtistFull, TracksItem } from "@/types/types.kodigomusic";

interface HeaderProps {
  onSearchResults?: (results: SearchResults) => void;
  onAlbumSelect?: (album: AlbumResponse) => void;
}

export const Header = ({ onSearchResults, onAlbumSelect }: HeaderProps) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<SearchResults>({ albums: [], artists: [], tracks: [] });
  const [isSearching, setIsSearching] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);
  const debounceRef = useRef<NodeJS.Timeout | null>(null);

  // Función de búsqueda con debounce
  const performSearch = async (query: string) => {
    if (!query.trim()) {
      setSearchResults({ albums: [], artists: [], tracks: [] });
      setShowResults(false);
      return;
    }

    setIsSearching(true);
    try {
      const results = await searchContent(query, 'album,artist,track', 10);
      setSearchResults(results);
      setShowResults(true);
      onSearchResults?.(results);
    } catch (error) {
      console.error('Error searching:', error);
      setSearchResults({ albums: [], artists: [], tracks: [] });
    } finally {
      setIsSearching(false);
    }
  };

  // Manejar cambios en el input con debounce
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);

    // Limpiar timeout anterior
    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }

    // Crear nuevo timeout
    debounceRef.current = setTimeout(() => {
      performSearch(query);
    }, 300);
  };

  // Manejar selección de álbum
  const handleAlbumSelect = (album: AlbumResponse) => {
    onAlbumSelect?.(album);
    setShowResults(false);
    setSearchQuery("");
  };

  // Cerrar resultados al hacer click fuera
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowResults(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Limpiar timeout al desmontar
  useEffect(() => {
    return () => {
      if (debounceRef.current) {
        clearTimeout(debounceRef.current);
      }
    };
  }, []);
  return (
    <header className="bg-gradient-to-r from-gray-900 to-gray-800 p-4 text-white shadow-lg border-b border-gray-700">
      <div className="max-w-7xl mx-auto flex items-center gap-8">
        <div className="flex items-center gap-3 flex-shrink-0">
          <div className="bg-gradient-to-br from-red-500 to-red-600 p-2 rounded-full shadow-lg">
            <Image
              src="/logo_spotify2.png"
              width={28}
              height={28}
              alt="Kodigo Music Logo"
              className="filter brightness-0 invert"
            />
          </div>
          <h1 className="text-2xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
            KODIGO MUSIC
          </h1>
        </div>

        <div className="flex-1 max-w-2xl relative" ref={searchRef}>
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            {isSearching ? (
              <svg className="h-5 w-5 text-gray-400 animate-spin" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
            ) : (
              <svg
                className="h-5 w-5 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            )}
          </div>
          <input
            type="search"
            placeholder="Buscar canciones, artistas, álbumes..."
            value={searchQuery}
            onChange={handleSearchChange}
            className="w-full pl-12 pr-6 py-3 rounded-full text-white bg-gray-800/50 backdrop-blur-sm border border-gray-600/50 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 text-base placeholder-gray-400 transition-all duration-200 hover:bg-gray-700/50"
          />
          
          {/* Resultados de búsqueda */}
          {showResults && (searchResults.albums.length > 0 || searchResults.artists.length > 0 || searchResults.tracks.length > 0) && (
            <div className="absolute top-full left-0 right-0 mt-2 bg-gray-800 rounded-lg shadow-2xl border border-gray-600 max-h-96 overflow-y-auto z-50">
              
              {/* Álbumes */}
              {searchResults.albums.length > 0 && (
                <div className="p-3">
                  <h3 className="text-sm font-semibold text-gray-300 mb-2">Álbumes</h3>
                  {searchResults.albums.slice(0, 3).map((album) => (
                    <div
                      key={album.id}
                      onClick={() => handleAlbumSelect(album)}
                      className="flex items-center gap-3 p-2 hover:bg-gray-700 rounded-lg cursor-pointer transition-colors"
                    >
                      <div className="w-12 h-12 bg-gray-700 rounded-lg overflow-hidden flex-shrink-0">
                        {album.images?.[0] ? (
                          <Image
                            src={album.images[0].url}
                            alt={album.name}
                            width={48}
                            height={48}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-full bg-gradient-to-br from-red-500 to-red-600 flex items-center justify-center">
                            <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
                            </svg>
                          </div>
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-white font-medium truncate">{album.name}</p>
                        <p className="text-gray-400 text-sm truncate">
                          {album.artists?.map(artist => artist.name).join(', ')}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Artistas */}
              {searchResults.artists.length > 0 && (
                <div className="p-3 border-t border-gray-700">
                  <h3 className="text-sm font-semibold text-gray-300 mb-2">Artistas</h3>
                  {searchResults.artists.slice(0, 3).map((artist) => (
                    <div
                      key={artist.id}
                      className="flex items-center gap-3 p-2 hover:bg-gray-700 rounded-lg cursor-pointer transition-colors"
                    >
                      <div className="w-12 h-12 bg-gray-700 rounded-full overflow-hidden flex-shrink-0">
                        <div className="w-full h-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center">
                          <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                          </svg>
                        </div>
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-white font-medium truncate">{artist.name}</p>
                        <p className="text-gray-400 text-sm">Artista</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Canciones */}
              {searchResults.tracks.length > 0 && (
                <div className="p-3 border-t border-gray-700">
                  <h3 className="text-sm font-semibold text-gray-300 mb-2">Canciones</h3>
                  {searchResults.tracks.slice(0, 3).map((track) => (
                    <div
                      key={track.id}
                      className="flex items-center gap-3 p-2 hover:bg-gray-700 rounded-lg cursor-pointer transition-colors"
                    >
                      <div className="w-12 h-12 bg-gray-700 rounded-lg overflow-hidden flex-shrink-0">
                        <div className="w-full h-full bg-gradient-to-br from-green-500 to-green-600 flex items-center justify-center">
                          <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M18 3a1 1 0 00-1.447-.894L8.763 6H5a3 3 0 000 6h.28l1.771 5.316A1 1 0 008 18h1a1 1 0 001-1v-4.382l6.553 3.276A1 1 0 0018 15V3z" clipRule="evenodd" />
                          </svg>
                        </div>
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-white font-medium truncate">{track.name}</p>
                        <p className="text-gray-400 text-sm truncate">
                          {track.artists?.map(artist => artist.name).join(', ')}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>

        <div className="flex items-center gap-4">
          <button className="p-2 rounded-full hover:bg-gray-700/50 transition-colors duration-200">
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </div>
      </div>
    </header>
  );
};
