import React, { FC } from 'react';
import { ScrollView, View } from 'react-native';

import { useAppSelector } from '../../hooks';
import { RecentList } from './recentList.tsx';

export const Recent: FC = () => {
  const { recentList } = useAppSelector(state => state.list);
  const reversedRecent = recentList ? [...recentList].reverse() : null;

  return (
    <ScrollView keyboardShouldPersistTaps={'handled'}>
      <View>
        {reversedRecent?.map((item, index) => (
          <RecentList key={index} data={item} />
        ))}
      </View>
    </ScrollView>
  );
};
