import React, { Dispatch, FC, SetStateAction, useEffect } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';

import { useAppDispatch, useAppSelector } from '../../hooks';
import { listActions } from '../../redux';
import { ListItem } from '../listItem';
import { ListSelected } from '../listItem/listSelected.tsx';

interface IProps {
  setIsInputVisible: Dispatch<SetStateAction<boolean>>;
}

export const List: FC<IProps> = ({ setIsInputVisible }) => {
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
        {list?.map(item => (
          <ListItem
            purchase={item}
            key={item.id}
            setIsInputVisible={setIsInputVisible}
          />
        ))}
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
