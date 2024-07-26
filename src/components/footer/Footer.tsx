import React from 'react';
import { StyleSheet, View } from 'react-native';

import { Input } from '../input';

export const Footer = () => {
  return (
    <View style={styles.inputWrapper}>
      <View style={styles.inputField}>
        <Input />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  inputWrapper: {
    width: '100%',
    height: '10%',
    minHeight: 70,
    alignItems: 'center',
    justifyContent: 'flex-start',
    flexDirection: 'row',
    backgroundColor: 'rgb(174,224,246)',
  },
  inputField: {
    width: '42.5%',
    height: '100%',
    justifyContent: 'flex-start',
  },
});
