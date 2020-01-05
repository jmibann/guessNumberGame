import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  View,
  Button,
  TouchableWithoutFeedback,
  Keyboard,
  Alert,
  Dimensions,
  ScrollView,
  KeyboardAvoidingView
} from 'react-native';

import Colors from '../constants/colors'

import Card from '../components/Card';
import Input from '../components/Input'
import NumberContainer from '../components/NumberContainer'
import BodyText from '../components/BodyText';
import TitleText from '../components/TitleText';
import MainButton from '../components/MainButton'

const StartGameScreen = props => {

  const [enteredValue, setEnteredValue] = useState('');
  const [confirmed, setCofirmed] = useState(false);
  const [selectedNumber, setSelectedNumber] = useState();
  const [buttonWidth, setButtonWidth] = useState(Dimensions.get('window').width / 3.5);

  const numberInputHandler = inputText => { setEnteredValue(inputText.replace(/[^0-9]/g, '')); };

  const resetInputHandler = () => {
    setEnteredValue('');
    setCofirmed(false);
  }

  useEffect(() => {
    const updateLayout = () => {
      setButtonWidth(Dimensions.get('window').width / 3.5);
    }

    Dimensions.addEventListener('change', updateLayout);

    return () => {
      Dimensions.removeEventListener('change', updateLayout);
    }
  })

  const confirmInputHandler = () => {
    const chosenNumber = parseInt(enteredValue);

    if (isNaN(chosenNumber) || chosenNumber <= 0 || chosenNumber > 99) {
      Alert.alert('Invalid number', 'Number has to be between 1 and 99.', [{ text: 'ok', style: 'destructive', onPress: resetInputHandler }]);
      return
    }

    setCofirmed(true);
    setEnteredValue('');
    setSelectedNumber(chosenNumber);
    Keyboard.dismiss();
  }

  let confirmedOutput;

  if (confirmed) {
    confirmedOutput = (
      <View style={styles.summaryContainer}>
        <BodyText > You selected: </BodyText>
        <NumberContainer > {selectedNumber} </NumberContainer>
        <MainButton onPress={() => props.onStartGame(selectedNumber)}>START GAME</MainButton>
      </View>
    )
  }

  return (
    <ScrollView>
      <KeyboardAvoidingView behavior="position" keyboardVerticalOffset={30}>
        <TouchableWithoutFeedback onPress={() => { Keyboard.dismiss() }}>
          <View style={styles.screen}>
            <TitleText style={styles.title}> Start a new game</TitleText>
            <Card style={styles.inputContainer}>
              <BodyText>Select a number</BodyText>
              <Input style={styles.input}
                blurOnSubmit autoCapitalize='none'
                autoCorrect={false}
                keyboardType='number-pad'
                maxLength={2}
                onChangeText={numberInputHandler}
                value={enteredValue}
              />
              <View style={styles.buttonsContainer}>
                <View style={{ width: buttonWidth }}>
                  <Button title={'Reset'} color={Colors.primary} onPress={resetInputHandler} /></View >
                <View style={{ width: buttonWidth }}>
                  <Button title={'Confirm'} color={Colors.secondary} onPress={confirmInputHandler} />
                </View>
              </View>
            </Card>
            {confirmedOutput}
          </View>
        </TouchableWithoutFeedback >
      </KeyboardAvoidingView>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 10,
    alignItems: 'center'
  },
  title: {
    marginVertical: 15,
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    paddingHorizontal: 15
  },
  inputContainer: {
    width: '80%',
    maxWidth: '95%',
    minWidth: 300,
    alignItems: 'center'
  },
  // button: {
  //   width: Dimensions.get('window').width / 3.5
  // },
  input: {
    width: 50,
    textAlign: 'center'
  },
  summaryContainer: {
    marginTop: 30,
    alignItems: 'center'
  }
});

export default StartGameScreen;