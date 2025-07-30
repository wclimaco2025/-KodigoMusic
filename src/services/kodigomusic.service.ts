import { getAccessToken, getUserAccessToken } from "@/api/api.kodigomusic";
import axios from "axios";

// Obtener Albumes - usando endpoint público para nuevos lanzamientos
export const fetchAlbums = async () => {
  const token = await getAccessToken();
  const response = await axios.get(
    `${process.env.NEXT_PUBLIC_SPOTIFY_BASE_URL}/v1/browse/new-releases`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params: {
        market: 'ES',
        limit: '10',
      }
    }
  );
  // El endpoint new-releases devuelve { albums: { items: [...] } }
  // Extraemos solo el array de álbumes
  return response.data.albums.items;
};

//Obtener Canciones de un Album específico
export const fetchSongs = async (idAlbum: string) => {
  const token = await getAccessToken();
  const response = await axios.get(
    `${process.env.NEXT_PUBLIC_SPOTIFY_BASE_URL}/v1/albums/${idAlbum}/tracks`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params: {
        market: 'ES',
        limit: '50',
      }
    }
  );
  // El endpoint albums/{id}/tracks devuelve { items: [...] }
  // Extraemos solo el array de canciones
  return response.data.items;
};

// Obtener álbumes del usuario (requiere autenticación de usuario)
export const fetchUserAlbums = async () => {
  const userToken = getUserAccessToken();
  if (!userToken) {
    throw new Error(
      "Usuario no autenticado. Necesita autorizar la aplicación."
    );
  }

  const response = await axios.get(
    `${process.env.NEXT_PUBLIC_SPOTIFY_BASE_URL}/v1/me/albums`,
    {
      headers: {
        Authorization: `Bearer ${userToken}`,
      },
      params:{
        market:'ES',
        limit:'20',
      }
    }
  );
  // El endpoint me/albums devuelve { items: [{ album: {...} }] }
  // Extraemos solo los álbumes
  return response.data.items.map((item: any) => item.album);
};

// Buscar contenido (álbumes, artistas, canciones)
export const searchContent = async (query: string, type: string = 'album,artist,track', limit: number = 20) => {
  if (!query.trim()) {
    return { albums: [], artists: [], tracks: [] };
  }

  const token = await getAccessToken();
  const response = await axios.get(
    `${process.env.NEXT_PUBLIC_SPOTIFY_BASE_URL}/v1/search`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params: {
        q: query,
        type: type,
        market: 'ES',
        limit: limit,
      },
    }
  );

  return {
    albums: response.data.albums?.items || [],
    artists: response.data.artists?.items || [],
    tracks: response.data.tracks?.items || [],
  };
};

// Buscar solo álbumes
export const searchAlbums = async (query: string, limit: number = 20) => {
  if (!query.trim()) {
    return [];
  }

  const token = await getAccessToken();
  const response = await axios.get(
    `${process.env.NEXT_PUBLIC_SPOTIFY_BASE_URL}/v1/search`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params: {
        q: query,
        type: 'album',
        market: 'ES',
        limit: limit,
      },
    }
  );

  return response.data.albums?.items || [];
};

// Buscar solo artistas
export const searchArtists = async (query: string, limit: number = 20) => {
  if (!query.trim()) {
    return [];
  }

  const token = await getAccessToken();
  const response = await axios.get(
    `${process.env.NEXT_PUBLIC_SPOTIFY_BASE_URL}/v1/search`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params: {
        q: query,
        type: 'artist',
        market: 'ES',
        limit: limit,
      },
    }
  );

  return response.data.artists?.items || [];
};

// Buscar solo canciones
export const searchTracks = async (query: string, limit: number = 20) => {
  if (!query.trim()) {
    return [];
  }

  const token = await getAccessToken();
  const response = await axios.get(
    `${process.env.NEXT_PUBLIC_SPOTIFY_BASE_URL}/v1/search`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params: {
        q: query,
        type: 'track',
        market: 'ES',
        limit: limit,
      },
    }
  );

  return response.data.tracks?.items || [];
};
