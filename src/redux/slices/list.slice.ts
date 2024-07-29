import { createSlice } from '@reduxjs/toolkit';

import { addId, capitalizeString } from '../../helpers';
import { useTitle } from '../../hooks';
import { IList, IPurchase } from '../../interfaces';

interface IState {
  list: IList | null;
  trigger: boolean;
  title: string;
  selected: IPurchase[] | null;
  recentList: IList[];
  isInputFieldVisible: boolean;
  showNotification: boolean;
}

const initialState: IState = {
  list: null,
  trigger: false,
  title: '',
  selected: null,
  recentList: [],
  isInputFieldVisible: true,
  showNotification: true,
};

const listSlice = createSlice({
  name: 'listSlice',
  initialState,
  reducers: {
    addPurchase: (state, action: { payload: IPurchase }) => {
      if (state.list === null) {
        const date = useTitle();
        state.list = {
          title: date,
          data: [action.payload],
        };
      } else {
        state.list.data.unshift(action.payload);
      }
    },
    delItemFromList: (state, action: { payload: IPurchase }) => {
      const index = state.list.data.findIndex(
        item => action.payload.id === item.id,
      );
      state.list.data.splice(index, 1);
      if (state.list.data?.length === 0) state.list = null;
    },
    setTrigger: state => {
      state.trigger = !state.trigger;
    },
    setSelected: (state, action: { payload: IPurchase }) => {
      if (state.selected === null) {
        state.selected = new Array(action.payload);
      } else {
        state.selected.push(action.payload);
      }
    },
    delFromSelected: (state, action: { payload: IPurchase }) => {
      const index = state.selected.findIndex(
        item => action.payload.id === item.id,
      );
      state.selected.splice(index, 1);
      if (state.selected?.length === 0) state.selected = null;
    },
    backToList: (state, action: { payload: IPurchase }) => {
      const index = state.selected.findIndex(
        item => action.payload.id === item.id,
      );
      const item = state.selected.splice(index, 1);
      state.list.data.unshift(...item);
    },
    saveToRecentLists: state => {
      if (state.list === null && state.selected === null) {
        return;
      } else {
        if (state.selected) {
          state.list.data.push(...state.selected);
        }
        state.recentList.push(state.list);
      }
      state.list = null;
      state.selected = null;
    },
    removeRecentItem: (state, action) => {
      state.recentList = state.recentList.filter(
        item => item.title !== action.payload,
      );
    },
    addComment: (state, action: { payload: IPurchase }) => {
      const data = action.payload;
      const index = state.list.data.findIndex(item => data.id === item.id);
      state.list.data[index].comment = data.comment;
    },
    dellComment: (state, action: { payload: IPurchase }) => {
      const data = action.payload;
      const index = state.list.data.findIndex(item => data.id === item.id);
      state.list.data[index].comment = '';
    },
    addMultiLine: (state, action: { payload: string[] }) => {
      const purchasesArr = action.payload;
      const purchases = [] as IPurchase[];
      for (const elem in purchasesArr) {
        const purchase = addId(capitalizeString(purchasesArr[elem]));
        purchases.push(purchase);
      }
      if (state.list === null) {
        const date = useTitle();
        state.list = {
          title: date,
          data: purchases,
        };
      } else {
        state.list.data.push(...purchases);
      }
    },
    isInputFieldVisible: (state, action: { payload: boolean }) => {
      state.isInputFieldVisible = action.payload;
    },
    restoreRecent: (state, action: { payload: string }) => {
      const date = useTitle();
      const index = state.recentList.findIndex(
        item => item.title === action.payload,
      );
      state.list = {
        title: date,
        data: state.recentList[index].data,
      };
    },
    showNotification: (state, action: { payload: boolean }) => {
      state.showNotification = action.payload;
    },
  },
});

const { reducer: listReducer, actions } = listSlice;

const listActions = {
  ...actions,
};

export { listReducer, listActions };
