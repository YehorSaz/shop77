import { faBars, faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import React, { FC, useEffect, useState } from 'react';
import {
  Alert,
  ImageBackground,
  Keyboard,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

import { Input, List } from '../../components';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { listActions } from '../../redux';

export const MainScreen: FC = ({ navigation }: any) => {
  const { title, showNotification } = useAppSelector(state => state.list);

  const dispatch = useAppDispatch();

  const [listTitle, setListTitle] = useState<string>('');
  const [isInputVisible, setIsInputVisible] = useState<boolean>(true);

  useEffect(() => {
    const date = title.slice(0, -3);
    setListTitle(date);
  }, [title]);

  const remove = () => {
    if (!showNotification) {
      dispatch(listActions.saveToRecentLists());
      dispatch(listActions.clearTitle());
      setListTitle('');
      dispatch(listActions.clearData());
      dispatch(listActions.isDrawerVisible(true));
    } else {
      Alert.alert('Перемістити список в архів?', '', [
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
            dispatch(listActions.isDrawerVisible(true));
          },
        },
      ]);
    }
  };
  const setDrawerVisibility = (isVisible: boolean) => {
    dispatch(listActions.isDrawerVisible(isVisible));
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
                onPress={() => {
                  Keyboard.dismiss();
                  setDrawerVisibility(true);
                  navigation.toggleDrawer();
                }}
                style={{
                  textAlignVertical: 'center',
                  textAlign: 'center',
                }}
              >
                <FontAwesomeIcon
                  size={32}
                  icon={faBars}
                  color={'rgba(136,215,243,0.86)'}
                />
              </Text>
            </LinearGradient>
          </View>

          <List setIsInputVisible={setIsInputVisible} />
          <View
            style={isInputVisible ? styles.inputWrapper : { display: 'none' }}
          >
            <View style={styles.inputField}>
              <Input setIsInputVisible={setIsInputVisible} />
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
    fontSize: 22,
    fontWeight: '600',
  },
  clear: {
    justifyContent: 'center',
  },
  linearGradient: {
    flex: 1,
    justifyContent: 'space-between',
    flexDirection: 'row',
    paddingHorizontal: 20,
  },
  inputWrapper: {
    width: '100%',
    height: '10%',
    minHeight: 70,
    alignItems: 'center',
    justifyContent: 'flex-start',
    flexDirection: 'row',
    backgroundColor: 'rgb(174,224,246)',
    // marginBottom: 10,
  },
  inputField: {
    width: '42.5%',
    height: '100%',
    justifyContent: 'flex-start',
    // marginRight: '5%',
  },
  micButton: {
    width: '50%',
    height: '100%',
    justifyContent: 'center',
    // marginLeft: '5%',
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
