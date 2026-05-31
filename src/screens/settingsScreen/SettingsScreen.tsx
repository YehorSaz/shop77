import React from 'react';
import { StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Settings } from '../../components';

export const SettingsScreen = () => {
  return (
    <SafeAreaView style={styles.wrapper}>
      <Settings />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
  },
});
