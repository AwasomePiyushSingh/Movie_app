import React from 'react';
import { Text, View, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { IMAGE_POSTER_URL } from '../services/config';
import { useNavigation } from '@react-navigation/native';


const SearchData = ({ searchData }) => {

    const navigation = useNavigation();

    const onMoviePress=(movie)=>{
        navigation.navigate('MovieDetails', {movieId: movie.id})
    }
  return (
    <>
      {searchData.results && searchData.results.map((movie, index) => (
        <TouchableOpacity key={index} style={styles.movieContainer} onPress={() => onMoviePress(movie)}>
            {/* {console.log("movie\n\n\n\n",movie)} */}
          <Image
            source={{ uri: `${IMAGE_POSTER_URL}${movie.poster_path}` }}
            style={styles.posterImage}
          />
          <View style={styles.movieDetails}>
            <Text style={styles.movieTitle}>{movie.title}</Text>
            <Text style={styles.releaseDate}>{movie.release_date}</Text>
            <Text style={styles.voteAverage}>***{movie.vote_average}</Text>
            <Text numberOfLines={3} ellipsizeMode='tail' style={styles.overview}>{movie.overview}</Text>
          </View>
        </TouchableOpacity>
      ))}
    </>
  );
};

const styles = StyleSheet.create({
  movieContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start', 
    marginVertical: 5,
    padding: 10, 
    borderWidth: 0.5, 
    borderRadius: 10, 
  },
  posterImage: {
    width: 180,
    height: 250,
    marginRight: 10,
  },
  movieDetails: {
    flex: 1,
  },
  movieTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  releaseDate: {
    fontSize: 16,
    color: 'gray',
    marginBottom: 5,
  },
  voteAverage: {
    fontSize: 16,
    color: 'orange',
    marginBottom: 5,
  },
  overview: {
    fontSize: 14,
    color: 'black',
  },
});

export default SearchData;
