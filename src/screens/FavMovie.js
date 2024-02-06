import React, { useEffect, useState } from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView,StyleSheet } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import {
    addToFavorites,
    removeFromFavorites,
    addToWatchlist,
    removeFromWatchlist,
} from '../redux/movieSlice';
import { loginUser, logoutUser } from '../redux/userSlice';
import styles from '../styles/styles';
import { useNavigation } from '@react-navigation/native';
import { GetMovie } from '../services/services';
import { IMAGE_POSTER_URL } from '../services/config';

const FavMovie = (props) => {
    const dispatch = useDispatch();
    const favorites = useSelector((state) => state);
    const navigation = useNavigation();

    // console.log("fav Movie ids from redux....", favorites)

    const [favMovie, setFavMovie] = useState([]);

    useEffect(() => {
        fetchFavoriteMovies();
    }, [favorites.movies.favorites]);


    const fetchFavoriteMovies = async () => {
        try {
            const movieDetailsPromises = favorites.movies.favorites.map(async (id) => {
                const movieResponse = await GetMovie(`/movie/${id}`);
                return await movieResponse;
            });
    
            const movieDetails = await Promise.all(movieDetailsPromises);
            setFavMovie(movieDetails);
            // console.log(favMovie);
        } catch (error) {
            console.error('Error fetching favorite movies:', error);
        }
    };
    
      

    const renderFavoriteMovies = () => {
        if (!favMovie || favMovie.length === 0) {
            return <View style={styless.noFavTxt}><Text >No favorite movies available</Text></View>;
        }

    const onMoviePress = (movie) => {
        navigation.navigate('MovieDetails', { movieId: movie.id })
    }

    const removeFavMovie=(movie) =>{
        dispatch(removeFromFavorites({id: movie.id}))

    }

    return favMovie ? (
        favMovie.map((movie) => (
          // Add a check to ensure 'movie' is not undefined before accessing its properties
          movie && (
            <View key={movie.id} style={styles.show_data_in_row}>
              <TouchableOpacity
                key={movie.id}
                style={[styless.movieContainer, styles.show_data_in_row]}
                onPress={() => onMoviePress(movie)}
              >
                <Image
                  source={{ uri: `https://image.tmdb.org/t/p/w500/${movie.poster_path}` }}
                  style={styles.posterImage}
                />
                <View style={styless.movieDetails}>
                  <Text style={styless.movieTitle}>{movie.title}</Text>
                  <Text style={styless.releaseDate}>{movie.release_date}</Text>
                  <Text style={styless.voteAverage}>***{movie.vote_average}</Text>
                  <Text numberOfLines={3} ellipsizeMode="tail" style={styless.overview}>
                    {movie.overview}
                  </Text>
                  {favorites.movies.favorites.includes(movie.id) ? (
                    <TouchableOpacity onPress={() => removeFavMovie(movie)}>
                      <Text>Remove from Favorites</Text>
                    </TouchableOpacity>
                  ) : (
                    <TouchableOpacity onPress={() => dispatch(addToFavorites(movie.id))}>
                      <Text>Add to Favorites</Text>
                    </TouchableOpacity>
                  )}
                </View>
              </TouchableOpacity>
            </View>
          )
        ))
      ) : null;
      
      
    };

    return (
        <ScrollView>
            <View>
                {renderFavoriteMovies()}
            </View>
        </ScrollView>
    );
};

const styless = StyleSheet.create({
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
    //   flex: 1,
      margin:3
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
      width:'30%',
      marginBottom:15,
    },
    noFavTxt:{
        flex:1,
        justifyContent:'center',
        alignItems:'center'
    },
  });

export default FavMovie;















// import React, {useEffect, useState} from 'react';
// import {
//     View,
//     Text,
//     Image,
//     TouchableOpacity,
//     ScrollView,
//   } from 'react-native';
// import { useSelector, useDispatch } from 'react-redux';
// import { addToFavorites, removeFromFavorites, addToWatchlist, removeFromWatchlist } from '../redux/movieSlice';
// import { loginUser, logoutUser } from '../redux/userSlice';


// const FavMovie = (props) => {

//     const [favMovie, setFavMovie] = useState()


//     return(
//         <>
//             <View>
//                 <Text>Fav Movie</Text>
//             </View>
//         </>
//     )
// }

// export default FavMovie
