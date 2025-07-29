import { getAccessToken, getUserAccessToken } from "@/api/api.kodigomusic";
import axios from "axios";

// Obtener Albumes - usando endpoint público para nuevos lanzamientos
export const fetchAlbums = async () => {
  const token = await getAccessToken();
  const response = await axios.get(
    `${process.env.NEXT_PUBLIC_SPOTIFY_BASE_URL}/v1/browse/new-releases?market=ES&limit=20`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  // El endpoint new-releases devuelve { albums: { items: [...] } }
  // Extraemos solo el array de álbumes
  return response.data.albums.items;
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
    `${process.env.NEXT_PUBLIC_SPOTIFY_BASE_URL}/v1/me/albums?market=ES&limit=20`,
    {
      headers: {
        Authorization: `Bearer ${userToken}`,
      },
    }
  );
  // El endpoint me/albums devuelve { items: [{ album: {...} }] }
  // Extraemos solo los álbumes
  return response.data.items.map((item: any) => item.album);
};
