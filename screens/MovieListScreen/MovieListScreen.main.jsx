import React, { useEffect, useState } from "react";
import { SafeAreaView, FlatList, Button, TouchableOpacity } from "react-native";
import { SearchBar } from "react-native-elements";
import { MovieCell } from "./components/MovieCell";
import { styles } from "./MovieListScreen.styles";

// We can use JSON files by simply requiring them.
const TABLE_DATA = require("../../assets/movies.json");

// Input: navigation & route params, which we recieve through React Navigation
// Output: a screen containing the list of movies
export default function MovieListScreen({ navigation, route }) {
  const [search, setSearch] = useState("");
  const [actors, setActors] = useState([]);
  const [filteredData, setFilteredData] = useState(TABLE_DATA); 

  // TODO: Fill out the methods below.
  const selectedMovie = (movieItem) => {
    navigation.navigate("Movie Detail", { movieItem });
  };

  const selectedFilterButton = () => {
    navigation.navigate("Filter", { actors });
  };

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Button onPress={selectedFilterButton} title="Filter" color="#00ccff" />
      ),
    });
  }, [actors, navigation]);

  useEffect(() => {
    if (route.params?.actors) {
      setActors(route.params.actors);
    }
  }, [route.params?.actors]);

  useEffect(() => {
    const newData = TABLE_DATA.filter(movie => 
      (search.length === 0 || movie.title.toLowerCase().includes(search.toLowerCase())) &&
      (actors.length === 0 || movie.actors.some(actor => actors.includes(actor)))
    );
    setFilteredData(newData);
  }, [search, actors]); 

  const renderItem = ({ item }) => {
    return (
      <TouchableOpacity onPress={() => selectedMovie(item)}>
        <MovieCell movieItem={item} />
      </TouchableOpacity>
    );
  };

  // Our final view consists of a search bar and flat list, wrapped in
  // a SafeAreaView to support iOS.
  return (
    <SafeAreaView style={styles.container}>
      <SearchBar
        placeholder="Search movies..."
        onChangeText={setSearch}
        value={search}
      />
      <FlatList
        data={filteredData}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
      />
    </SafeAreaView>
  );
}

