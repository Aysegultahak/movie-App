import { Client, Databases, ID, Query } from 'react-native-appwrite';

const DATABSE_ID = process.env.EXPO_PUBLIC_APPWRITE_DATABASE_ID!;
const COLLECTION_ID = process.env.EXPO_PUBLIC_APPWRITE_COLLECTION_ID!;
const FAVORITES_COLLECTION_ID = process.env.EXPO_PUBLIC_APPWRITE_FAVORITES_COLLECTION_ID!;

const client = new Client()
  .setEndpoint('https://cloud.appwrite.io/v1')
  .setProject(process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID!);

const databases = new Databases(client);

type Movie = {
  id: string;
  title: string;
  poster_path?: string;
  vote_average?: number;
  release_date?: string;
  // Gerekirse başka alanlar ekleyebilirsin
};

// Arama istatistikleri için
export const updateSearchCount = async (query: string, movie: Movie) => {
  try {
    const result = await databases.listDocuments(DATABSE_ID, COLLECTION_ID, [
      Query.equal('searchTerm', query)
    ]);
    if (result.documents.length > 0) {
      const existingMovie = result.documents[0];
      await databases.updateDocument(
        DATABSE_ID,
        COLLECTION_ID,
        existingMovie.$id,
        {
          count: existingMovie.count + 1,
        }
      );
    } else {
      await databases.createDocument(DATABSE_ID, COLLECTION_ID, ID.unique(), {
        searchTerm: query,
        count: 1,
        title: movie.title,
        movie_id: movie.id,
        poster_url: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
      });
    }
  } catch (error) {
    console.error('Error updating search count:', error);
  }
};

// Favori film kaydetme
export const saveFavoriteMovie = async (movie: Movie) => {
  try {
    await databases.createDocument(
      DATABSE_ID,
      FAVORITES_COLLECTION_ID,
      movie.id.toString(),
      {
        title: movie.title,
        movie_id: movie.id,
        poster_url: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
        vote_average: movie.vote_average,
        release_date: movie.release_date,
      }
    );
  } catch (error) {
    console.error('Error saving favorite movie:', error);
  }
};

// Favori filmleri listeleme
export const getFavoriteMovies = async () => {
  try {
    const response = await databases.listDocuments(DATABSE_ID, FAVORITES_COLLECTION_ID);
    return response.documents;
  } catch (error) {
    console.error('Error fetching favorite movies:', error);
    return [];
  }
};
export const removeFavoriteMovie = async (movieId: string | number) => {
  const docs = await getFavoriteMovies();
  // Hem kodda hem Appwrite'da integer ise Number ile karşılaştır
  const doc = docs.find((d: any) => Number(d.movie_id) === Number(movieId));
  if (doc) {
    await databases.deleteDocument(DATABSE_ID, FAVORITES_COLLECTION_ID, doc.$id);
  }
};