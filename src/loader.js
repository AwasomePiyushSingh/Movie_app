import React from 'react';
import {ActivityIndicator,View,StyleSheet} from 'react-native';



export default function Loader(props) {

  return (
    <>
    {props.loading && 
    <View style={[styles.loderContainer, styles.loderHorizontal]}>
        <ActivityIndicator size="large" color="#000000" />
    </View>
    }
    </>
  );
}


const styles = StyleSheet.create({
    loderContainer: {
        flex: 1,
        justifyContent: "center",
      },
    loderHorizontal: {
        flexDirection: "row",
        justifyContent: "space-around",
        padding: '50%'
    }
  });