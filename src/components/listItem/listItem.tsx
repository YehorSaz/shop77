import {
  faCommentDots,
  faTrashCan,
  faXmark,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import React, { FC, useCallback, useEffect, useRef, useState } from 'react';
import {
  Keyboard,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import Animated, { SlideInLeft } from 'react-native-reanimated';

import { useAppDispatch, useDeleteAnimation } from '../../hooks';
import { IPurchase } from '../../interfaces';
import { listActions } from '../../redux';

interface IProps {
  purchase: IPurchase;
}

export const ListItem: FC<IProps> = ({ purchase }) => {
  const dispatch = useAppDispatch();

  const inputRef = useRef<TextInput>(null);

  const [isCommentVisible, setIsCommentVisible] = useState<boolean>(false);
  const [text, setText] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState<boolean>(false);

  const handleKeyboardHide = useCallback(() => {
    dispatch(listActions.isInputFieldVisible(true));
    inputRef.current.blur();
  }, []);

  useEffect(() => {
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      handleKeyboardHide,
    );
    return () => keyboardDidHideListener.remove();
  }, [handleKeyboardHide]);

  const deleteItem = () => {
    dispatch(listActions.delItemFromList(purchase));
  };

  const mark = () => {
    dispatch(listActions.delItemFromList(purchase));
    dispatch(listActions.setSelected(purchase));
  };

  const handlePress = () => {
    dispatch(listActions.isInputFieldVisible(false));
    setText(purchase.comment);
    setIsCommentVisible(true);
    setTimeout(() => {
      if (inputRef.current) {
        inputRef.current.focus();
      }
    }, 0.1);
  };

  const onSubmit = () => {
    dispatch(
      listActions.addComment({
        id: purchase.id,
        item: purchase.item,
        comment: text,
      }),
    );
    setText(null);
    setIsCommentVisible(false);
    dispatch(listActions.isInputFieldVisible(true));
  };

  const dellComment = () => {
    dispatch(listActions.dellComment(purchase));
    setText(null);
  };

  const handleDeletePress = useCallback(() => {
    setIsDeleting(true);
  }, []);

  const animatedStyle = useDeleteAnimation(isDeleting, deleteItem);

  const handleFocus = useCallback(() => {}, []);

  const handleBlur = () => {
    setIsCommentVisible(false);
    // setText(null);
  };

  const closeComment = () => {
    setIsCommentVisible(false);
    setText(null);
  };

  return (
    <Animated.View
      entering={SlideInLeft.duration(200)}
      style={[styles.wrapper, animatedStyle]}
    >
      <View style={styles.textWrapper}>
        <View style={{ width: '100%' }}>
          <Text onPress={mark} style={styles.text}>
            - {purchase.item}
          </Text>
          {purchase.comment && (
            <View
              style={
                !isCommentVisible
                  ? styles.commentTextWrapper
                  : { display: 'none' }
              }
            >
              <Text style={styles.commentText}>{purchase.comment}</Text>
              <TouchableOpacity onPress={dellComment}>
                <FontAwesomeIcon
                  size={25}
                  icon={faXmark}
                  color={'rgba(128,51,51,0.75)'}
                />
              </TouchableOpacity>
            </View>
          )}
        </View>

        <TextInput
          style={isCommentVisible ? styles.input : styles.displayNone}
          ref={inputRef}
          textAlignVertical={'top'}
          verticalAlign={'top'}
          multiline={true}
          placeholder={'коментар...'}
          placeholderTextColor={'rgba(26,90,124,0.74)'}
          onChangeText={setText}
          value={text || ''}
          onFocus={handleFocus}
          onBlur={handleBlur}
          blurOnSubmit={true}
          onSubmitEditing={onSubmit}
        />
      </View>
      {isCommentVisible ? (
        <TouchableOpacity style={styles.xButton} onPress={closeComment}>
          <FontAwesomeIcon
            size={25}
            icon={faXmark}
            color={'rgba(128,51,51,0.75)'}
          />
        </TouchableOpacity>
      ) : (
        <TouchableOpacity style={styles.commentBtn} onPress={handlePress}>
          <FontAwesomeIcon
            size={22}
            icon={faCommentDots}
            color={'rgba(128,51,51,0.75)'}
          />
        </TouchableOpacity>
      )}
      <TouchableOpacity style={styles.delBtn} onPress={handleDeletePress}>
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
    justifyContent: 'space-between',
    width: '100%',
    elevation: 16,
    shadowColor: '#1c1a1a',
    backgroundColor: 'rgba(136,215,243,1)',
    marginVertical: 2,
    paddingHorizontal: 20,
    paddingVertical: 5,
    borderRadius: 5,
  },
  textWrapper: {
    width: '60%',
    flexDirection: 'column',
  },
  text: {
    width: '100%',
    fontSize: 25,
    fontStyle: 'italic',
    color: '#28475e',
    textAlignVertical: 'center',
  },
  xButton: {
    width: '20%',
    // height: '95%',
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  delBtn: {
    width: '20%',
    minHeight: 25,
    alignItems: 'center',
    justifyContent: 'center',
  },
  commentBtn: {
    width: '20%',
    height: 'auto',
    alignItems: 'center',
    justifyContent: 'center',
  },
  commentTextWrapper: {
    width: '80%',
    flexDirection: 'row',
  },
  commentText: {
    height: 'auto',
    width: '100%',
    color: '#35628c',
    fontSize: 16,
    fontStyle: 'italic',
    margin: 0,
    padding: 0,
  },
  input: {
    margin: 0,
    padding: 0,
    color: '#35628c',
    fontSize: 16,
    width: '100%',
    // color: 'rgba(26,90,124,0.99)',
  },
  displayNone: {
    display: 'none',
  },
});
