import { UserAttributes } from '@/services/types/common';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface UserState {
  currentUser: UserAttributes | null;
}

const initialState: UserState = { currentUser: null };

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setCurrentUser: (state, action: PayloadAction<UserAttributes | null>) => {
      state.currentUser = action.payload;
    },
  },
});

export const { setCurrentUser } = userSlice.actions;

export default userSlice.reducer;
