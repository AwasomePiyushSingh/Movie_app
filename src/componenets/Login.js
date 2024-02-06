import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CryptoJS from 'crypto-js';
import { useSelector, useDispatch } from 'react-redux';
import { addToFavorites, removeFromFavorites, addToWatchlist, removeFromWatchlist } from '../redux/movieSlice';
import { loginUser, logoutUser } from '../redux/userSlice';

const LoginAndProfile = (props) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState(null);

  const dispatch = useDispatch();
  const user_redux = useSelector(state => state.user);

  const navigation = useNavigation();

  useEffect(() => {
    // Check if user data exists in AsyncStorage
    const checkUserData = async () => {
      try {
        const storedUserData = await AsyncStorage.getItem('user');
        if (storedUserData) {
          const storedUser = JSON.parse(storedUserData);
          
          setUser(storedUser)
          dispatch(loginUser(storedUser));
          // console.log("User data",user)
        //   const decryptedPassword = CryptoJS.AES.decrypt(storedUser.password, 'secret_key').toString(CryptoJS.enc.Utf8);
        //   if (decryptedPassword) {
        //     setUser(storedUser);
        //   }
        }
      } catch (error) {
        console.error('Error retrieving user data:', error);
      }
    };

    checkUserData();

    
  }, []);

  const handleLogin = async () => {
    // console.log(user,password,email)
    try {
      // console.log(user,email,password,(user.email == email && user.password == password))
      if (user && user.email == email && user.password == password) {
        Alert.alert('Success', 'Login successful!');
        await AsyncStorage.setItem('user', JSON.stringify(user));
        dispatch(loginUser(user));
        navigation.navigate('HomeScreen');
      } else {
        Alert.alert('Error', 'Invalid email or password');
      }
    } catch (error) {
      console.error('Error verifying login:', error);
    }
  };



  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem('user');
      setUser(null);
      dispatch(logoutUser());
      Alert.alert('Success', 'Logout successful!');
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  return (
    <View style={styles.container}>
      {/* {console.log("user and redux userdata",user,user_redux)} */}
      {!user ? (
        <>
          <Text style={styles.headerText}>Login</Text>
          <TextInput
            placeholder="Username"
            style={styles.input}
            onChangeText={(text) => {console.log(text);setEmail(text)}}
          />
          <TextInput
            placeholder="Password"
            secureTextEntry={true}
            style={styles.input}
            onChangeText={(text) => setPassword(text)}
          />
          <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
            <Text style={styles.buttonText}>Login</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.signupButton} onPress={() => navigation.navigate('SignUp')}>
            <Text style={styles.buttonText}>Sign Up</Text>
          </TouchableOpacity>
        </>
      ) : (
        <>
          <View style={styles.profileContainer}>
            <Text>Name: {user.name}</Text>
            <Text>Email: {user.email}</Text>
          </View>
          <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
            <Text style={styles.buttonText}>Logout</Text>
          </TouchableOpacity>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    width: '80%',
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    padding: 10,
  },
  loginButton: {
    width: '80%',
    backgroundColor: 'blue',
    borderRadius: 5,
    padding: 12,
    alignItems: 'center',
    marginTop: 10,
  },
  signupButton: {
    width: '80%',
    backgroundColor: 'green',
    borderRadius: 5,
    padding: 12,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
  profileContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
  logoutButton: {
    width: '80%',
    backgroundColor: 'red',
    borderRadius: 5,
    padding: 12,
    alignItems: 'center',
    marginTop: 20,
  },
});

export default LoginAndProfile;
