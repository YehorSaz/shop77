import { faClipboardList, faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { useNavigation } from '@react-navigation/native';
import React, { FC, useEffect, useState } from 'react';
import {
  Alert,
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

import { Input, List, VoiceInput } from '../../components';
import { useAppDispatch } from '../../hooks';
import { useAppSelector } from '../../hooks/useAppSelector.ts';
import { listActions } from '../../redux';

export const MainScreen: FC = () => {
  const { navigate } = useNavigation<any>();
  const { title, trigger, isInputWrapperVisible } = useAppSelector(
    state => state.list,
  );
  const dispatch = useAppDispatch();

  const [listTitle, setListTitle] = useState<string>(null);

  useEffect(() => {
    const date = title.slice(0, -3);
    setListTitle(date);
  }, [trigger]);

  const remove = () => {
    Alert.alert('Попередження!', 'Видалити список?', [
      {
        text: 'ні',
      },
      {
        text: 'так',
        onPress: () => {
          dispatch(listActions.saveToRecentLists());
          dispatch(listActions.clearTitle());
          setListTitle('');
          dispatch(listActions.clearData());
          dispatch(listActions.setTrigger());
        },
      },
    ]);
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
              <Text style={styles.headerTitle}>
                {listTitle ? listTitle : 'Список'}
              </Text>
              {listTitle ? (
                <TouchableOpacity style={styles.clear} onPress={remove}>
                  <FontAwesomeIcon
                    size={22}
                    icon={faTrashCan}
                    color={'rgba(128,51,51,0.75)'}
                  />
                </TouchableOpacity>
              ) : null}
              <Text
                onPress={() => navigate('recent')}
                style={{
                  textAlignVertical: 'center',
                  textAlign: 'center',
                  paddingRight: 10,
                }}
              >
                <FontAwesomeIcon
                  size={32}
                  icon={faClipboardList}
                  color={'rgba(136,215,243,0.86)'}
                />
              </Text>
            </LinearGradient>
          </View>

          <List />
          <View
            style={
              isInputWrapperVisible ? styles.inputWrapper : { display: 'none' }
            }
          >
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
    width: '50%',
    color: 'white',
    textAlign: 'left',
    textAlignVertical: 'center',
    fontSize: 20,
    fontWeight: '600',
  },
  clear: {
    justifyContent: 'center',
  },
  linearGradient: {
    flex: 1,
    justifyContent: 'space-between',
    flexDirection: 'row',
    paddingHorizontal: 10,
  },
  inputWrapper: {
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
    marginRight: '5%',
  },
  micButton: {
    width: '44%',
    height: '100%',
    justifyContent: 'center',
    marginLeft: '5%',
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
