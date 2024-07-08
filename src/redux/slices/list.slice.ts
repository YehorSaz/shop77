import { createSlice } from '@reduxjs/toolkit';

interface IState {
  list: string[] | null;
  trigger: boolean;
  title: string;
}

const initialState: IState = {
  list: null,
  trigger: false,
  title: '',
};

const listSlice = createSlice({
  name: 'listSlice',
  initialState,
  reducers: {
    setData: (state, action: { payload: string; type: string }) => {
      if (state.list === null) {
        state.list = new Array(action.payload);
      } else {
        state.list.push(action.payload);
      }
    },
    clearData: state => {
      state.list = null;
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
  },
});

const { reducer: listReducer, actions } = listSlice;

const listActions = {
  ...actions,
};

export { listReducer, listActions };
