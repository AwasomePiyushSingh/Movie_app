import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import CryptoJS from 'crypto-js';

const SignUp = (props) => {
  const [name, setName] = useState('');
  const [mobile, setMobile] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const navigation = useNavigation();



  const handleSignUp = async () => {
    if (!name || !mobile || !email || !password || !confirmPassword) {
      Alert.alert('Error', 'All fields are required');
    } else if (password !== confirmPassword) {
      Alert.alert('Error', 'Passwords do not match');
    } else if (mobile.length !== 10) {
        Alert.alert('Error', 'Mobile Number is not Valid');
    }else {
        try {
            // const encryptedPassword = CryptoJS.AES.encrypt(password, 'secret_key').toString();
            const userData = { name, mobile, email, password };
            await AsyncStorage.setItem('user', JSON.stringify(userData));
            Alert.alert('Success', 'Sign up successful!');
            // const storedUserData = await AsyncStorage.getItem('user');
            // const storedUser = JSON.parse(storedUserData);
            // console.log("User data",storedUser)
            setName('');
            setMobile('');
            setEmail('');
            setPassword('');
            setConfirmPassword('');
            navigation.navigate('LoginAndProfile');
          } catch (error) {
            console.error('Error registering user:', error);
          }
    }
    
  };

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Name"
        style={styles.input}
        value={name}
        onChangeText={(text) => setName(text)}
      />
      <TextInput
        placeholder="Mobile Number"
        style={styles.input}
        value={mobile}
        onChangeText={(text) => setMobile(text)}
        keyboardType="phone-pad"
      />
      <TextInput
        placeholder="Email"
        style={styles.input}
        value={email}
        onChangeText={(text) => setEmail(text)}
        keyboardType="email-address"
      />
      <TextInput
        placeholder="Password"
        style={styles.input}
        value={password}
        onChangeText={(text) => setPassword(text)}
        secureTextEntry
      />
      <TextInput
        placeholder="Confirm Password"
        style={styles.input}
        value={confirmPassword}
        onChangeText={(text) => setConfirmPassword(text)}
        secureTextEntry
      />
      <TouchableOpacity style={styles.signupButton} onPress={handleSignUp}>
        <Text style={styles.buttonText}>Sign Up</Text>
      </TouchableOpacity>
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
  input: {
    width: '80%',
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    padding: 10,
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
});

export default SignUp;
