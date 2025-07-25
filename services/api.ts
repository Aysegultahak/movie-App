export const TMDB_CONFİG = {
  BASE_URL: 'https://api.themoviedb.org/3',
  API_KEY: process.env.EXPO_PUBLIC_MOVIE_API_KEY,
  Headers: {
    accept: 'application/json',
    Authorization: `Bearer ${process.env.EXPO_PUBLIC_MOVIE_API_KEY}`
  }
}
type MovieDetails = {
  // Add the fields you expect from the API response
  id: number;
  title: string;
  overview: string;
  poster_path?: string;
  // ...other fields
};  

 export const fetchMovies = async ({query,page}:{query: string, page?:number}) => {
   const endpoint = query
      ? `${TMDB_CONFİG.BASE_URL}/search/movie?query=${encodeURIComponent(query)}`
      : `${TMDB_CONFİG.BASE_URL}/discover/movie?sort_by=popularity.desc&page=${page || 1}`;
   
   const response = await fetch(endpoint, {
      method: 'GET',
      headers: TMDB_CONFİG.Headers,
   });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
   const data = await response.json();
   return data;
 }
export const fetchMovieDetails = async (movieId: string): Promise<MovieDetails> => {
  try {
    const response = await fetch(
      `${TMDB_CONFİG.BASE_URL}/movie/${movieId}?api_key=${TMDB_CONFİG.API_KEY}&language=en-US`,
      {
        method: 'GET',
        headers: TMDB_CONFİG.Headers,
      }
    );
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching movie details:', error);
    throw error;
  }
};
export const fetchMovieTrailer = async (movieId: string): Promise<string | null> => {
  try {
    const response = await fetch(
      `${TMDB_CONFİG.BASE_URL}/movie/${movieId}/videos?api_key=${TMDB_CONFİG.API_KEY}&language=en-US`,
      {
        method: 'GET',
        headers: TMDB_CONFİG.Headers,
      }
    );
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    // Trailer olanı bul
    const trailer = data.results.find(
      (video: any) => video.site === "YouTube" && video.type === "Trailer"
    );
    return trailer ? trailer.key : null;
  } catch (error) {
    console.error('Error fetching movie trailer:', error);
    return null;
  }
};