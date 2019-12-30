import React from 'react';
import { StyleSheet, View, Text, Button, Image } from 'react-native'

import BodyText from '../components/BodyText';
import TitleText from '../components/TitleText';

const GameOverScreen = ({ numberOfRounds, userNumber, onRestart }) => {
  return (
    <View style={styles.screen}>
      <TitleText>The game is over</TitleText>
      <View style={styles.imageContainer}>
        <Image style={styles.image} resizeMode='cover' source={require('../assets/success.png')} />
      </View>
      <BodyText>Number of rounds: {numberOfRounds}</BodyText>
      <BodyText>Number chosen was: {userNumber}</BodyText>
      <Button title='NEW GAME' onPress={onRestart} />
    </View>
  )
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  imageContainer: {
    width: 300,
    height: 300,
    borderRadius: 150,
    borderWidth: 3,
    borderColor: 'black',
    overflow: 'hidden',
    marginVertical: 30
  },
  image: {
    width: '100%',
    height: '100%',
  }
})

export default GameOverScreen;