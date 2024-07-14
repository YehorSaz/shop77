import React, { FC } from 'react';
import { ScrollView, View } from 'react-native';

import { useAppSelector } from '../../hooks/useAppSelector.ts';
import { RecentList } from './recentList.tsx';

export const Recent: FC = () => {
  const { recentList } = useAppSelector(state => state.list);
  return (
    <ScrollView>
      <View>
        {recentList?.map((item, index) => (
          <RecentList key={index} data={item} />
        ))}
      </View>
    </ScrollView>
  );
};
