import React, { FC, useEffect } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';

import { useAppDispatch, useAppSelector } from '../../hooks';
import { listActions } from '../../redux';
import { ListItem } from '../listItem';
import { ListSelected } from '../listItem/listSelected.tsx';

export const List: FC = () => {
  const dispatch = useAppDispatch();
  const { list, selected, isDrawerVisible } = useAppSelector(
    state => state.list,
  );

  useEffect(() => {
    dispatch(listActions.isDrawerVisible(false));
  }, [isDrawerVisible]);

  return (
    <ScrollView style={styles.wrapper} keyboardShouldPersistTaps={'handled'}>
      <View>
        {list?.data?.map(item => <ListItem purchase={item} key={item.id} />)}
      </View>
      <View style={styles.selected}>
        {selected?.map(item => <ListSelected purchase={item} key={item.id} />)}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    width: '100%',
    paddingHorizontal: 10,
  },
  selected: {
    marginTop: 10,
  },
});
