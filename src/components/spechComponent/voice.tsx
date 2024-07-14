import { faMicrophone } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import Voice, { SpeechResultsEvent } from '@react-native-voice/voice';
import React, { FC, useEffect, useState } from 'react';
import { LogBox, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import { capitalizeString } from '../../helpers';
import { addId } from '../../helpers/addId.ts';
import { useAppDispatch } from '../../hooks';
import { useAppSelector } from '../../hooks/useAppSelector.ts';
import { useTitle } from '../../hooks/useTitle.ts';
import { listActions } from '../../redux';

LogBox.ignoreLogs(['new NativeEventEmitter']);

export const VoiceInput: FC = () => {
  const { list } = useAppSelector(state => state.list);
  const dispatch = useAppDispatch();

  const [results, setResults] = useState<string | undefined>('');
  const [isListening, setIsListening] = useState<boolean>(false);
  const [isMulti, setIsMulti] = useState<boolean>(false);

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
    }, 7000);
  };
  const _clearState = () => {
    setResults('');
  };

  return (
    <View style={styles.wrapper}>
      <View style={isListening ? styles.alert : styles.displayNone}>
        <Text style={styles.alertText}>Слухаю...</Text>
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
