import React from 'react'
import { View, StyleSheet, Image } from 'react-native'
import { Appbar, Title } from 'react-native-paper'
import { IconButton } from './IconButton'
function Header({ titleText, iconButton, onPress }) {
  return (
    <Appbar.Header style={styles.headerContainer} >
      <Image
        style={styles.thumb}
        source={require('../assets/icon.png')}
      />
      <View style={styles.container}>
        <Title style={styles.title}>{titleText}</Title>
      </View>
      <View style={[styles.container, { alignItems: 'flex-end' }]}>
        <IconButton name={iconButton} onPress={onPress} />
      </View>
    </Appbar.Header>
  )
}

const styles = StyleSheet.create({
  headerContainer: {
    backgroundColor: '#60DBC5',
    width: '95%'
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    color: '#2E7166'
  },
  thumb: {
    marginLeft:20,
    width: 60,
    height: 60,
  },
})

export default Header
