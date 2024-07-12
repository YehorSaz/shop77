import { useNavigation } from '@react-navigation/native';
import React, { FC } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { Recent } from '../../components/recent/recent.tsx';

export const RecentScreen: FC = () => {
  const { navigate } = useNavigation<any>();

  return (
    <View style={styles.wrapper}>
      <View style={styles.header}>
        <Text style={{ fontSize: 22, fontWeight: '600', color: '#35628c' }}>
          Архів
        </Text>
      </View>
      <Recent />
      <View style={styles.footer}>
        <Text
          style={{ fontSize: 22, fontWeight: '600', color: '#35628c' }}
          onPress={() => navigate('main')}
        >
          назад
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    justifyContent: 'space-between',
  },
  header: {
    width: '100%',
    height: 70,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#1c1a1a',
    elevation: 13,
    backgroundColor: '#FFFFFFFF',
    marginBottom: 5,
  },
  footer: {
    width: '100%',
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#1c1a1a',
    elevation: 13,
    backgroundColor: '#FFFFFFFF',
  },
});
