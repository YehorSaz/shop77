import React, { FC } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';

import { useAppSelector } from '../../hooks';
import { ListItem } from '../listItem';
import { ListSelected } from '../listItem/listSelected.tsx';

export const List: FC = () => {
  const { list, selected } = useAppSelector(state => state.list);

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
