import React from 'react';
import { StyleSheet, View } from 'react-native';

import { Settings } from '../../components';

export const SettingsScreen = () => {
  return (
    <View style={styles.wrapper}>
      <Settings />
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
  },
});
