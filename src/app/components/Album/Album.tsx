"use client";
import { fetchAlbums } from "@/services/kodigomusic.service";
import { AlbumResponse } from "@/types/types.kodigomusic";
import { useEffect, useState } from "react";

export const Album = () => {
  /*  const albums = [
    {
      id: 1,
      title: "Bohemian Rhapsody",
      artist: "Queen",
      year: "1975",
      cover: "https://via.placeholder.com/200x200/1f2937/ffffff?text=Queen",
      songs: 12
    },
    {
      id: 2,
      title: "Thriller",
      artist: "Michael Jackson",
      year: "1982",
      cover: "https://via.placeholder.com/200x200/1f2937/ffffff?text=MJ",
      songs: 9
    },
    {
      id: 3,
      title: "Back in Black",
      artist: "AC/DC",
      year: "1980",
      cover: "https://via.placeholder.com/200x200/1f2937/ffffff?text=ACDC",
      songs: 10
    },
    {
      id: 4,
      title: "The Dark Side of the Moon",
      artist: "Pink Floyd",
      year: "1973",
      cover: "https://via.placeholder.com/200x200/1f2937/ffffff?text=PF",
      songs: 10
    },
    {
      id: 5,
      title: "Abbey Road",
      artist: "The Beatles",
      year: "1969",
      cover: "https://via.placeholder.com/200x200/1f2937/ffffff?text=Beatles",
      songs: 17
    },
    {
      id: 6,
      title: "Nevermind",
      artist: "Nirvana",
      year: "1991",
      cover: "https://via.placeholder.com/200x200/1f2937/ffffff?text=Nirvana",
      songs: 12
    }
  ];
*/
  const [albums, setAlbums] = useState<AlbumResponse[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getAlbums = async () => {
      try {
        const data = await fetchAlbums();
        setAlbums(data);
      } catch (err) {
        setError("Failed to fetch albums");
      } finally {
        setLoading(false);
      }
    };

    getAlbums();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
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
            className="bg-gray-800/50 p-4 rounded-lg hover:bg-gray-700/50 transition-all duration-300 cursor-pointer group"
          >
            <div className="relative mb-4">
              <img
                src={album.images[0].url}
                alt={album.name}
                className="w-full aspect-square object-cover rounded-lg shadow-lg"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300 rounded-lg flex items-center justify-center">
                <button className="bg-red-500 text-white p-3 rounded-full opacity-0 group-hover:opacity-100 transform scale-75 group-hover:scale-100 transition-all duration-300 hover:bg-red-600">
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
