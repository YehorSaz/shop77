import React, { FC, useState } from 'react';
import { StyleSheet, TextInput, View } from 'react-native';
import { addId } from '../../helpers/addId.ts';

import { useAppDispatch } from '../../hooks';
import { useAppSelector } from '../../hooks/useAppSelector.ts';
import { useTitle } from '../../hooks/useTitle.ts';
import { listActions } from '../../redux';

export const Input: FC = () => {
  const { list } = useAppSelector(state => state.list);
  const dispatch = useAppDispatch();

  const [value, setValue] = useState<string>('');

  const saveList = () => {
    if (value) {
      if (list === null) {
        const title = useTitle();
        dispatch(listActions.setTitle(title));
      }
      const purchase = addId(value);
      dispatch(listActions.setData(purchase));
      dispatch(listActions.setTrigger());
    }
    return;
  };

  return (
    <View style={styles.wrapper}>
      <TextInput
        style={styles.textInput}
        placeholder={'додати продукт...'}
        placeholderTextColor={'rgba(26,90,124,0.74)'}
        onChangeText={text => setValue(text)}
        value={value}
        blurOnSubmit={false}
        onSubmitEditing={() => {
          saveList();
          setValue('');
        }}
      />
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
