import uuid from 'react-native-uuid';

import { IPurchase } from '../interfaces';

export const addId = (item: string): IPurchase => {
  return <IPurchase>{
    id: uuid.v4(),
    item: item,
  };
};
