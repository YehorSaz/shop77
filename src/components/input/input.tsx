import React, { FC, useEffect, useRef, useState } from 'react';
import { Keyboard, StyleSheet, TextInput, View } from 'react-native';

import { addId } from '../../helpers/addId.ts';
import { useAppDispatch } from '../../hooks';
import { useAppSelector } from '../../hooks/useAppSelector.ts';
import { useTitle } from '../../hooks/useTitle.ts';
import { listActions } from '../../redux';

export const Input: FC = () => {
  const { list } = useAppSelector(state => state.list);
  const dispatch = useAppDispatch();

  const [value, setValue] = useState<string>('');

  const inRef = useRef<TextInput>(null);
  //

  useEffect(() => {
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => {
        dispatch(listActions.setMicVisible(true));
        dispatch(listActions.setTrigger());
        inRef.current.clear();
        inRef.current.blur();
      },
    );

    return () => {
      keyboardDidHideListener.remove();
    };
  }, [dispatch]);

  useEffect(() => {
    if (inRef.current?.isFocused()) {
      dispatch(listActions.setMicVisible(false));
      dispatch(listActions.setTrigger());
    }
    return () => {
      dispatch(listActions.setMicVisible(true));
      dispatch(listActions.setTrigger());
    };
  }, [inRef.current?.isFocused()]);

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
        ref={inRef}
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
});
