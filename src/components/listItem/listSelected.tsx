import { faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import React, { FC, useRef } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import { useAppDispatch } from '../../hooks';
import { listActions } from '../../redux';

interface IProps {
  item: string;
}

export const ListSelected: FC<IProps> = ({ item }) => {
  const dispatch = useAppDispatch();
  const itemRef = useRef<Text>(null);
  const deleteItem = (itemForDel: string) => {
    dispatch(listActions.delFromSelected(itemForDel));
    dispatch(listActions.setTrigger());
  };

  const unMark = (item: string) => {
    dispatch(listActions.backToList(item));
    dispatch(listActions.setTrigger());
  };

  return (
    <View style={styles.wrapper}>
      <Text
        ref={itemRef}
        style={[styles.text, styles.lineThrow]}
        onPress={() => unMark(item)}
      >
        - {item}
      </Text>
      <TouchableOpacity
        style={{ width: '20%', alignItems: 'center' }}
        onPress={() => {
          deleteItem(item);
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
    opacity: 0.3,
  },
});
