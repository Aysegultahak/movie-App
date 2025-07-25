import SearchBarr from "@/components/SearchBarr";
import { useSavedMovies } from "@/context/SavedMoviesContext";
import { fetchMovies } from "@/services/api";
import { updateSearchCount } from "@/services/appwrite";
import useFetch from "@/services/useFetch";
import { MaterialIcons } from "@expo/vector-icons";
import { Text } from "@react-navigation/elements";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { ActivityIndicator, FlatList, Image, ScrollView, TouchableOpacity, View } from "react-native";

const Search = () => {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [randomPage] = useState(() => Math.floor(Math.random() * 500) + 1); // TMDB max 500 page
  const { handleSave, savedMovies } = useSavedMovies();

  // Kaydedilmiş mi kontrolü (isteğe bağlı)
  const isSaved = (id: number) => savedMovies.some(m => Number(m.id) === id);

  const { data, loading, error, fetchData } = useFetch(
    () => fetchMovies({ query, page: query ? 1 : randomPage }),
    true
  );

  useEffect(() => {
    fetchData();
  }, [query]);
 useEffect(() => {
  const timeoutId = setTimeout(() => {
    if (query.trim().length > 2) { // En az 3 karakter girilmişse
      if (data && Array.isArray(data.results) && data.results.length > 0) {
        updateSearchCount(query, data.results[0]);
      }
    }
    // Eğer reset fonksiyonun yoksa aşağıyı kaldırabilirsin
    // else {
    //   reset();
    // }
  }, 500);

  return () => clearTimeout(timeoutId);
}, [query, data]);
  return (
    <View className="flex-1 bg-primary">
      <ScrollView className="flex-1 px-5">
        {/* Arama Kutusu */}
        <View className="flex-1 mt-20 rounded-3xl bg-dark-200">
          <SearchBarr
              placeholder="Search for a movie"
              value={query}
              onChangeText={setQuery}
          />
        </View>
        <View>
         <Text style={{ color: "white", marginTop:10, marginBottom:10 }}>search result for {query} </Text>
        </View>
        
 

       {/* Durum: Yükleniyor / Hata / Veri */}
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" className="mt-10 self-center" />
      ) : error ? (
        <Text style={{ color: "red" }}>Error: {error.message}</Text>
      ) : (


          <FlatList
            data={data?.results || []}
            keyExtractor={item => item.id?.toString()}
            numColumns={3}
            columnWrapperStyle={{ justifyContent: "space-between", marginBottom: 16 }}
            renderItem={({ item }) => (
              <View style={{ flex: 1, position: "relative" }}>
                <TouchableOpacity
                  onPress={() => router.push(`/movies/${item.id}`)}
                  style={{
                    backgroundColor: "#221f3d",
                    borderRadius: 12,
                    padding: 10,
                    alignItems: "center",
                    flex: 1,
                    marginHorizontal: 4,
                  }}
                >
                  <Image
                    source={
                      item.poster_path
                        ? { uri: `https://image.tmdb.org/t/p/w500${item.poster_path}` }
                        : undefined
                    }
                    style={{ width: 100, height: 150, borderRadius: 8, marginBottom: 8 }}
                    resizeMode="cover"
                  />
                  <Text style={{ color: "#fff", fontWeight: "bold", textAlign: "center" }}>
                    {item.title}
                  </Text>
                  <Text style={{ color: "#FFD700", fontSize: 14, marginTop: 2 }}>
                    ★ {item.vote_average?.toFixed(1) ?? "?"} / 10
                  </Text>
                  <Text style={{ color: "#ab8bff", fontSize: 12, marginTop: 2 }}>
                    {item.release_date ? item.release_date.slice(0, 4) : "?"}
                  </Text>
                </TouchableOpacity>
                {/* Kaydet ikonu */}
                <TouchableOpacity
                  onPress={() => handleSave(item)}
                  style={{
                    position: "absolute",
                    top: 12,
                    right: 12,
                    zIndex: 2,
                    backgroundColor: "#fff2",
                    borderRadius: 20,
                    padding: 4,
                  }}
                >
                  <MaterialIcons
                    name={isSaved(item.id) ? "bookmark" : "bookmark-border"}
                    size={24}
                    color="#FFD700"
                  />
                </TouchableOpacity>
              </View>
            )}
          />
        )}
        {(data?.results?.length === 0 && query.length > 0) && (
          <Text style={{ color: "white", textAlign: "center", marginTop: 20 }}>
            No movie found.
          </Text>
        )}
        
       
      </ScrollView>
    </View>
  );
};

export default Search;