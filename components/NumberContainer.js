import React from 'react';
import { StyleSheet, View, Text } from 'react-native'

import Colors from '../constants/colors'

const NumberContainer = props => {
  return (
    <View style={styles.container}>
      <Text style={styles.number}>
        {props.children}
      </Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    borderWidth: 2,
    borderColor: Colors.primary,
    padding: 10,
    borderRadius: 10,
    marginVertical: 10,
    // justifyContent: 'flex-start',
    // alignItems: "flex-end"
  },
  number: {
    color: Colors.secondary,
    fontSize: 22
  }
});

export default NumberContainer;