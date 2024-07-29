import { faCommentDots } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { useNavigation } from '@react-navigation/native';
import React, { FC, useState } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { Button, Dialog, Portal, Text } from 'react-native-paper';

import { useAppDispatch, useAppSelector } from '../../hooks';
import { IList } from '../../interfaces';
import { listActions } from '../../redux';
import { RouterNames } from '../../routerNames';
import { RecentNavigationProps } from '../../types/navTypes.ts';

interface IProps {
  data: IList;
}

export const RecentList: FC<IProps> = ({ data }) => {
  const { showNotification } = useAppSelector(state => state.list);

  const dispatch = useAppDispatch();

  const { navigate } = useNavigation<RecentNavigationProps>();
  const [isDialog, setIsDialog] = useState(false);
  const [isRestoreDialog, setIsRestoreDialog] = useState(false);

  const removeItem = (item: string) => {
    if (!showNotification) {
      dispatch(listActions.removeRecentItem(item));
    } else {
      setIsDialog(true);
    }
  };

  const delItem = (item: string) => {
    dispatch(listActions.removeRecentItem(item));
    hideDialog();
  };

  const restoreItem = (item: string) => {
    dispatch(listActions.saveToRecentLists());
    if (!showNotification) {
      dispatch(listActions.restoreRecent(item));
      navigate(RouterNames.LIST);
    } else {
      setIsRestoreDialog(true);
    }
  };
  const restoreList = (item: string) => {
    dispatch(listActions.restoreRecent(item));
    hideRestoreDialog();
    navigate(RouterNames.LIST);
  };

  const hideDialog = () => setIsDialog(false);
  const hideRestoreDialog = () => setIsRestoreDialog(false);

  return (
    <View style={styles.wrapper}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>{data.title}</Text>
        <TouchableOpacity style={{ alignSelf: 'flex-end' }}>
          <Text
            onPress={() => removeItem(data.title)}
            style={{
              textAlignVertical: 'bottom',
              fontStyle: 'italic',
              fontSize: 18,
              color: '#cb4848',
            }}
          >
            видалити
          </Text>
        </TouchableOpacity>
      </View>
      <View style={styles.items}>
        {data.data.map(item => (
          <View
            style={{
              borderBottomWidth: 0.3,
              borderBottomColor: 'rgba(53,98,140,0.35)',
            }}
            key={item.id}
          >
            <Text style={{ fontSize: 18, color: '#35628c' }}>{item.item}</Text>
            {item.comment && (
              <View style={{ flexDirection: 'row' }}>
                <FontAwesomeIcon
                  size={12}
                  icon={faCommentDots}
                  color={'rgba(128,51,51,0.75)'}
                />
                <Text
                  style={{
                    left: 5,
                    fontStyle: 'italic',
                    color: '#35628c',
                    fontSize: 16,
                  }}
                >
                  {item.comment}
                </Text>
              </View>
            )}
          </View>
        ))}
      </View>
      <View style={{ paddingHorizontal: 20, height: 40 }}>
        <TouchableOpacity style={{ alignSelf: 'flex-end' }}>
          <Text
            onPress={() => restoreItem(data.title)}
            style={{
              textAlignVertical: 'bottom',
              fontStyle: 'italic',
              fontSize: 18,
              color: '#429779',
            }}
          >
            відновити
          </Text>
        </TouchableOpacity>
      </View>
      <Portal>
        <Dialog visible={isDialog} onDismiss={hideDialog}>
          <Dialog.Title>Попередження</Dialog.Title>
          <Dialog.Content>
            <Text variant="bodyMedium">Видалити список на завжди?</Text>
            <Text variant="bodyLarge">{data.title}</Text>
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={hideDialog}>Ні</Button>
            <Button onPress={() => delItem(data.title)}>Так</Button>
          </Dialog.Actions>
        </Dialog>
        <Dialog visible={isRestoreDialog} onDismiss={hideRestoreDialog}>
          <Dialog.Title>Попередження</Dialog.Title>
          <Dialog.Content>
            <Text variant="bodyMedium">Відновити список?</Text>
            <Text variant="bodyLarge">{data.title}</Text>
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={hideRestoreDialog}>Ні</Button>
            <Button onPress={() => restoreList(data.title)}>Так</Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    width: '100%',
    marginBottom: 5,
    shadowColor: '#1c1a1a',
    elevation: 8,
    backgroundColor: '#FFFFFFFF',
  },
  titleContainer: {
    width: '100%',
    height: 40,
    paddingTop: 5,
    paddingHorizontal: 20,
    marginBottom: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  title: {
    textAlignVertical: 'bottom',
    textDecorationLine: 'underline',
    fontSize: 20,
    fontWeight: '600',
    color: '#35628c',
  },
  items: {
    justifyContent: 'space-between',
    paddingHorizontal: 10,
  },
});
