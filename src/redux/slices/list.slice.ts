import { createSlice } from '@reduxjs/toolkit';

import { capitalizeString } from '../../helpers';
import { addId } from '../../helpers/addId.ts';
import { IPurchase, IRecent } from '../../interfaces';

interface IState {
  list: IPurchase[] | null;
  trigger: boolean;
  title: string;
  selected: IPurchase[] | null;
  recentList: IRecent[];
  isInputWrapperVisible: boolean;
  isDrawerVisible: boolean;
}

const initialState: IState = {
  list: null,
  trigger: false,
  title: '',
  selected: null,
  recentList: [],
  isInputWrapperVisible: true,
  isDrawerVisible: false,
};

const listSlice = createSlice({
  name: 'listSlice',
  initialState,
  reducers: {
    setData: (state, action: { payload: IPurchase }) => {
      if (state.list === null) {
        state.list = new Array(action.payload);
      } else {
        state.list.push(action.payload);
      }
    },
    delItemFromList: (state, action: { payload: IPurchase }) => {
      const index = state.list.findIndex(item => action.payload.id === item.id);
      state.list.splice(index, 1);
    },
    clearData: state => {
      state.list = null;
      state.selected = null;
    },
    setTrigger: state => {
      state.trigger = !state.trigger;
    },
    setTitle: (state, action) => {
      state.title = action.payload;
    },
    clearTitle: state => {
      state.title = '';
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
    },
    backToList: (state, action: { payload: IPurchase }) => {
      const index = state.selected.findIndex(
        item => action.payload.id === item.id,
      );
      const item = state.selected.splice(index, 1);
      state.list.push(...item);
    },
    saveToRecentLists: state => {
      if (state.list === null) {
        return;
      } else {
        const recent = [] as IPurchase[];
        if (state.list) {
          recent.push(...state.list);
        }
        if (state.selected) {
          recent.push(...state.selected);
        }
        const dataToSave: IRecent = {
          title: state.title,
          data: recent,
        };

        if (state.recentList) {
          state.recentList.push(dataToSave);
        } else {
          state.recentList = new Array(dataToSave);
        }
      }
    },
    removeRecentItem: (state, action) => {
      state.recentList = state.recentList.filter(
        item => item.title !== action.payload,
      );
    },
    addComment: (state, action: { payload: IPurchase }) => {
      const data = action.payload;
      const index = state.list.findIndex(item => data.id === item.id);
      state.list[index].comment = data.comment;
    },
    dellComment: (state, action: { payload: IPurchase }) => {
      const data = action.payload;
      const index = state.list.findIndex(item => data.id === item.id);
      state.list[index].comment = '';
    },
    addMultiLine: (state, action: { payload: string[] }) => {
      const data = action.payload;
      if (state.list === null) {
        state.list = [] as IPurchase[];
        for (const elem in data) {
          const purchase = addId(capitalizeString(data[elem]));
          state.list.push(purchase);
        }
      } else {
        for (const elem in data) {
          const purchase = addId(capitalizeString(data[elem]));
          state.list.push(purchase);
        }
      }
    },
    isInputVisible: (state, action: { payload: boolean }) => {
      state.isInputWrapperVisible = action.payload;
    },
    isDrawerVisible: (state, action: { payload: boolean }) => {
      state.isDrawerVisible = action.payload;
    },
  },
});

const { reducer: listReducer, actions } = listSlice;

const listActions = {
  ...actions,
};

export { listReducer, listActions };
