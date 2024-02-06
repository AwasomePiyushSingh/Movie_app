import React, {useEffect, useState} from 'react';
import {View, Image, FlatList, Text, TouchableOpacity} from 'react-native';
import { POSTER_IMAGE } from '../services/config'; 
import { GetMovie } from '../services/services';
import styles from '../styles/styles';
import Loader from '../loader';

const TopRatedMovies = props => {
  const [loading, setLoading] = useState(true);
  const [movies, setMovies] = useState();

  useEffect(() => {
    const getMovies = async () => {
      const data = await GetMovie(props.url);
      setMovies(data.results);
      setLoading(false);
    };

    getMovies();
  }, []);

  return (
    <View>
        <View>
          <Text style={styles.heading}>{props.title}</Text>
          <FlatList
            keyExtractor={item => item.id}
            data={movies}
            horizontal
            renderItem={item => displayMovies(item, props)}
          />
        </View>
        <Loader open={loading}/>
    </View>
  );
};

const displayMovies = ({item}, props) => {
  return (
    <TouchableOpacity
      onPress={() => {
        props.navigation.navigate('MovieDetails', {movieId: item.id});
      }}
      style={{marginHorizontal: 10}}>
      <Image
        source={{uri: `${POSTER_IMAGE}${item.poster_path}`}}
        style={styles.posterImage}
      />
      <Text style={styles.movieTitle}>{item.original_title}</Text>
    </TouchableOpacity>
  );
};

export default TopRatedMovies;
