import { faBars, faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { useNavigation } from '@react-navigation/native';
import React, { FC, useEffect, useState } from 'react';
import {
  Alert,
  Keyboard,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

import { useAppDispatch, useAppSelector } from '../../hooks';
import { listActions } from '../../redux';

export const Header: FC = () => {
  const { list, showNotification } = useAppSelector(state => state.list);

  const navigation = useNavigation<any>();

  const dispatch = useAppDispatch();

  const [listTitle, setListTitle] = useState<string>('');

  useEffect(() => {
    if (list?.title) {
      const date = list.title.slice(0, -3);
      setListTitle(date);
    }
  }, [list?.title]);

  const remove = () => {
    if (!showNotification) {
      dispatch(listActions.saveToRecentLists());
      setListTitle('');
    } else {
      Alert.alert('Перемістити список в архів?', '', [
        {
          text: 'ні',
        },
        {
          text: 'так',
          onPress: () => {
            dispatch(listActions.saveToRecentLists());
            setListTitle('');
          },
        },
      ]);
    }
  };
  const setDrawerVisibility = (isVisible: boolean) => {
    dispatch(listActions.isDrawerVisible(isVisible));
  };

  return (
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
  );
};

const styles = StyleSheet.create({
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
  shadow: {
    shadowColor: '#1c1a1a',
    elevation: 13,
    backgroundColor: '#FFFFFFFF',
  },
});
