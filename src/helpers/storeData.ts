import 'moment/locale/uk';

import AsyncStorage from '@react-native-async-storage/async-storage';
import moment from 'moment/moment';
import { Dispatch, SetStateAction } from 'react';

export const storeData = async (
  value: string,
  trigger1: boolean,
  setTrigger1: Dispatch<SetStateAction<boolean>>,
): Promise<void> => {
  if (value !== '') {
    const arr = new Array(value);
    try {
      const myData = await AsyncStorage.getItem('list');
      console.log('@@@@@@@', myData);
      if (myData === null || !myData) {
        await AsyncStorage.setItem('list', JSON.stringify(arr));
        const date = moment().format('LLL').replace(' р.,', '');
        await AsyncStorage.setItem('title', date);
        setTrigger1(!trigger1);
        return;
      } else {
        const storedData = JSON.parse(myData);
        // const dataForStore = storedData.concat(arr);
        const dataForStore = arr.concat(storedData);
        await AsyncStorage.setItem('list', JSON.stringify(dataForStore));
        setTrigger1(!trigger1);
      }
    } catch (e) {
      console.log(e);
    }
  }
};
