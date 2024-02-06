import React from 'react';
import { Provider } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StyleSheet, SafeAreaView } from 'react-native';
import HomeScreen from './src/screens/home';
import MovieDetails from './src/screens/moviedetails';
import NavbarBottom from './src/componenets/BottomNavigator';
import homeOptions from './src/componenets/homeOptions';
import LoginAndProfile from './src/componenets/Login'
import SignUp from './src/componenets/Signup';
import store from './src/redux/store';
import FavMovie from './src/screens/FavMovie';
import Watchlist from './src/screens/Watchlist';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <Provider store={store}>
      <SafeAreaView style={styles.container}>
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen name="HomeScreen" component={HomeScreen} options={homeOptions}/>
            <Stack.Screen name="MovieDetails" component={MovieDetails} options={{ title: 'Movie Details' }}/>
            <Stack.Screen name="LoginAndProfile" component={LoginAndProfile} options={{ title: 'Login & Profile Page' }}/>
            <Stack.Screen name="SignUp" component={SignUp} options={{ title: 'SignUp Page' }}/>
            <Stack.Screen name="FavMovie" component={FavMovie} options={{ title: 'Favourite Movie List' }}/>
            <Stack.Screen name="Watchlist" component={Watchlist} options={{ title: 'Watchlist Movie List' }}/>
          </Stack.Navigator>
          <NavbarBottom />
        </NavigationContainer>
      </SafeAreaView>
    </Provider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 5,
    // backgroundColor: '#fff',
  },
});

export default App;
