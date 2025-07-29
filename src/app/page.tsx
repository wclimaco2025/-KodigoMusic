'use client'
import { useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Album, Cancion, Footer, Header, Sidebar } from "./components";
import { TracksItem } from "@/types/types.kodigomusic";

// instancia de QueryClient
const queryClient = new QueryClient();

export default function Home() {
  //Estado para manejar el Album seleccionado
  const [selectedAlbumId, setSelectedAlbumId] = useState<string | undefined>();

  //Estado para manejar la canción seleccionada
  const [selectedSong, setSelectedSong] = useState<TracksItem | undefined>();

  // Evento Click para seleccionar el Album
  const handleAlbumClick = (albumId: string) => {
    setSelectedAlbumId(albumId);
    // Limpiar la canción seleccionada cuando se cambia de álbum
    setSelectedSong(undefined);
  };

  // Evento Click para seleccionar la canción y asignarla al Reproductor
  const handleSongClick = (song: TracksItem) => {
    setSelectedSong(song);
  };

  return (
    // Usando instancia de queryClient
    <QueryClientProvider client={queryClient}>
     <div className="flex flex-col h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900">
      <Header />
      <div className="flex flex-grow overflow-hidden">
        <Sidebar />
        <main className="flex-grow overflow-y-auto bg-gradient-to-b from-gray-900/50 to-black/50 backdrop-blur-sm">
          <div className="p-6 pb-32">
            <div className="max-w-7xl mx-auto space-y-8">
             {/* Prop para Pasar el Album seleccionado*/}
              <Album onAlbumClick={handleAlbumClick} />
             {/*Prop para pasar el Album y obtener las canciones y establecer la canción seleccionada*/}
              <Cancion albumId={selectedAlbumId} onSongClick={handleSongClick} />
            </div>
          </div>
        </main>
      </div>
      {/*Pasando la canción seleccionada al Footer donde está el componente Player*/}
      <Footer selectedSong={selectedSong} />
    </div>
    </QueryClientProvider>
  );
}
