import React, { FC } from 'react';
import { ScrollView, View } from 'react-native';

import { useAppSelector } from '../../hooks/useAppSelector.ts';
import { RecentList } from './recentList.tsx';

export const Recent: FC = () => {
  const { recentList } = useAppSelector(state => state.list);

  return (
    <ScrollView>
      <View>
        {recentList?.map((item, uuid) => (
          <RecentList key={uuid} title={item.title} data={item.data} />
        ))}
      </View>
    </ScrollView>
  );
};
