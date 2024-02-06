import {Dimensions, StyleSheet} from 'react-native';

const deviceHeight = Dimensions.get('window').height;
const deviceWidth = Dimensions.get('window').width;

const styles = {
    colors:{
      textColor: '#fff',
      baseColor: '#151C26',
      fadedColor: '#969696',
      secondaryColor: '#28a745',
      inactiveColor: '#6c757d',
    },
    show_data_in_row : {
        flexDirection:'row',
        justifyContent:'space-between',
        marginTop:'2%',
    },
    heading: {
      fontSize: 19,
      color: '#969696',
      margin: 10,
    },
    posterImage: {
      height: 250,
      width: 150,
      borderRadius: 10,
    },
    movieTitle: {
      color: '#969696',
      width: 150,
      textAlign: 'center',
      marginTop: 5,
      fontSize: 16,
    },
    genreContainer: {
      borderWidth: 1,
      borderRadius: 5,
      borderColor: '#fff',
      paddingHorizontal: 10,
      paddingVertical: 5,
      marginHorizontal: 10,
    },
    genre: {
      color: '#fff',
      fontSize: 16,
    },
    sectionBg: {
      backgroundColor: '#151C26',
      height: deviceHeight,
    },
    imageBg: {
      width: deviceWidth,
      height: 250,
    },
    detailsMovieTitle: {
      fontSize: 28,
      color: '#fff',
      textAlign: 'center',
      marginTop: -40,
    },
    linkContainer: {
      backgroundColor: '#F4C10F',
      borderRadius: 100,
      padding: 10,
      width: 45,
      marginLeft: 20,
      marginTop: -20,
    },
    overview: {
      color: '#fff',
      marginHorizontal: 10,
      textAlign: 'justify',
      fontSize: 16,
    },
    details: {
      color: '#F4C10F',
      fontSize: 15,
      marginLeft: 10,
      fontWeight: 'bold',
    },
    detailsContainer: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginVertical: 20,
    },
    searchBox:{
      paddingVertical:5,
      paddingHorizontal:5,
      margin: 5,
      borderColor: "#ccc",
      borderWidth: 1,
      borderRadius: 8,

    }
  };
  
  export default styles;