import React from 'react'

export const Cancion = () => {
  const songs = [
    {
      id: 1,
      title: "Bohemian Rhapsody",
      artist: "Queen",
      album: "A Night at the Opera",
      duration: "5:55",
      plays: "1.2B",
      isPlaying: true
    },
    {
      id: 2,
      title: "Billie Jean",
      artist: "Michael Jackson",
      album: "Thriller",
      duration: "4:54",
      plays: "890M",
      isPlaying: false
    },
    {
      id: 3,
      title: "Back in Black",
      artist: "AC/DC",
      album: "Back in Black",
      duration: "4:15",
      plays: "756M",
      isPlaying: false
    },
    {
      id: 4,
      title: "Imagine",
      artist: "John Lennon",
      album: "Imagine",
      duration: "3:07",
      plays: "645M",
      isPlaying: false
    },
    {
      id: 5,
      title: "Hotel California",
      artist: "Eagles",
      album: "Hotel California",
      duration: "6:30",
      plays: "534M",
      isPlaying: false
    },
    {
      id: 6,
      title: "Stairway to Heaven",
      artist: "Led Zeppelin",
      album: "Led Zeppelin IV",
      duration: "8:02",
      plays: "423M",
      isPlaying: false
    }
  ];

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-white">Canciones Populares</h2>
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
          {songs.map((song, index) => (
            <div
              key={song.id}
              className="grid grid-cols-12 gap-4 px-6 py-3 hover:bg-gray-700/30 transition-colors group cursor-pointer"
            >
              <div className="col-span-1 flex items-center">
                {song.isPlaying ? (
                  <div className="flex items-center justify-center">
                    <div className="flex space-x-1">
                      <div className="w-1 h-4 bg-red-500 animate-pulse"></div>
                      <div className="w-1 h-4 bg-red-500 animate-pulse" style={{animationDelay: '0.2s'}}></div>
                      <div className="w-1 h-4 bg-red-500 animate-pulse" style={{animationDelay: '0.4s'}}></div>
                    </div>
                  </div>
                ) : (
                  <span className="text-gray-400 group-hover:hidden">{index + 1}</span>
                )}
                <button className="hidden group-hover:block text-white hover:text-red-400 transition-colors">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                  </svg>
                </button>
              </div>

              <div className="col-span-5 flex items-center gap-3">
                <div className="w-10 h-10 bg-gray-700 rounded flex-shrink-0 flex items-center justify-center">
                  <svg className="w-5 h-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 3a1 1 0 00-1.447-.894L8.763 6H5a3 3 0 000 6h.28l1.771 5.316A1 1 0 008 18h1a1 1 0 001-1v-4.382l6.553 3.276A1 1 0 0018 15V3z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="min-w-0">
                  <p className={`font-medium truncate ${song.isPlaying ? 'text-red-400' : 'text-white'}`}>
                    {song.title}
                  </p>
                  <p className="text-gray-400 text-sm truncate">{song.artist}</p>
                </div>
              </div>

              <div className="col-span-3 flex items-center">
                <p className="text-gray-400 text-sm truncate hover:text-white transition-colors cursor-pointer">
                  {song.album}
                </p>
              </div>

              <div className="col-span-2 flex items-center">
                <p className="text-gray-400 text-sm">{song.plays}</p>
              </div>

              <div className="col-span-1 flex items-center justify-end gap-2">
                <button className="opacity-0 group-hover:opacity-100 text-gray-400 hover:text-white transition-all">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" />
                  </svg>
                </button>
                <span className="text-gray-400 text-sm">{song.duration}</span>
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
