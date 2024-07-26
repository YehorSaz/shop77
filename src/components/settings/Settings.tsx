import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { StyleSheet, Switch, Text, TouchableOpacity, View } from 'react-native';

import { useAppDispatch, useAppSelector } from '../../hooks';
import { listActions } from '../../redux';

export const Settings = () => {
  const { showNotification } = useAppSelector(state => state.list);
  const dispatch = useAppDispatch();
  const { goBack } = useNavigation();

  const toggleSwitch = () => {
    dispatch(listActions.showNotification(!showNotification));
  };

  return (
    <View style={styles.wrapper}>
      <Text style={styles.title}>Налаштування</Text>
      <View style={styles.settingsItemWrapper}>
        <View style={styles.settingsItem}>
          <Text style={styles.settingsItemText}>Показувати попередження</Text>
          <Switch
            trackColor={{ false: '#bab9b9', true: '#82c2bc' }}
            thumbColor={showNotification ? '#159789' : '#f2f3f3'}
            onValueChange={toggleSwitch}
            value={showNotification}
          />
        </View>
      </View>
      <TouchableOpacity style={styles.saveWrapper} onPress={() => goBack()}>
        <Text style={styles.save}>Зберегти</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    flexDirection: 'column',
  },
  title: {
    height: 70,
    textAlignVertical: 'center',
    textAlign: 'center',
    fontSize: 20,
    fontWeight: '600',
    color: '#35628c',
  },
  settingsItemWrapper: {
    flex: 1,
  },
  settingsItem: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
  },
  settingsItemText: {
    fontSize: 16,
    fontWeight: '400',
    color: '#35628c',
  },
  saveWrapper: {
    marginTop: 'auto',
    justifyContent: 'center',
    height: 70,
    backgroundColor: 'rgb(174,224,246)',
  },
  save: {
    textAlign: 'center',
    fontSize: 20,
    fontWeight: '600',
    color: '#35628c',
  },
});
