import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Define a reducer
type TAuth={
  [key:string]:any
}
const initialState= {
  auth: {},
  
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAuth(state, {payload}: PayloadAction<TAuth>) {
      state.auth = payload;
    },

    logoutAuth(state){
      state.auth = {};
    }
  },
});

export const { setAuth, logoutAuth } = authSlice.actions;
export default authSlice.reducer;



