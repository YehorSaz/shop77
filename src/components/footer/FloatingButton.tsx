import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { faMicrophone, faPencilAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import Voice, { SpeechResultsEvent } from '@react-native-voice/voice';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import {
  Dimensions,
  Keyboard,
  LogBox,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import FastImage from 'react-native-fast-image';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import Animated, {
  interpolate,
  SharedValue,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withSpring,
  withTiming,
  ZoomIn,
} from 'react-native-reanimated';
import { DefaultStyle } from 'react-native-reanimated/lib/typescript/hook/commonTypes';

import { addId, capitalizeString } from '../../helpers';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { listActions } from '../../redux';
import micGif from './assets/micro_128.gif';

LogBox.ignoreLogs(['new NativeEventEmitter']);

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

const SPRING_CONFIG = {
  duration: 1200,
  overshootClamping: true,
  dampingRatio: 0.8,
};

const OFFSET = 100;

type FloatingTypes = {
  isExpanded: SharedValue<boolean>;
  index: number;
  iconName: IconProp;
  onPress?: () => void;
  description?: string;
};

const FloatingActionButton = ({
  isExpanded,
  index,
  iconName,
  onPress,
  description,
}: FloatingTypes) => {
  const animatedStyles = useAnimatedStyle((): DefaultStyle => {
    const moveValue = isExpanded.value ? OFFSET * index : 0;
    const translateValue = withSpring(-moveValue, SPRING_CONFIG);
    const delay = index * 50;

    const scaleValue = isExpanded.value ? 1 : 0;

    return {
      transform: [
        { translateX: translateValue },
        {
          scale: withDelay(delay, withTiming(scaleValue)),
        },
      ],
    };
  });

  return (
    <AnimatedPressable
      style={[animatedStyles, styles.shadow, styles.button]}
      onPress={onPress}
    >
      {!description ? (
        <Animated.Text style={styles.content}>
          <FontAwesomeIcon icon={iconName} size={40} style={styles.micIcon} />
        </Animated.Text>
      ) : (
        <Animated.Text style={styles.withDescription}>
          <FontAwesomeIcon icon={iconName} size={30} style={styles.micIcon} />
          {'\n'}
          <Text>{description}</Text>
        </Animated.Text>
      )}
    </AnimatedPressable>
  );
};

export const FloatingButton = () => {
  const [dimensions, setDimensions] = useState(Dimensions.get('window'));
  const { width: screenWidth, height: screenHeight } = dimensions;

  const { isInputFieldVisible } = useAppSelector(state => state.list);

  const dispatch = useAppDispatch();
  const isExpanded = useSharedValue(false);

  const [showInput, setShowInput] = useState(false);
  const [value, setValue] = useState<string>('');
  const [results, setResults] = useState<string | undefined>('');
  const [isMulti, setIsMulti] = useState<boolean>(false);
  const [isListening, setIsListening] = useState<boolean>(false);

  const inputRef = useRef<TextInput>();

  const handleKeyboardHide = useCallback(() => {
    setShowInput(false);
    setValue('');
    inputRef.current?.clear();
    inputRef.current?.blur();
  }, []);

  useEffect(() => {
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      handleKeyboardHide,
    );
    return () => keyboardDidHideListener.remove();
  }, [handleKeyboardHide]);

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

  const plusIconStyle = useAnimatedStyle((): DefaultStyle => {
    const moveValue = interpolate(Number(isExpanded.value), [0, 1], [0, 2]);
    const translateValue = withTiming(moveValue);
    const rotateValue = isExpanded.value ? '45deg' : '0deg';

    return {
      transform: [
        { translateX: translateValue },
        { rotate: withTiming(rotateValue) },
      ],
    };
  });

  const handlePress = () => {
    isExpanded.value = !isExpanded.value;
    setShowInput(false);
  };

  const savePurchaseToList = () => {
    if (value) {
      const purchase = addId(value);
      dispatch(listActions.addPurchase(purchase));
    }
  };

  const handlePencilPress = () => {
    // setIsInputAppeared(true);
    dispatch(listActions.isInputFieldVisible(false));
    setShowInput(true);
    setTimeout(() => {
      inputRef.current?.focus();
    }, 10);
  };

  const handleSubmit = () => {
    savePurchaseToList();
    setValue('');
  };

  const alertStyles = createStyles(screenWidth, screenHeight);

  return (
    <View style={styles.mainContainer}>
      <View style={isListening ? alertStyles.alert : alertStyles.displayNone}>
        <TouchableWithoutFeedback onPress={stopRecognizing}>
          <FastImage style={alertStyles.gif} source={micGif} />
        </TouchableWithoutFeedback>
      </View>
      {showInput && (
        <Animated.View
          style={[styles.inputWrapper, styles.inputShadow]}
          entering={ZoomIn.duration(300)}
        >
          <TextInput
            ref={inputRef}
            style={styles.textInput}
            autoCorrect={false}
            placeholder={'додати продукт...'}
            placeholderTextColor={'rgba(26,90,124,0.74)'}
            onChangeText={text => setValue(text)}
            value={value || ''}
            blurOnSubmit={false}
            onSubmitEditing={handleSubmit}
          />
        </Animated.View>
      )}
      {isInputFieldVisible ? (
        <View style={styles.buttonContainer}>
          <AnimatedPressable
            onPress={handlePress}
            style={[styles.shadow, mainButtonStyles.button]}
          >
            <Animated.Text style={[plusIconStyle, mainButtonStyles.content]}>
              +
            </Animated.Text>
          </AnimatedPressable>
          <FloatingActionButton
            isExpanded={isExpanded}
            index={1}
            iconName={faMicrophone}
            description={'multi'}
            onPress={() => {
              setIsMulti(true);
              startRecognizing();
            }}
          />
          <FloatingActionButton
            isExpanded={isExpanded}
            index={2}
            iconName={faMicrophone}
            onPress={startRecognizing}
          />
          <FloatingActionButton
            isExpanded={isExpanded}
            index={3}
            iconName={faPencilAlt}
            onPress={handlePencilPress}
          />
        </View>
      ) : null}
    </View>
  );
};

const createStyles = (width: number, height: number) =>
  StyleSheet.create({
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

const mainButtonStyles = StyleSheet.create({
  button: {
    zIndex: 1,
    height: 70,
    width: 70,
    borderRadius: 100,
    backgroundColor: '#5f88cc',
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    fontSize: 32,
    color: '#f8f9ff',
  },
});

const styles = StyleSheet.create({
  mainContainer: {
    position: 'relative',
    width: '100%',
    height: 1,
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    backgroundColor: 'rgba(136,215,243,1)',
  },
  button: {
    width: 70,
    height: 70,
    backgroundColor: 'rgba(136,215,243,1)',
    position: 'absolute',
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: -2,
  },
  buttonContainer: {
    position: 'absolute',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    right: 20,
    bottom: 20,
  },
  shadow: {
    elevation: 16,
    shadowColor: '#1c1a1a',
    backgroundColor: 'rgba(136,215,243,1)',
  },
  inputShadow: {
    elevation: 16,
    shadowColor: '#1c1a1a',
    backgroundColor: 'rgb(210,229,243)',
  },
  content: {
    color: '#35628c',
    fontWeight: '500',
    fontSize: 36,
  },
  withDescription: {
    width: '100%',
    textAlign: 'center',
    color: '#35628c',
    fontWeight: '500',
    fontSize: 16,
  },
  micIcon: {
    opacity: 0.7,
  },
  inputWrapper: {
    width: '95%',
    alignSelf: 'center',
    minHeight: 50,
    alignItems: 'center',
    justifyContent: 'flex-start',
    flexDirection: 'row',
    bottom: 15,
    borderRadius: 15,
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
