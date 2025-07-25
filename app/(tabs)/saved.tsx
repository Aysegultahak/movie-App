import { useSavedMovies } from '@/context/SavedMoviesContext';
import { MaterialIcons } from '@expo/vector-icons';
import React from 'react';
import { FlatList, Image, Text, TouchableOpacity, View } from 'react-native';

const Saved = () => {
  const { savedMovies ,handleSave} = useSavedMovies();

  return (
    <View className="flex-1 bg-primary px-5">
      <Text style={{ color: "white", fontSize: 22, fontWeight: "bold", marginTop: 70, marginBottom: 18 }}>
        ⭐ Saved Movies
      </Text>
      <FlatList
        data={savedMovies}
        keyExtractor={item => item.id?.toString()}
        contentContainerStyle={{ paddingBottom: 30 }}
        renderItem={({ item }) => (
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginBottom: 18,
              backgroundColor: "#221f3d",
              borderRadius: 14,
              shadowColor: "#000",
              shadowOpacity: 0.15,
              shadowRadius: 8,
              elevation: 4,
              padding: 10,
            }}
          >
            <Image
              source={{ uri: `https://image.tmdb.org/t/p/w500${item.poster_path}` }}
              style={{ width: 70, height: 105, borderRadius: 10, marginRight: 16 }}
              resizeMode="cover"
            />
            <View style={{ flex: 1 }}>
              <Text style={{ color: "#fff", fontWeight: "bold", fontSize: 16 }}>
                {item.title}
              </Text>
              <Text style={{ color: "#FFD700", fontSize: 15, marginTop: 4 }}>
                ★ {item.vote_average?.toFixed(1) ?? "?"} / 10
              </Text>
              <Text style={{ color: "#ab8bff", fontSize: 13, marginTop: 2 }}>
                {item.release_date ? item.release_date.slice(0, 4) : "?"}
              </Text>
            </View>
              <TouchableOpacity onPress={() => handleSave(item)}>
              <MaterialIcons name="delete" size={28} color="#7f2929ff" />
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
};

export default Saved; 