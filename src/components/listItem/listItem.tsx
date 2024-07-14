import {
  faCommentDots,
  faTrashCan,
  faXmark,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import React, { FC, useRef, useState } from 'react';
import {
  Keyboard,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

import { addId } from '../../helpers/addId.ts';
import { useAppDispatch } from '../../hooks';
import { IPurchase } from '../../interfaces';
import { listActions } from '../../redux';

interface IProps {
  purchase: IPurchase;
}

export const ListItem: FC<IProps> = ({ purchase }) => {
  const dispatch = useAppDispatch();

  const inputRef = useRef<TextInput>(null);

  const [isCommentVisible, setIsCommentVisible] = useState<boolean>(false);
  // const [comment, setComment] = useState<string>(null);
  const [text, setText] = useState<string>(null);

  const deleteItem = () => {
    dispatch(listActions.delItemFromList(purchase));
    dispatch(listActions.setTrigger());
  };

  const mark = () => {
    dispatch(listActions.delItemFromList(purchase));
    dispatch(listActions.setSelected(purchase));
    dispatch(listActions.setTrigger());
  };

  const handlePress = () => {
    dispatch(listActions.isInputVisible(false));
    setIsCommentVisible(true);
    setTimeout(() => {
      if (inputRef.current) {
        inputRef.current.focus();
      }
    }, 100);
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
    dispatch(listActions.isInputVisible(true));
  };

  const dellComment = () => {
    dispatch(listActions.dellComment(purchase));
    dispatch(listActions.setTrigger());
  };

  return (
    <View style={styles.wrapper}>
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
          onChangeText={text => setText(text)}
          value={text}
          blurOnSubmit={false}
          onSubmitEditing={() => {
            onSubmit();
            Keyboard.dismiss();
          }}
        />
      </View>
      <TouchableOpacity
        style={styles.commentBtn}
        onPress={() => {
          handlePress();
        }}
      >
        <FontAwesomeIcon
          size={22}
          icon={faCommentDots}
          color={'rgba(128,51,51,0.75)'}
        />
      </TouchableOpacity>
      <TouchableOpacity style={styles.delBtn} onPress={deleteItem}>
        <FontAwesomeIcon
          size={22}
          icon={faTrashCan}
          color={'rgba(128,51,51,0.75)'}
        />
      </TouchableOpacity>
    </View>
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
