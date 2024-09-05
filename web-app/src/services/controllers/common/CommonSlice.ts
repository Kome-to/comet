import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface CommonState {
  loading: boolean;
  ui: {
    dialog: {
      [name: string]: boolean;
    };
  };
  hashKey: string;
  email: string;
}

const initialState: CommonState = {
  loading: false,
  ui: { dialog: {} },
  hashKey: '',
  email: '',
};

export const commonSlice = createSlice({
  name: 'common',
  initialState,
  reducers: {
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    toggleModals: (state, action: PayloadAction<string>) => {
      state.ui.dialog = {
        ...state.ui.dialog,
        [action.payload]: !state.ui.dialog[action.payload],
      };
    },
    closeModals: (state, action: PayloadAction<string>) => {
      state.ui.dialog = { ...state.ui.dialog, [action.payload]: false };
    },
    setHashKey: (state, action: PayloadAction<string>) => {
      state.hashKey = action.payload;
    },
    setEmail: (state, action: PayloadAction<string>) => {
      state.email = action.payload;
    },
  },
});

export const { setLoading, toggleModals, closeModals, setHashKey, setEmail } = commonSlice.actions;

export default commonSlice.reducer;
