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
    getAuth(state, {payload}: PayloadAction<TAuth>) {
      state.auth = payload;
    },

    logoutAuth(state){
      state.auth = {};
    }
  },
});

export const { getAuth, logoutAuth } = authSlice.actions;
export default authSlice.reducer;



