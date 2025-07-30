// Jamendo API para streaming de música libre
import axios from 'axios';

// Jamendo API (música libre de derechos)
export const searchJamendo = async (songName: string, artistName: string) => {
  try {
    const response = await axios.get('https://api.jamendo.com/v3.0/tracks/', {
      params: {
        client_id: process.env.NEXT_PUBLIC_JAMENDO_CLIENT_ID,
        format: 'json',
        search: `${songName} ${artistName}`,
        limit: 1,
        include: 'musicinfo',
        audioformat: 'mp3',
      },
    });

    if (response.data.results && response.data.results.length > 0) {
      const track = response.data.results[0];
      return {
        id: track.id,
        name: track.name,
        artist: track.artist_name,
        audioUrl: track.audio,
        duration: track.duration,
        image: track.album_image,
      };
    }
    
    return null;
  } catch (error) {
    console.error('Error searching Jamendo:', error);
    return null;
  }
};