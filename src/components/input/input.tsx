import { faArrowUpFromBracket } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import React, { FC, useRef, useState } from 'react';
import {
  Keyboard,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

import { useAppDispatch } from '../../hooks';
import { useAppSelector } from '../../hooks/useAppSelector.ts';
import { useTitle } from '../../hooks/useTitle.ts';
import { listActions } from '../../redux';

export const Input: FC = () => {
  const { list } = useAppSelector(state => state.list);
  const dispatch = useAppDispatch();

  const inputRef = useRef<TextInput>(null);

  const [value, setValue] = useState<string>('');

  const saveList = (item: string) => {
    if (item) {
      if (list === null) {
        const title = useTitle();
        dispatch(listActions.setTitle(title));
      }
      dispatch(listActions.setData(item));
      dispatch(listActions.setTrigger());
    }
    return;
  };

  return (
    <View style={styles.wrapper}>
      <TextInput
        style={styles.textInput}
        ref={inputRef}
        placeholder={'додати продукт...'}
        placeholderTextColor={'rgba(26,90,124,0.74)'}
        onChangeText={text => setValue(text)}
        value={value}
        onSubmitEditing={() => {
          saveList(value);
          inputRef.current?.clear();
          Keyboard.dismiss();
          setValue('');
        }}
      />

      <TouchableOpacity
        style={value ? styles.arrow : styles.displayNone}
        onPress={() => {
          saveList(value);
          inputRef.current?.clear();
          setValue('');
        }}
      >
        <FontAwesomeIcon
          icon={faArrowUpFromBracket}
          size={30}
          style={{ opacity: 0.7 }}
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  textInput: {
    width: '100%',
    height: '100%',
    fontSize: 20,
    paddingLeft: 15,
    color: 'rgba(26,90,124,0.99)',
    fontWeight: 'bold',
  },
  clear: {
    width: 'auto',
  },
  arrow: {
    display: 'flex',
  },
  displayNone: {
    display: 'none',
  },
});
