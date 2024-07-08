import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { FC, useEffect, useState } from 'react';
import {
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

import { Input, List, VoiceInput } from '../../components';
import { useAppDispatch } from "../../hooks";
import { listActions } from "../../redux";
import { useAppSelector } from "../../hooks/useAppSelector.ts";
import { useTitle } from "../../hooks/useTitle.ts";

export const MainScreen: FC = () => {
  const dispatch = useAppDispatch();
  // const { trigger } = useAppSelector(state => state.list);
  // const [trigger, setTrigger] = useState<boolean>(false);
  const [title, setTitle] = useState<string>('');
  const [isClean, setIsClean] = useState<boolean>(false);

  const getTitle = () => {

    const date = useTitle();
    if (date !== null) {
      setTitle(`Список: ${date}`);
      return;
    }
  };
  useEffect(() => {
    getTitle();
  }, []);

  const remove = async () => {
    dispatch(listActions.clearTitle());
    dispatch(listActions.clearData());
    dispatch(listActions.setTrigger());
  };

  return (
    <View style={styles.wrapper}>
      <ImageBackground
        source={require('./assets/img.png')}
        style={{ width: '100%', height: '100%' }}
        resizeMode={'repeat'}
      >
        <View style={styles.filter}>
          <View style={styles.header}>
            <LinearGradient
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              colors={['#4c9f89', '#537b91', '#213780']}
              style={[styles.linearGradient, styles.shadow]}
            >
              <Text style={styles.headerTitle}>{title ? title : 'Список'}</Text>
              <TouchableOpacity style={styles.clear} onPress={remove}>
                <Text
                  style={{
                    fontSize: 20,
                    color: 'red',
                    fontWeight: 'bold',
                    opacity: 0.6,
                    textAlign: 'center',
                  }}
                >
                  {!title ? 'видалити' : ''}
                </Text>
              </TouchableOpacity>
            </LinearGradient>
          </View>

          {/*<Example trigger={trigger} setTrigger={setTrigger} isClean={isClean}/>*/}
          <List />
          <View style={styles.inputWrapper}>
            <View style={styles.inputField}>
              <Input />
            </View>

            <View style={styles.micButton}>
              <VoiceInput />
            </View>
          </View>
        </View>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    width: '100%',
    height: 'auto',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'column',
    backgroundColor: 'white',
  },
  filter: {
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(174,207,246,0.79)',
  },
  header: {
    width: '100%',
    height: 70,
    marginBottom: 10,
  },
  headerTitle: {
    height: '100%',
    width: '70%',
    color: 'white',
    textAlign: 'center',
    textAlignVertical: 'center',
    fontSize: 20,
    fontWeight: '600',
  },
  clear: {
    justifyContent: 'center',
  },
  linearGradient: {
    flex: 1,
    justifyContent: 'center',
    flexDirection: 'row',
  },
  inputWrapper: {
    // flex: 1,
    width: '100%',
    height: '7%',
    minHeight: 50,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    backgroundColor: 'rgba(174,207,246,0.79)',
    marginBottom: 10,
  },
  inputField: {
    width: '44%',
    height: '100%',
    justifyContent: 'center',
    marginRight: '2%',
  },
  micButton: {
    width: '44%',
    height: '100%',
    justifyContent: 'center',
    marginLeft: '2%',
  },
  hide: {
    display: 'none',
  },
  shadow: {
    shadowColor: '#1c1a1a',
    elevation: 13,
    backgroundColor: '#FFFFFFFF',
  },
  radius: {
    borderRadius: 8,
  },
});
