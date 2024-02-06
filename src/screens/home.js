import React, { useState } from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Sliders from '../componenets/Slider';
import TrendingMovies from '../componenets/TrendingMovies';
import TopRatedMovies from '../componenets/TopRatedMovies';
import Search from '../componenets/search';
import SearchData from '../componenets/searchdata';

const HomeScreen = () => {
  const navigation = useNavigation();
  const [searchData, setSearchData] = useState(null);
  
  return (
    <View>
        <ScrollView showsVerticalScrollIndicator={false}>
        {searchData ? (
          <SearchData searchData={searchData} />
        ) : (
          <Search setSearchData={setSearchData} />
        )}
        {/* <Search navigation={navigation}/> */}
        {!searchData && (
          <>
      <Sliders 
      navigation={navigation}
      />
      <TrendingMovies 
      title="Trending Movies"
      url="/trending/movie/week"
      navigation={navigation}
      />
      
      <TopRatedMovies
      title="Top Rated Movies"
      url="/movie/top_rated"
      navigation={navigation}
      />

</>)}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({


});

export default HomeScreen;
