import { createSlice } from '@reduxjs/toolkit';

import { IRecent } from '../../interfaces/recent.interface.ts';

interface IState {
  list: string[] | null;
  trigger: boolean;
  title: string;
  selected: string[] | null;
  recentList: IRecent[];
}

const initialState: IState = {
  list: null,
  trigger: false,
  title: '',
  selected: null,
  recentList: [],
};

const listSlice = createSlice({
  name: 'listSlice',
  initialState,
  reducers: {
    setData: (state, action) => {
      if (state.list === null) {
        state.list = new Array(action.payload);
      } else {
        state.list.push(action.payload);
      }
    },
    delItemFromList: (state, action) => {
      const index = state.list.indexOf(action.payload);
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
    setSelected: (state, action: { payload: string; type: string }) => {
      if (state.selected === null) {
        state.selected = new Array(action.payload);
      } else {
        state.selected.push(action.payload);
      }
    },
    delFromSelected: (state, action) => {
      const index = state.selected.indexOf(action.payload);
      state.selected.splice(index, 1);
    },
    backToList: (state, action) => {
      const index = state.selected.indexOf(action.payload);
      const item = state.selected.splice(index, 1);
      state.list.push(...item);
    },
    saveToRecentLists: state => {
      const recent = [] as string[];
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
    },
    removeRecentItem: (state, action) => {
      state.recentList = state.recentList.filter(
        item => item.title !== action.payload,
      );
    },
  },
});

const { reducer: listReducer, actions } = listSlice;

const listActions = {
  ...actions,
};

export { listReducer, listActions };
