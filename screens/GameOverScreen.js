import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, Image, Dimensions, ScrollView } from 'react-native'

import BodyText from '../components/BodyText';
import TitleText from '../components/TitleText';
import Colors from '../constants/colors';

import MainButton from '../components/MainButton.android';

const GameOverScreen = ({ numberOfRounds, userNumber, onRestart }) => {

  const [availableDeviceWidth, setAvailableDeviceWidth] = useState(Dimensions.get('window').width);
  const [availableDeviceHeight, setAvailableDeviceHeigth] = useState(Dimensions.get('window').height);

  useEffect(() => {
    const updateLayout = () => {
      setAvailableDeviceWidth(Dimensions.get('window').width);
      setAvailableDeviceHeigth(Dimensions.get('window').height);
    }

    Dimensions.addEventListener('change', updateLayout);

    return () => {
      Dimensions.removeEventListener('change', updateLayout)
    }

  })

  return (

    <ScrollView>
      <View style={styles.screen}>
        <TitleText>The game is over</TitleText>
        <View style={{
          ...styles.imageContainer, ...{
            width: availableDeviceWidth * 0.7,
            height: availableDeviceWidth * 0.7,
            borderRadius: (availableDeviceWidth * 0.7) / 2,
            marginVertical: availableDeviceHeight / 30
          }
        }
        }>
          <Image style={styles.image} resizeMode='cover' source={require('../assets/success.png')} />
        </View>
        <View style={styles.textResultContainer}>
          <BodyText style={styles.resultText}>Your phone needed <Text style={styles.highlight}>{numberOfRounds} </Text>
            rounds to guess the number <Text style={styles.highlight}>{userNumber}</Text></BodyText>
        </View>

        <MainButton onPress={onRestart}>NEW GAME</MainButton>
      </View>
    </ScrollView >

  )
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 20,
  },
  imageContainer: {
    borderWidth: 3,
    borderColor: 'black',
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  textResultContainer: {
    width: '80%'
  },
  resultText: {
    textAlign: 'center',
    marginVertical: Dimensions.get('window').height / 60,
    fontSize: Dimensions.get('window').height < 600 ? 16 : 20
  }
  ,
  highlight: {
    color: Colors.primary,
    fontFamily: 'open-sans-bold',
  }
})

export default GameOverScreen;