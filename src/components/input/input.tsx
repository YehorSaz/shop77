import { faMicrophone, faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import Voice, { SpeechResultsEvent } from '@react-native-voice/voice';
import React, { FC, useCallback, useEffect, useRef, useState } from 'react';
import {
  Dimensions,
  Keyboard,
  LogBox,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import FastImage from 'react-native-fast-image';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';

import { addId, capitalizeString } from '../../helpers';
import { useAppDispatch } from '../../hooks';
import { listActions } from '../../redux';
import micGif from './assets/micro_128.gif';

LogBox.ignoreLogs(['new NativeEventEmitter']);

export const Input: FC = () => {
  const [dimensions, setDimensions] = useState(Dimensions.get('window'));
  const { width: screenWidth, height: screenHeight } = dimensions;

  const dispatch = useAppDispatch();

  const [value, setValue] = useState<string>('');
  const [isPlus, setIsPlus] = useState<boolean>(true);
  const [results, setResults] = useState<string | undefined>('');
  const [isListening, setIsListening] = useState<boolean>(false);
  const [isMulti, setIsMulti] = useState<boolean>(false);
  const inRef = useRef<TextInput>(null);

  useEffect(() => {
    const updateDimensions = () => {
      setDimensions(Dimensions.get('window'));
    };
    const subscription = Dimensions.addEventListener(
      'change',
      updateDimensions,
    );
    return () => subscription.remove();
  }, []);

  useEffect(() => {
    if (results) {
      const res = addId(capitalizeString(results));
      if (!isMulti) {
        dispatch(listActions.addPurchase(res));
      } else {
        const resArr = results.split(' ');
        dispatch(listActions.addMultiLine(resArr));
        setIsMulti(false);
      }
      dispatch(listActions.setTrigger());
      setResults('');
    }
  }, [results]);

  useEffect(() => {
    Voice.onSpeechStart = onSpeechStart;
    Voice.onSpeechResults = onSpeechResults;
    return () => {
      Voice.destroy().then(Voice.removeAllListeners);
    };
  }, []);

  const handlePlusPress = useCallback(() => {
    setIsPlus(false);
    setTimeout(() => {
      inRef.current?.focus();
    }, 50);
  }, []);

  const handleKeyboardHide = useCallback(() => {
    setIsPlus(true);
    setValue('');
    inRef.current?.clear();
    inRef.current?.blur();
  }, []);

  useEffect(() => {
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      handleKeyboardHide,
    );
    return () => keyboardDidHideListener.remove();
  }, [handleKeyboardHide]);

  const onSpeechResults = (e: SpeechResultsEvent) => {
    setIsListening(false);
    if (e.value !== undefined) {
      setResults(e.value[0]);
    } else {
      console.log('NOT HEAR');
    }
  };

  const onSpeechStart = () => {
    setIsListening(true);
  };

  const startRecognizing = async () => {
    Keyboard.dismiss();
    clearState();
    setIsListening(true);
    try {
      await Voice.start('uk-UA');
    } catch (e) {
      console.error(e);
    }
  };

  const stopRecognizing = async () => {
    try {
      await Voice.stop();
      setIsListening(false);
    } catch (e) {
      console.error(e);
    }
  };

  const clearState = () => {
    setResults('');
    setIsListening(false);
  };

  const handleFocus = useCallback(() => {
    setIsPlus(false);
  }, []);

  const handleBlur = () => {
    dispatch(listActions.isInputFieldVisible(false));
  };

  const saveList = () => {
    if (value) {
      const purchase = addId(value);
      dispatch(listActions.addPurchase(purchase));
    }
  };

  const handleSubmitEditing = useCallback(() => {
    saveList();
    setValue('');
    setTimeout(() => {
      inRef.current?.focus();
    }, 50);
  }, [saveList]);

  const styles = createStyles(screenWidth, screenHeight);

  return (
    <View style={styles.wrapper}>
      <View style={isListening ? styles.alert : styles.displayNone}>
        <TouchableWithoutFeedback onPress={stopRecognizing}>
          <FastImage style={styles.gif} source={micGif} />
        </TouchableWithoutFeedback>
      </View>
      {isPlus ? (
        <View style={styles.plusButton}>
          <TouchableOpacity onPress={handlePlusPress}>
            <FontAwesomeIcon icon={faPlus} size={50} style={{ opacity: 0.7 }} />
          </TouchableOpacity>
        </View>
      ) : (
        <View style={styles.textInputWrapper}>
          <TextInput
            ref={inRef}
            style={styles.textInput}
            placeholder={'додати продукт...'}
            placeholderTextColor={'rgba(26,90,124,0.74)'}
            onChangeText={text => setValue(text)}
            value={value || ''}
            blurOnSubmit={false}
            onFocus={handleFocus}
            onBlur={handleBlur}
            onSubmitEditing={handleSubmitEditing}
          />
        </View>
      )}
      <View style={isPlus ? styles.micButton : styles.displayNone}>
        <TouchableOpacity onPress={startRecognizing}>
          <FontAwesomeIcon
            icon={faMicrophone}
            size={60}
            style={styles.micIcon}
          />
        </TouchableOpacity>
      </View>
      <View style={isPlus ? styles.multiMicButton : styles.displayNone}>
        <TouchableOpacity
          onPress={() => {
            setIsMulti(true);
            startRecognizing();
          }}
        >
          <FontAwesomeIcon
            icon={faMicrophone}
            size={40}
            style={styles.micIcon}
          />
        </TouchableOpacity>
        <Text style={{ color: '#35628c' }}>multi</Text>
      </View>
    </View>
  );
};

const createStyles = (width: number, height: number) =>
  StyleSheet.create({
    wrapper: {
      flex: 1,
      width: width,
      flexDirection: 'row',
    },
    textInputWrapper: {
      width: '50%',
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
    plusButton: {
      width: width / 3,
      height: '100%',
      justifyContent: 'center',
      alignItems: 'center',
    },
    micButton: {
      justifyContent: 'center',
      alignItems: 'center',
      width: width / 3,
      height: '100%',
    },
    multiMicButton: {
      flexDirection: 'column',
      justifyContent: 'space-between',
      alignItems: 'center',
      height: '100%',
      width: width / 3,
      paddingVertical: 10,
    },
    micIcon: {
      opacity: 0.7,
    },
    alert: {
      alignSelf: 'flex-start',
      justifyContent: 'center',
      alignItems: 'center',
      width: width,
      height: height * 0.3,
      position: 'absolute',
      bottom: height * 0.3,
      right: width / 2 - width / 2,
      opacity: 0.7,
    },
    displayNone: {
      display: 'none',
    },
    gif: {
      width: 200,
      height: 200,
    },
  });
