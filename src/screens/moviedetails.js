import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { IMAGE_POSTER_URL } from '../services/config';
import { GetMovie } from '../services/services';
import styles from '../styles/styles';
import Loader from '../loader';
import Icon from 'react-native-vector-icons/Entypo';
import TrendingMovies from '../componenets/TrendingMovies';
import { useSelector, useDispatch } from 'react-redux';
import { addToFavorites, removeFromFavorites, addToWatchlist, removeFromWatchlist } from '../redux/movieSlice';
import { loginUser, logoutUser } from '../redux/userSlice'
import { AntDesign } from '@expo/vector-icons';


const MovieDetails = (props) => {
  const [loading, setLoading] = useState(true);
  const [details, setDetails] = useState();

  const dispatch = useDispatch();
  const user = useSelector(state => state.user);
  const favorites = useSelector(state => state.movies.favorites);
  const watchlist = useSelector(state => state.movies.watchlist);

  useEffect(() => {
    getDetails();
  }, [props.params?.movieId,props.route?.params?.movieId]);

  const getDetails = async () => {
    const data = await GetMovie(`/movie/${props.route.params.movieId}`);
    setDetails(data);
    setLoading(false) ;
  };

  const handleAddToFavorites = (details) => {
    alert('Added to Fav list test',details.id)
    // console.log('Added to Fav list test',props.route.params.movieId,"\n\n\n",details)
    dispatch(addToFavorites(props.route.params.movieId));
  };

  const handleRemoveFromFavorites = (details) => {
    dispatch(removeFromFavorites(props.route.params.movieId));
  };

  const handleAddToWatchlist = (details) => {
    alert("Added to my watchlist")
    dispatch(addToWatchlist(props.route.params.movieId));
  };

  const handleRemoveFromWatchlist = (details) => {
    dispatch(removeFromWatchlist(props.route.params.movieId));
  };

  const handleLogin = (userData) => {
    dispatch(loginUser(userData));
  };

  const handleLogout = () => {
    dispatch(logoutUser());
  };

  const getGenre = () => {
    return details.genres.map(genre => (
      <View style={styles.genreContainer}>
        <Text style={styles.genre}>{genre.name}</Text>
      </View>
    ));
  };

  return (
    <ScrollView style={styles.sectionBg}>
      {details &&
      
        <View>
          {/* {console.log("details....",details.id)} */}
          <View>
            <Image
              source={{ uri: `${IMAGE_POSTER_URL}${details.backdrop_path}` }}
              style={styles.imageBg}
            />
          </View>
          <Text style={styles.detailsMovieTitle}>{details.original_title}</Text>
          <View styel={styles.show_data_in_row}>
            <Text style={styles.heading}>OVERVIEW</Text>
            <AntDesign
              style={{ position: "absolute", top: 10, right: 100 ,color: 'white',}}
              name='hearto'
              size={24}
              onPress={handleAddToFavorites}
            />
            <AntDesign
              style={{ position: "absolute", top: 10, right: 20,color: 'white', }}
              name='addfile'
              size={24}
              onPress={handleAddToWatchlist}
            />
          </View>

          <Text style={styles.overview}>{details.overview}</Text>

          <View style={styles.detailsContainer}>
            <View>
              <Text style={styles.heading}>BUDGET</Text>
              <Text style={styles.details}>$ {details.budget}</Text>
            </View>

            <View>
              <Text style={styles.heading}>DURATION</Text>
              <Text style={styles.details}>{details.runtime} min.</Text>
            </View>

            <View>
              <Text style={styles.heading}>RELEASE DATE</Text>
              <Text style={styles.details}>{details.release_date}</Text>
            </View>
          </View>

          <Text style={styles.heading}>GENRE</Text>
          <View style={{ display: 'flex', flexDirection: 'row' }}>
            {getGenre()}
          </View>

          <TrendingMovies
            title="SIMILAR MOVIES"
            navigation={props.navigation}
            url={`/movie/${props.route.params.movieId}/similar`}
          />
        </View>
      }
      <Loader loading={loading} />
    </ScrollView>
  );
};

export default MovieDetails;
