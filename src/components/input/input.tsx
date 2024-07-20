import React, { FC, useCallback, useEffect, useRef, useState } from 'react';
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

  const handleKeyboardHide = useCallback(() => {
    dispatch(listActions.setMicVisible(true));
    inRef.current?.clear();
    inRef.current?.blur();
  }, [dispatch]);

  useEffect(() => {
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      handleKeyboardHide,
    );

    return () => {
      keyboardDidHideListener.remove();
    };
  }, [handleKeyboardHide]);

  const handleFocus = useCallback(() => {
    dispatch(listActions.setMicVisible(false));
  }, [dispatch]);

  const handleBlur = useCallback(() => {
    dispatch(listActions.setMicVisible(true));
  }, [dispatch]);

  const saveList = useCallback(() => {
    if (value) {
      if (list === null) {
        const title = useTitle();
        dispatch(listActions.setTitle(title));
      }
      const purchase = addId(value);
      dispatch(listActions.setData(purchase));
    }
  }, [value, list, dispatch]);

  const handleSubmitEditing = useCallback(() => {
    saveList();
    setValue('');
  }, [saveList]);

  return (
    <View style={styles.wrapper}>
      <TextInput
        ref={inRef}
        style={styles.textInput}
        placeholder={'додати продукт...'}
        placeholderTextColor={'rgba(26,90,124,0.74)'}
        onChangeText={setValue}
        value={value}
        blurOnSubmit={false}
        onFocus={handleFocus}
        onBlur={handleBlur}
        onSubmitEditing={handleSubmitEditing}
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
