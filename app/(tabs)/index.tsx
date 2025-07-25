import SearchBarr from "@/components/SearchBarr";
import { useSavedMovies } from "@/context/SavedMoviesContext";
import { fetchMovies } from "@/services/api";
import useFetch from "@/services/useFetch";
import { MaterialIcons } from "@expo/vector-icons";
import { Text } from "@react-navigation/elements";
import { useRouter } from "expo-router";
import { ActivityIndicator, FlatList, Image, ScrollView, TouchableOpacity, View } from "react-native";

export default function Index() {
  const router = useRouter();
  const { data, loading, error } = useFetch(() => fetchMovies({ query: "" }));
  const { handleSave, savedMovies } = useSavedMovies();

  // Kaydedilmiş mi kontrolü (isteğe bağlı)
  const isSaved = (id: number) => savedMovies.some(m => Number(m.id) === id);

  return (
    <View className="flex-1 bg-primary">
      <ScrollView className="flex-1 px-5">
        {/* Arama Kutusu */}
        <View className="flex-1 mt-20 rounded-3xl bg-dark-200">
          <SearchBarr
            onPress={() => router.push("/search")}
            placeholder="Search for a movie"
          />
        </View>
        <View>
         <Text style={{ color: "white", marginTop:10, marginBottom:10 }}>Latest Movies</Text>
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
            <View style={{ position: "relative", flex: 1, marginHorizontal: 4 }}>
              <TouchableOpacity
                onPress={() => router.push(`/movies/${item.id}`)}
                style={{
                  backgroundColor: "#221f3d",
                  borderRadius: 12,
                  padding: 10,
                  alignItems: "center",
                  flex: 1,
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
                <Text></Text>
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
      </ScrollView>
    </View>
  );
}