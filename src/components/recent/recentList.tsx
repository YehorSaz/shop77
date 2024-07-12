import React, { FC } from 'react';
import { Alert, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import { useAppDispatch } from '../../hooks';
import { listActions } from '../../redux';

interface IProps {
  title: string;
  data: string[];
}

export const RecentList: FC<IProps> = ({ data, title }) => {
  const dispatch = useAppDispatch();
  const removeItem = (item: string) => {
    Alert.alert('Видалити список?', '', [
      {
        text: 'так',
        onPress: () => dispatch(listActions.removeRecentItem(item)),
      },
      {
        text: 'ні',
      },
    ]);
  };

  return (
    <View style={styles.wrapper}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>{title}</Text>
        <TouchableOpacity style={{ alignSelf: 'flex-end' }}>
          <Text
            onPress={() => removeItem(title)}
            style={{
              textAlignVertical: 'bottom',
              fontStyle: 'italic',
              fontSize: 18,
              color: '#cb4848',
            }}
          >
            видалити
          </Text>
        </TouchableOpacity>
      </View>
      <View style={styles.items}>
        {data.map((item, index) => (
          <Text style={{ fontSize: 18, color: '#35628c' }} key={index}>
            - {item}
          </Text>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    width: '100%',
    marginBottom: 5,
    shadowColor: '#1c1a1a',
    elevation: 13,
    backgroundColor: '#FFFFFFFF',
  },
  titleContainer: {
    width: '100%',
    height: 40,
    paddingTop: 5,
    paddingHorizontal: 20,
    marginBottom: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  title: {
    textAlignVertical: 'bottom',
    textDecorationLine: 'underline',
    fontSize: 20,
    fontWeight: '600',
    color: '#35628c',
  },
  items: {
    justifyContent: 'space-between',
    paddingHorizontal: 10,
  },
});
