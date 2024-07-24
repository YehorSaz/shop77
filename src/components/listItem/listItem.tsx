import {
  faCommentDots,
  faTrashCan,
  faXmark,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import React, {
  Dispatch,
  FC,
  SetStateAction,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import {
  Keyboard,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import Animated, { SlideInLeft } from 'react-native-reanimated';

import {
  useAppDispatch,
  useAppSelector,
  useDeleteAnimation,
} from '../../hooks';
import { IPurchase } from '../../interfaces';
import { listActions } from '../../redux';

interface IProps {
  purchase: IPurchase;
  setIsInputVisible: Dispatch<SetStateAction<boolean>>;
}

export const ListItem: FC<IProps> = ({ purchase, setIsInputVisible }) => {
  const { isDrawerVisible } = useAppSelector(state => state.list);
  const dispatch = useAppDispatch();

  const inputRef = useRef<TextInput>(null);

  const [isCommentVisible, setIsCommentVisible] = useState<boolean>(false);
  const [text, setText] = useState<string | null>(null);
  const [keyboardDidShow, setKeyboardDidShow] = useState<boolean>(false);
  const [isDeleting, setIsDeleting] = useState<boolean>(false);

  const handleKeyboardHide = useCallback(() => {
    setKeyboardDidShow(false);
    setText(null);
    setIsCommentVisible(false);
  }, []);

  const handleKeyboardShow = useCallback(() => {
    setKeyboardDidShow(true);
  }, []);

  useEffect(() => {
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      handleKeyboardHide,
    );
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      handleKeyboardShow,
    );

    return () => {
      keyboardDidHideListener.remove();
      keyboardDidShowListener.remove();
    };
  }, [handleKeyboardHide, handleKeyboardShow]);

  useEffect(() => {
    dispatch(listActions.isDrawerVisible(false));
    dispatch(listActions.isInputVisible(true));
  }, [isDrawerVisible]);

  const deleteItem = useCallback(() => {
    dispatch(listActions.delItemFromList(purchase));
  }, [purchase]);

  const mark = useCallback(() => {
    dispatch(listActions.delItemFromList(purchase));
    dispatch(listActions.setSelected(purchase));
  }, [purchase]);

  const handlePress = useCallback(() => {
    if (keyboardDidShow) {
      setIsCommentVisible(true);
      setTimeout(() => {
        if (inputRef.current) {
          inputRef.current.focus();
        }
      }, 50);
    } else {
      setIsInputVisible(false);
      setIsCommentVisible(true);
      setTimeout(() => {
        if (inputRef.current) {
          inputRef.current.focus();
        }
      }, 50);
    }
  }, [keyboardDidShow, setIsInputVisible]);

  const onSubmit = useCallback(() => {
    dispatch(
      listActions.addComment({
        id: purchase.id,
        item: purchase.item,
        comment: text,
      }),
    );
    setText(null);
    setIsCommentVisible(false);
  }, [purchase, text]);

  const dellComment = useCallback(() => {
    dispatch(listActions.dellComment(purchase));
    setText(null);
  }, [purchase]);

  const handleDeletePress = useCallback(() => {
    setIsDeleting(true);
  }, []);

  const animatedStyle = useDeleteAnimation(isDeleting, deleteItem);

  const handleBlur = useCallback(() => {
    setIsCommentVisible(false);
    setTimeout(() => {
      setText(null);
    }, 300);
  }, []);

  const handleFocus = useCallback(() => {
    setIsInputVisible(false);
  }, [setIsInputVisible]);

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
            <View style={styles.commentTextWrapper}>
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
          placeholder={'коментар...'}
          placeholderTextColor={'rgba(26,90,124,0.74)'}
          onChangeText={setText}
          value={text || ''}
          blurOnSubmit={false}
          onBlur={handleBlur}
          onFocus={handleFocus}
          onSubmitEditing={onSubmit}
        />
      </View>
      {isCommentVisible ? (
        <TouchableOpacity
          onPress={() => {
            setIsCommentVisible(false);
            setText(null);
          }}
        >
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
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    elevation: 16,
    shadowColor: '#1c1a1a',
    backgroundColor: 'rgba(136,215,243,1)',
    marginVertical: 2,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  textWrapper: {
    width: '60%',
    flexDirection: 'column',
    justifyContent: 'space-around',
  },
  text: {
    width: '100%',
    fontSize: 25,
    fontStyle: 'italic',
    color: '#28475e',
    textAlignVertical: 'center',
  },
  delBtn: {
    width: '20%',
    alignItems: 'center',
  },
  commentBtn: {
    width: '20%',
    alignItems: 'center',
  },
  commentTextWrapper: {
    width: '80%',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  commentText: {
    height: 'auto',
    width: '100%',
    color: '#35628c',
    fontSize: 16,
    fontStyle: 'italic',
  },
  input: {
    maxWidth: '100%',
    color: 'rgba(26,90,124,0.99)',
  },
  displayNone: {
    display: 'none',
  },
});
