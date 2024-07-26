import React, { FC, memo } from 'react';
import { ImageBackground, StyleSheet, View } from 'react-native';

import { Footer, Header, List } from '../../components';

export const MainScreen: FC = memo(() => {
  return (
    <View style={styles.wrapper}>
      <ImageBackground
        source={require('./assets/img.png')}
        style={{ width: '100%', height: '100%' }}
        resizeMode={'repeat'}
      >
        <View style={styles.filter}>
          <Header />

          <List />

          <Footer />
        </View>
      </ImageBackground>
    </View>
  );
});

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    width: '100%',
    height: 'auto',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'column',
    backgroundColor: 'white',
  },
  filter: {
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(174,207,246,0.79)',
  },
});
