import React, { FC, useEffect, useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';

import { useAppSelector } from '../../hooks/useAppSelector.ts';
import { ListItem } from '../listItem';

export const List: FC = () => {
  const { list, trigger } = useAppSelector(state => state.list);

  const [data, setData] = useState<string[]>([]);
  useEffect(() => {
    if (list) {
      setData(list);
    }
  }, [trigger]);

  return (
    <ScrollView style={{ width: '100%', paddingHorizontal: 10 }}>
      <View style={styles.wrapper}>
        {data.map((item, uuid) => (
          <ListItem item={item} key={uuid} />
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
