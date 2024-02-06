import React, { useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import { GetMovie } from '../services/services';
import { SliderBox } from 'react-native-image-slider-box';
import { IMAGE_POSTER_URL } from '../services/config';
import styles from '../styles/styles';
import { useNavigation } from '@react-navigation/native';

const Sliders = (props) => {
  const [movies, setMovies] = useState([]);
  const [images, setImages] = useState([]);
  const [error, setError] = useState(null);

  const navigation = useNavigation();

  useEffect(() => {
    const getMovies = async () => {
      try {
        const response = await GetMovie('/discover/movie');
        setMovies(response.results);

        const images = response.results.map(
          data => `${IMAGE_POSTER_URL}${data.backdrop_path}`,
        );

        let backImages = [];
        for (let i = 0; i < 10; ++i) {
          backImages = [...backImages, images[i]];
        }

        setImages(backImages);
      } catch (error) {
        console.error('Error fetching movies:', error);
        setError('Error fetching movies. Please try again later.');
      }
    };

    getMovies();
  }, [navigation]);

  const goToMovieDetails = (movieId) => {
    navigation.navigate("MovieDetails", { movieId });
  };

  return (
    <View>
      {error ? (
        <Text style={styles.errorText}>{error}</Text>
      ) : (
        <SliderBox
          images={images}
          dotColor={styles.secondaryColor}  
          inactiveDotColor={styles.inactiveColor}  
          onCurrentImagePressed={index =>
            goToMovieDetails(movies[index].id)
          }
        />
      )}
    </View>
  );
};

export default Sliders;
