import axios from 'axios';

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_SPOTIFY_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

let accessToken = '';
let tokenExpires = 0;

// Token para client credentials (datos públicos)
export const getAccessToken = async () => {
  const now = Date.now();
  if (accessToken && tokenExpires > now) return accessToken;

  try {
    const res = await axios.post(
      'https://accounts.spotify.com/api/token',
      new URLSearchParams({ grant_type: 'client_credentials' }),
      {
        headers: {
          Authorization:
            'Basic ' +
            Buffer.from(
              process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID + ':' + process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_SECRET
            ).toString('base64'),
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      }
    );

    accessToken = res.data.access_token;
    tokenExpires = now + res.data.expires_in * 1000;
    return accessToken;
  } catch (error) {
    console.error('Error getting Spotify access token:', error);
    throw error;
  }
};

// Generar URL de autorización para el usuario
export const getAuthorizationUrl = () => {
  const scopes = 'user-library-read user-read-private user-read-email';
  const params = new URLSearchParams({
    response_type: 'code',
    client_id: process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID!,
    scope: scopes,
    redirect_uri: process.env.NEXT_PUBLIC_SPOTIFY_REDIRECT_URL!,
    state: Math.random().toString(36).substring(7),
  });
  
  return `https://accounts.spotify.com/authorize?${params.toString()}`;
};

// Intercambiar código por token de usuario
export const exchangeCodeForToken = async (code: string) => {
  try {
    const res = await axios.post(
      'https://accounts.spotify.com/api/token',
      new URLSearchParams({
        grant_type: 'authorization_code',
        code,
        redirect_uri: process.env.NEXT_PUBLIC_SPOTIFY_REDIRECT_URL!,
      }),
      {
        headers: {
          Authorization:
            'Basic ' +
            Buffer.from(
              process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID + ':' + process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_SECRET
            ).toString('base64'),
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      }
    );

    // Guardar tokens en localStorage
    localStorage.setItem('spotify_access_token', res.data.access_token);
    localStorage.setItem('spotify_refresh_token', res.data.refresh_token);
    localStorage.setItem('spotify_token_expires', (Date.now() + res.data.expires_in * 1000).toString());
    
    return res.data;
  } catch (error) {
    console.error('Error exchanging code for token:', error);
    throw error;
  }
};

// Obtener token de usuario (para endpoints que requieren autenticación de usuario)
export const getUserAccessToken = () => {
  const token = localStorage.getItem('spotify_access_token');
  const expires = localStorage.getItem('spotify_token_expires');
  
  if (!token || !expires || Date.now() > parseInt(expires)) {
    return null;
  }
  
  return token;
};

// Request interceptor
api.interceptors.request.use(
  (config) => {
    // Agregar token de autenticación si existe
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // Manejo global de errores
    if (error.response?.status === 401) {
      // Redirigir a login
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    
    // Personalizar mensajes de error
    const customError = {
      message: error.response?.data?.message || error.message,
      status: error.response?.status,
      data: error.response?.data,
    };
    
    return Promise.reject(customError);
  }
);

export { api };