import React, { FC, useEffect } from 'react';
import { ScrollView, View } from 'react-native';

import { useAppDispatch } from '../../hooks';
import { useAppSelector } from '../../hooks/useAppSelector.ts';
import { listActions } from '../../redux';
import { RecentList } from './recentList.tsx';

export const Recent: FC = () => {
  const dispatch = useAppDispatch();
  const { recentList } = useAppSelector(state => state.list);

  useEffect(() => {
    dispatch(listActions.isDrawerVisible(false));
  }, []);

  return (
    <ScrollView keyboardShouldPersistTaps={'handled'}>
      <View>
        {recentList?.map((item, index) => (
          <RecentList key={index} data={item} />
        ))}
      </View>
    </ScrollView>
  );
};
