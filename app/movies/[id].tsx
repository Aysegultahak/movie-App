import { useSavedMovies } from '@/context/SavedMoviesContext';
import { fetchMovieDetails, fetchMovieTrailer } from '@/services/api';
import useFetch from '@/services/useFetch';
import { MaterialIcons } from '@expo/vector-icons';
import { useLocalSearchParams } from 'expo-router';
import React from 'react';
import { Image, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { WebView } from 'react-native-webview';

type MovieDetails = {
  id?: string | number;
  poster_path?: string;
  title?: string;
  vote_average?: number;
  overview?: string;
  release_date?: string;
};

const movieDetails = () => {
  const { id } = useLocalSearchParams();
const movieId = Array.isArray(id) ? id[0] : id;
  const { data: movie, loading } = useFetch<MovieDetails>(() => fetchMovieDetails(id as string));
  const { data: trailerKey } = useFetch(() => fetchMovieTrailer(id as string));
const { handleSave, savedMovies } = useSavedMovies();
 
// const movieId = Array.isArray(id) ? id[0] : id; // Dizi gelirse ilk elemanı al

const isSaved = (movieIdToCheck: string | number | undefined) =>
  savedMovies.some(m => Number(m.id) === Number(movieIdToCheck));


  return (
    <View className='bg-primary flex-1'>
      <ScrollView contentContainerStyle={{ paddingBottom: 80 }}>
        <View>
          <Image
            source={{ uri: `https://image.tmdb.org/t/p/w500${movie?.poster_path}` }}
            className='w-full h-[550px]'
          />

          <View className='p-4'>
            {/* Başlık ve Kaydet ikonu yan yana */}
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
              <Text className='text-white text-2xl font-bold' style={{ flex: 1 }}>
                {movie?.title}
              </Text>
        <TouchableOpacity
          onPress={() => handleSave({
             id: Number(movieId).toString(),
            title: movie?.title ?? "",
            poster_path: movie?.poster_path,
            vote_average: movie?.vote_average,
            release_date: movie?.release_date,
          })}
          style={{
            backgroundColor: "#fff2",
            borderRadius: 20,
            padding: 4,
            marginLeft: 8,
          }}
        >
          <MaterialIcons
            name={isSaved(movieId) ? "bookmark" : "bookmark-border"}
            size={32}
            color="#FFD700"
          />
        </TouchableOpacity>
            </View>
            {/* Yıl ve Puan */}
            <View style={{ flexDirection: 'column', marginTop: 8 }}>
              <Text style={{ color: "#ab8bff", fontSize: 16 }}>
                {movie?.release_date ? movie.release_date.slice(0, 4) : "?"}
              </Text>
              <Text style={{ color: "#FFD700", fontSize: 16, marginRight: 12 }}>
                ★ {movie?.vote_average?.toFixed(1) ?? "?"} / 10
              </Text>
            </View>
            {/* Overview */}
            <Text style={{ color: "#fff", marginTop: 16, fontSize: 16 }}>
              {movie?.overview}
            </Text>
            {/* Fragman */}
            {trailerKey && (
              <View style={{ marginTop: 20 }}>
                <Text style={{ color: "white", fontWeight: "bold", marginBottom: 8 }}>Trailer</Text>
                <WebView
                  source={{ uri: `https://www.youtube.com/embed/${trailerKey}` }}
                  style={{ height: 200, borderRadius: 12 }}
                />
              </View>
            )}
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default movieDetails;