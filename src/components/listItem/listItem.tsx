import { faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { Dispatch, FC, SetStateAction, useRef } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

interface IProps {
  item: string;
  // setTrigger: Dispatch<SetStateAction<boolean>>;
  // trigger: boolean;
}

export const ListItem: FC<IProps> = ({ item }) => {
  const itemRef = useRef<Text>(null);
  // const deleteItem = async (itemForDel: string) => {
  //   await AsyncStorage.removeItem(itemForDel);
  //   const data = await AsyncStorage.getItem('list');
  //   if (data !== null) {
  //     const newArr = JSON.parse(data);
  //     const index = newArr.indexOf(itemForDel);
  //     newArr.splice(index, 1);
  //     await AsyncStorage.setItem('list', JSON.stringify(newArr));
  //     setTrigger(!trigger);
  //   }
  // };

  const mark = async (ref: React.RefObject<Text>, fieldName: string) => {
    const field = await AsyncStorage.getItem(fieldName);
    if (field === null) {
      await AsyncStorage.setItem(fieldName, 'marked');
      ref.current?.setNativeProps({
        style: { textDecorationLine: 'line-through', opacity: 0.3 },
      });
      return;
    } else if (field === 'marked') {
      ref.current?.setNativeProps({
        style: { textDecorationLine: 'none', opacity: 1 },
      });
      // await AsyncStorage.removeItem(fieldName);
      await AsyncStorage.setItem(fieldName, 'unmarked');
      return;
    } else if (field === 'unmarked') {
      ref.current?.setNativeProps({
        style: {
          textDecorationLine: 'line-through',
          opacity: 0.3,
        },
      });
      // await AsyncStorage.removeItem(fieldName);
      await AsyncStorage.setItem(fieldName, 'marked');
      return;
    }
  };

  return (
    <View style={styles.wrapper}>
      <Text
        ref={itemRef}
        onPress={() => mark(itemRef, item)}
        style={styles.text}
      >
        - {item}
      </Text>
      <TouchableOpacity
        style={{ width: '20%', alignItems: 'center' }}
        onPress={() => {
          // deleteItem(item);
        }}
      >
        <FontAwesomeIcon
          size={22}
          icon={faTrashCan}
          color={'rgba(128,51,51,0.75)'}
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    elevation: 16,
    shadowColor: '#1c1a1a',
    backgroundColor: 'rgba(136,215,243,0.86)',
    marginVertical: 2,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  text: {
    width: '80%',
    fontSize: 25,
    fontStyle: 'italic',
    color: '#28475e',
  },
  lineThrow: {
    textDecorationLine: 'line-through',
  },
});
