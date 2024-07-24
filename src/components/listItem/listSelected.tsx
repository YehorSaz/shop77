import { faCheck, faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import React, { FC, useCallback, useRef, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Animated, { SlideInRight } from 'react-native-reanimated';

import { useAppDispatch, useDeleteAnimation } from '../../hooks';
import { IPurchase } from '../../interfaces';
import { listActions } from '../../redux';

interface IProps {
  purchase: IPurchase;
}

export const ListSelected: FC<IProps> = ({ purchase }) => {
  const dispatch = useAppDispatch();
  const itemRef = useRef<Text>(null);
  const [isDeleting, setIsDeleting] = useState<boolean>(false);

  const deleteItem = useCallback(() => {
    dispatch(listActions.delFromSelected(purchase));
  }, [dispatch, purchase]);

  const unMark = () => {
    dispatch(listActions.backToList(purchase));
  };

  const handleDeletePress = () => {
    setIsDeleting(true);
  };

  const animatedStyle = useDeleteAnimation(isDeleting, deleteItem);

  return (
    <Animated.View
      entering={SlideInRight.duration(200)}
      style={[styles.wrapper, animatedStyle]}
    >
      <View style={{ width: '80%' }}>
        <Text
          ref={itemRef}
          style={[styles.text, styles.opacity]}
          onPress={unMark}
        >
          <View style={styles.check}>
            <FontAwesomeIcon
              size={22}
              icon={faCheck}
              color={'rgba(19,68,89,0.75)'}
            />
          </View>
          {purchase.item}
        </Text>
        {purchase.comment && (
          <Text style={{ color: '#35628c', fontSize: 16, fontStyle: 'italic' }}>
            {purchase.comment}
          </Text>
        )}
      </View>
      <TouchableOpacity
        style={{ width: '20%', alignItems: 'center' }}
        onPress={handleDeletePress}
      >
        <FontAwesomeIcon
          size={22}
          icon={faTrashCan}
          color={'rgba(128,51,51,0.75)'}
        />
      </TouchableOpacity>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    elevation: 16,
    shadowColor: '#1c1a1a',
    backgroundColor: 'rgba(91,185,241,0.86)',
    marginVertical: 2,
    paddingHorizontal: 20,
    borderRadius: 5,
    opacity: 0.8,
  },
  text: {
    width: '80%',
    fontSize: 25,
    fontStyle: 'italic',
    color: '#28475e',
  },
  opacity: {
    opacity: 0.7,
  },
  check: {
    right: 5,
    marginRight: 5,
  },
});
