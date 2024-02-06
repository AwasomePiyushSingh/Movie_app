import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import styles from '../styles/styles';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { useSelector, useDispatch } from 'react-redux';
import { loginUser, logoutUser } from '../redux/userSlice';

function NavbarBottom(props) {
  const [userData, setUserData] = useState(null);
  const dispatch = useDispatch();
  const user = useSelector(state => state.user);

  const navigation = useNavigation();

  useEffect(() => {
    {alert("useeffect called")}
    checkUserData();
  }, []);

  const checkUserData = async () => {
    try {
      // const user = useSelector(state => state.user);
      const data = await AsyncStorage.getItem('user');
      console.log("inside bittom nav file user data",data)
      // console.log("inside bittom nav file userData",userData)
      if (data) {
        const parsedData = JSON.parse(data);
        setUserData(parsedData);
        dispatch(loginUser(parsedData));
      }
      {setUserData(null)}
    } catch (error) {
      console.error('Error retrieving user data:', error);
    }
  };

  const goToLoginpage = () => {
    console.log("bottom nav login func")
    navigation.navigate('LoginAndProfile');
  };

  const handleFavoriteIconPress = () => {
    // Handle favorite icon press logic
    alert("handleFavoriteIconPress clicked")
  };

  const handleWatchlistIconPress = () => {
    // Handle watchlist icon press logic
    // alert("handleWatchlistIconPress clicked")
    navigation.navigate('Watchlist')
  };

  return (
    <View style={{ backgroundColor: styles.colors.baseColor }}>
      {/* {userData && <>
      {console.log("userdata in bottom nav",userData)}
      {console.log("redux user in bottom nav", user)}
      </>
      } */}
      <View style={styles.show_data_in_row}>
        <Icon
          name="home"
          size={35}
          color={styles.colors.textColor}
          onPress={() => navigation.navigate('HomeScreen')}
        />
        <MaterialCommunityIcons
          name="account-circle-outline"
          size={35}
          color={styles.colors.textColor}
          onPress={() => goToLoginpage()}
        />
        {console.log("user data in jsx",userData)}
        {!userData &&
        <MaterialIcons
          name="favorite-border"
          size={35}
          color={styles.colors.textColor}
          onPress={() => goToLoginpage()}
        />}
        {userData && (
          <>
            <MaterialIcons
              name="favorite-border"
              size={35}
              color={styles.colors.textColor}
              onPress={() => navigation.navigate('FavMovie')}
            />
            <MaterialIcons
              name="playlist-add"
              size={35}
              color={styles.colors.textColor}
              onPress={handleWatchlistIconPress}
            />
          </>
        )}
      </View>
    </View>
  );
}

export default NavbarBottom;
