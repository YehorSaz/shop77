import React, {Dispatch, FC, SetStateAction, useEffect, useState} from 'react';
import {LogBox, StyleSheet, Text, TouchableOpacity, View} from 'react-native';

import Voice, {SpeechResultsEvent} from '@react-native-voice/voice';
import {storeData} from '../../helpers/storeData.ts';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faMicrophone} from '@fortawesome/free-solid-svg-icons';

LogBox.ignoreLogs(['new NativeEventEmitter']);

// interface IProps {
//   trigger: boolean;
//   setTrigger: Dispatch<SetStateAction<boolean>>;
// }
export const VoiceInput: FC = () => {
  const [results, setResults] = useState<string | undefined>('');
  const [isListening, setIsListening] = useState<boolean>(false);
  // useEffect(() => {
  //   if (results) {
  //     storeData(results, trigger, setTrigger);
  //   }
  // }, [results]);

  Voice.onSpeechResults = (e: SpeechResultsEvent) => {
    setIsListening(false);
    if (e.value !== undefined) {
      setResults(e.value[0]);
    } else {
      console.log('NOT HEAR ');
    }
  };

  const _startRecognizing = async () => {
    _clearState();
    _timeOut();
    setIsListening(true);
    try {
      await Voice.start('uk-UA');
    } catch (e) {
      console.error(e);
    }
  };

  const _timeOut = () => {
    setTimeout(() => {
      setIsListening(false);
    }, 5000);
  };
  const _clearState = () => {
    setResults('');
  };

  return (
    <View style={styles.wrapper}>
      <View style={isListening ? styles.alert : styles.displayNone}>
        <Text style={styles.alertText}>Слухаю...</Text>
      </View>
      <TouchableOpacity onPress={_startRecognizing}>
        <FontAwesomeIcon icon={faMicrophone} size={40} style={styles.mic} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
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
    justifyContent: 'center',
    alignItems: 'center',
    width: 300,
    height: 300,
    backgroundColor: 'rgba(205,217,238,0.79)',
    position: 'static',
    bottom: 500,
    right: 100,
    borderRadius: 20,
    shadowColor: 'rgba(50,92,138,0.79)',
    elevation: 20,
  },
  alertText: {
    fontSize: 30,
    fontWeight: '500',
    color: 'rgba(50,92,138,0.79)',
  },
  displayNone: {
    display: 'none',
  },
});
