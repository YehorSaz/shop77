import React, { FC } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';

import { useAppSelector } from '../../hooks/useAppSelector.ts';
import { ListItem } from '../listItem';
import { ListSelected } from '../listItem/listSelected.tsx';

export const List: FC = () => {
  const { list, selected } = useAppSelector(state => state.list);

  return (
    <ScrollView style={{ width: '100%', paddingHorizontal: 10 }}>
      <View style={styles.wrapper}>
        {list?.map((item, index) => <ListItem item={item} key={index} />)}
      </View>
      <View style={styles.wrapper}>
        {selected?.map((item, index) => (
          <ListSelected item={item} key={index} />
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    width: '100%',
  },
});
