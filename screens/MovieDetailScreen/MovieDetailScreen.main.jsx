import React from "react";
import { SafeAreaView, Text, Image, ScrollView } from "react-native";
import { styles } from "./MovieDetailScreen.styles";

export default function MovieDetailScreen({ route }) {
  // TODO: Recieve the movieItem by destructuring route params.
  const { movieItem } = route.params;

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.container}>
        {/* Rendering movie details */}
        <Image
          style={styles.movieCellImage}
          source={{ uri: movieItem.posterurl }}
        />
        <Text style={styles.h1}>{movieItem.title}</Text>
        <Text style={styles.h2}>Released {movieItem.releaseDate}</Text>
        <Text style={styles.h3}>{movieItem.actors.join(", ")}</Text>
        <Text style={styles.h4}>{movieItem.storyline}</Text>
      </ScrollView>
    </SafeAreaView>
  );
}