import { faMicrophone } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import Voice, { SpeechResultsEvent } from '@react-native-voice/voice';
import React, { FC, useEffect, useState } from 'react';
import {
  Dimensions,
  LogBox,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import FastImage from 'react-native-fast-image';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';

import { capitalizeString } from '../../helpers';
import { addId } from '../../helpers/addId.ts';
import { useAppDispatch } from '../../hooks';
import { useAppSelector } from '../../hooks/useAppSelector.ts';
import { useTitle } from '../../hooks/useTitle.ts';
import { listActions } from '../../redux';
import micGif from './assets/micro_128.gif';

LogBox.ignoreLogs(['new NativeEventEmitter']);

export const VoiceInput: FC = () => {
  const { list } = useAppSelector(state => state.list);
  const dispatch = useAppDispatch();

  const [screenWidth, setScreenWidth] = useState(
    Dimensions.get('window').width,
  );
  const [screenHeight, setScreenHeight] = useState(
    Dimensions.get('window').height,
  );

  const [results, setResults] = useState<string | undefined>('');
  const [isListening, setIsListening] = useState<boolean>(false);
  const [isMulti, setIsMulti] = useState<boolean>(false);

  useEffect(() => {
    const updateWidth = () => {
      setScreenWidth(Dimensions.get('window').width);
      setScreenHeight(Dimensions.get('window').height);
    };
    const subscription = Dimensions.addEventListener('change', updateWidth);

    return () => {
      subscription.remove();
    };
  }, []);

  useEffect(() => {
    Voice.onSpeechStart = onSpeechStart;
    Voice.onSpeechResults = onSpeechResults;

    return () => {
      Voice.destroy().then(Voice.removeAllListeners);
    };
  }, []);

  useEffect(() => {
    if (results) {
      if (list === null) {
        const title = useTitle();
        dispatch(listActions.setTitle(title));
      }
      if (!isMulti) {
        const res = addId(capitalizeString(results));
        dispatch(listActions.setData(res));
        dispatch(listActions.setTrigger());
        setResults('');
      } else if (isMulti) {
        const resArr = results.split(' ');
        dispatch(listActions.addMultiLine(resArr));
        dispatch(listActions.setTrigger());
        setIsMulti(false);
        setResults('');
      }
    }
  }, [results]);

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

  const _startRecognizing = async () => {
    _clearState();
    setIsListening(true);
    try {
      await Voice.start('uk-UA');
    } catch (e) {
      console.error(e);
    }
  };

  const _stopRecognizing = async () => {
    try {
      await Voice.stop();
      setIsListening(false);
    } catch (e) {
      console.error(e);
    }
  };

  const _clearState = () => {
    setResults('');
    setIsListening(false);
  };

  const styles = createStyles(screenWidth, screenHeight);

  return (
    <View style={styles.wrapper}>
      <View style={isListening ? styles.alert : styles.displayNone}>
        <TouchableWithoutFeedback onPress={_stopRecognizing}>
          <FastImage style={styles.gif} source={micGif} />
        </TouchableWithoutFeedback>
      </View>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          width: '100%',
          paddingRight: 50,
        }}
      >
        <TouchableOpacity onPress={_startRecognizing}>
          <FontAwesomeIcon icon={faMicrophone} size={40} style={styles.mic} />
        </TouchableOpacity>
        <View style={{ justifyContent: 'space-between', height: '100%' }}>
          <TouchableOpacity
            onPress={() => {
              setIsMulti(true);
              _startRecognizing();
            }}
          >
            <FontAwesomeIcon icon={faMicrophone} size={30} style={styles.mic} />
          </TouchableOpacity>
          <Text style={{ color: '#35628c' }}>multi</Text>
        </View>
      </View>
    </View>
  );
};

const createStyles = (ww: number, wh: number) =>
  StyleSheet.create({
    wrapper: {
      width: '100%',
      height: '100%',
      display: 'flex',
      alignItems: 'center',
    },
    mic: {
      top: 6,
      opacity: 0.7,
    },
    alert: {
      alignSelf: 'flex-start',
      justifyContent: 'center',
      alignItems: 'center',
      width: ww,
      height: wh * 0.3,
      position: 'absolute',
      bottom: wh * 0.3,
      right: ww / 2 - ww / 2,
      opacity: 0.7,
    },
    alertTextWrapper: {
      width: '100%',
      minHeight: 40,
      paddingHorizontal: 5,
      marginTop: 30,
      borderRadius: 10,
      backgroundColor: 'rgba(205,217,238,0.9)',
    },
    displayNone: {
      display: 'none',
    },
    gif: {
      width: 200,
      height: 200,
    },
  });
