import React, {useState, useEffect, FC, Dispatch, SetStateAction} from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faTrashCan} from '@fortawesome/free-solid-svg-icons';

interface IProps {
  item: string;
  isSelected: boolean;
  onPress: () => void;
  trigger: boolean;
  setTrigger: Dispatch<SetStateAction<boolean>>;
}
interface IExProps {
  trigger: boolean;
  setTrigger: Dispatch<SetStateAction<boolean>>;
  isClean: boolean;
}

const Item: FC<IProps> = ({item, isSelected, onPress, setTrigger, trigger}) => {
  const deleteItem = async (itemForDel: string) => {
    await AsyncStorage.removeItem(itemForDel);
    const data = await AsyncStorage.getItem('list');
    if (data !== null) {
      const newArr = JSON.parse(data);
      const index = newArr.indexOf(itemForDel);
      newArr.splice(index, 1);
      await AsyncStorage.setItem('list', JSON.stringify(newArr));
      setTrigger(!trigger);
    }
  };
  return (
    <View style={styles.wrapper}>
      <Text
        // ref={itemRef}
        onPress={onPress}
        style={[styles.text, isSelected && styles.selectedItem]}>
        - {item}
      </Text>
      <TouchableOpacity
        style={{width: '20%', alignItems: 'center'}}
        onPress={() => {
          deleteItem(item);
        }}>
        <FontAwesomeIcon
          size={22}
          icon={faTrashCan}
          color={'rgba(128,51,51,0.75)'}
        />
      </TouchableOpacity>
    </View>
  );
};

export const Example: FC<IExProps> = ({trigger, setTrigger, isClean}) => {
  const [data, setData] = useState<string[]>([]);
  const [selectedItem, setSelectedItem] = useState<string | null>(null);
  console.log('DATA ', data);
  console.log('SELECTED ', selectedItem);

  useEffect(() => {
    if (isClean) {
      setData([]);
    }
  }, [isClean]);

  useEffect(() => {
    const loadSelectedItem = async () => {
      try {
        const value = await AsyncStorage.getItem('selectedItem');
        if (value !== null) {
          setSelectedItem(value);
        }
      } catch (e) {
        console.error('Failed to load selected item.', e);
      }
    };

    const loadData = async () => {
      try {
        const keys = await AsyncStorage.getAllKeys();
        console.log('KY', keys);
        if (!keys) {
          setData([]);
          setTrigger(!trigger);
        }
        const value = await AsyncStorage.getItem('list');
        console.log('VALUE ', value);
        if (value !== null) {
          setData(JSON.parse(value));
        }
      } catch (e) {
        console.error('Failed to load data.', e);
      }
    };

    loadSelectedItem();
    loadData();
  }, [trigger]);

  useEffect(() => {
    const saveSelectedItem = async () => {
      try {
        if (selectedItem) {
          await AsyncStorage.setItem('selectedItem', selectedItem);
        }
      } catch (e) {
        console.error('Failed to save selected item.', e);
      }
    };

    if (selectedItem !== null) {
      saveSelectedItem();
    }
  }, [selectedItem]);

  useEffect(() => {
    const saveData = async () => {
      try {
        if (data) {
          console.log('FCKNG_DATA', data);
          await AsyncStorage.setItem('list', JSON.stringify(data));
        }
      } catch (e) {
        console.error('Failed to save data.', e);
      }
    };

    saveData();
  }, [data]);

  const handlePress = (item: string) => {
    setSelectedItem(selectedItem === item ? null : item);
    setData(prevData => {
      const newData = prevData.filter(i => i !== item);
      newData.push(item);
      return newData;
    });
  };

  return (
    <View style={styles.container}>
      {data.map((item, index) => (
        <Item
          trigger={trigger}
          setTrigger={setTrigger}
          key={index}
          item={item}
          isSelected={selectedItem === item}
          onPress={() => handlePress(item)}
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
  },
  wrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    elevation: 16,
    shadowColor: '#1c1a1a',
    backgroundColor: 'rgba(136,215,243,0.86)',
    marginVertical: 2,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  text: {
    width: '80%',
    fontSize: 25,
    fontStyle: 'italic',
    color: '#28475e',
  },
  lineThrow: {
    textDecorationLine: 'line-through',
  },
  item: {
    width: '20%',
    alignItems: 'center',
  },
  selectedItem: {
    textDecorationLine: 'line-through',
    opacity: 0.3,
  },
});
