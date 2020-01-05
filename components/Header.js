import React from 'react';
import { StyleSheet, View, Platform } from 'react-native';

import Colors from '../constants/colors';
import TitleText from './TitleText';

const Header = ({ title }) => {
  return (
    <View style={{ ...styles.headerBase, ...Platform.select({ ios: styles.headerIOS, android: styles.headerAndroid }) }}>
      <TitleText style={styles.headerTitle}>{title}</TitleText>
    </View>
  )
}

const styles = StyleSheet.create({
  headerBase: {
    width: '100%',
    height: 90,
    paddingTop: 36,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  headerIOS: {
    borderBottomColor: '#CCC',
    backgroundColor: 'white',
    borderWidth: 1
  },
  headerAndroid: {
    backgroundColor: Colors.primary,
  },
  headerTitle: {
    color: Platform.OS === 'ios' ? Colors.primary : 'white'

  }
})

export default Header;