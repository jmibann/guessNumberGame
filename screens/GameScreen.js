import React, { useState, useRef, useEffect } from 'react';
import { StyleSheet, View, Text, Alert, FlatList, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons'

import NumberContainer from '../components/NumberContainer';
import Card from '../components/Card';
import MainButton from '../components/MainButton.android';
import BodyText from '../components/BodyText.js'

import defaultStyles from '../constants/default-style';

const generateRandomBetween = (min, max, exclude) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  const rdnNum = Math.floor(Math.random() * (max - min)) + min;

  if (rdnNum === exclude) {
    return generateRandomBetween(min, max, exclude);
  } else {
    return rdnNum;
  };
};

const renderListItem = (listLength, itemData) => (
  <View style={styles.list}>
    <BodyText>#{listLength - itemData.index}: </BodyText>
    <BodyText>{itemData.item}</BodyText>
  </View>
)

const GameScreen = ({ userChoice, onGameOver }) => {

  const initialGuess = generateRandomBetween(1, 100, userChoice);

  const [currentGuess, setCurrentGuess] = useState(initialGuess);
  const [pastGuesses, setPastGuesses] = useState([initialGuess.toString()]);
  const [availableDeviceWidth, setAvailableDeviceWidth] = useState(Dimensions.get('window').width);
  const [availableDeviceHeight, setAvailableDeviceHeight] = useState(Dimensions.get('window').height);
  const currentLow = useRef(1);
  const currentHight = useRef(100);

  useEffect(() => {
    const updateLayout = () => {
      setAvailableDeviceWidth(Dimensions.get('window').width);
      setAvailableDeviceHeight(Dimensions.get('window').height);
    };

    Dimensions.addEventListener('change', updateLayout);

    return () => {
      Dimensions.removeEventListener('change', updateLayout);
    }
  })

  useEffect(() => {
    if (currentGuess === userChoice) {
      onGameOver(pastGuesses.length);
    }
  }, [currentGuess, userChoice, onGameOver])

  const nextGuessHandler = direction => {
    if (
      (direction === 'lower' && currentGuess < userChoice) ||
      (direction === 'greater' && currentGuess > userChoice)) {
      Alert.alert('Don\'t lie!', 'You know that is wrong...', [{ text: 'Sorry', style: 'cancel' }]);
      return;
    }

    if (direction === 'lower') {
      currentHight.current = currentGuess;
    } else {
      currentLow.current = currentGuess + 1;
    }

    const nextNumber = generateRandomBetween(currentLow.current, currentHight.current, setCurrentGuess);
    setCurrentGuess(nextNumber);
    setPastGuesses(curPastGuesses => [nextNumber.toString(), ...curPastGuesses]);
  }

  let listContainerStyle = styles.listContainer;

  let gameControls = (
    <React.Fragment>
      <NumberContainer>{currentGuess}</NumberContainer>
      <Card style={styles.buttonContainer}>
        <MainButton onPress={nextGuessHandler.bind(this, 'lower')}>
          <Ionicons name="md-remove" size={24} color="white" />
        </MainButton>
        <MainButton onPress={nextGuessHandler.bind(this, 'greater')}>
          <Ionicons name="md-add" size={24} color="white" />
        </MainButton>
      </Card>
    </React.Fragment>
  )

  if (availableDeviceHeight < 500) {

    gameControls = (
      <View style={styles.controls}>
        <MainButton onPress={nextGuessHandler.bind(this, 'lower')}>
          <Ionicons name="md-remove" size={24} color="white" />
        </MainButton>
        <NumberContainer>{currentGuess}</NumberContainer>
        <MainButton onPress={nextGuessHandler.bind(this, 'greater')}>
          <Ionicons name="md-add" size={24} color="white" />
        </MainButton>
      </View>
    );
  }


  return (
    <View style={styles.screen}>
      <Text style={defaultStyles.titleText}>Opponent's guess:</Text>
      {gameControls}
      <View style={listContainerStyle}>
        {/* <ScrollView contentContainerStyle={styles.listContent}>
          {pastGuesses.map((guess, index) => renderListItem(guess, pastGuesses.length - index))}
        </ScrollView> */}
        <FlatList
          keyExtractor={item => item}
          data={pastGuesses}
          renderItem={renderListItem.bind(this, pastGuesses.length)}
          contentContainerStyle={styles.listContent}
        />
      </View>
    </View >
  )
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 10,
    alignItems: 'center'
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: 400,
    maxWidth: '90%'
  },
  listContainer: {
    flex: 1,
    width: '60%'
  },
  listContainerBig: {
    flex: 1,
    width: '80%'
  }
  ,
  listContent: {
    flexGrow: 1,
    // alignItems: 'center',
    justifyContent: 'flex-end'
  },
  list: {
    borderColor: '#ccc',
    borderWidth: 1,
    padding: 15,
    marginVertical: 10,
    backgroundColor: 'white',
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%'
  },
  controls: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '60%',
    alignItems: 'center'
  }
});

export default GameScreen;