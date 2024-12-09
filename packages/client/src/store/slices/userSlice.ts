import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UserState {
  id: string | null;
  token: string | null;
  email: string | null;
}

const initialState: UserState = {
  id: null,
  token: null,
  email: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser(
      state,
      action: PayloadAction<{ id: string; token: string; email: string }>,
    ) {
      state.id = action.payload.id;
      state.token = action.payload.token;
      state.email = action.payload.email;
    },
    clearUser(state) {
      state.id = null;
      state.token = null;
      state.email = null;
    },
  },
});

export const { setUser, clearUser } = userSlice.actions;
export default userSlice.reducer;
