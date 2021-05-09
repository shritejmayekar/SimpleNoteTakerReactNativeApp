import React from 'react';
import { View, StyleSheet, Image,Dimensions,Text } from 'react-native';
import { useTheme } from '@react-navigation/native';
import { WavyHeader } from '../components/WavyHeader';

export function SplashScreen() {
  const { colors } = useTheme();
  return (<View style={[styles.container, { backgroundColor: '#60DBC5' }]} >

     {/* <WavyHeader
                customStyles={styles.svgCurve}
                customHeight={195}
                customTop={175}
                height='60%'
                customBgColor="#8a95ea"
                customWavePattern="M0,32L48,48C96,64,192,96,288,144C384,192,480,256,576,256C672,256,768,192,864,176C960,160,1056,192,1152,170.7C1248,149,1344,75,1392,37.3L1440,0L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z"
            /> */}
    <Image
      style={styles.thumb}
      source={require('../assets/icon.png')}
    />
    <Text style={{fontSize:32,fontWeight:'bold'}}>Take Note</Text>

  </View>);
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',

  },
  svgCurve: {
    position: 'absolute',
    width: Dimensions.get('window').width,
    top:225,

},
  text: {
    textAlign: 'center',
    alignContent: 'center',
    color: 'white',
    fontSize: 60,
    marginTop: 120,
    marginVertical: 20,

  },
  thumb: {
    width: 150,
    height: 150,
  },
});
