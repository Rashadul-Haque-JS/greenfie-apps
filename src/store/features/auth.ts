import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Define a reducer
type TAuth={
  [key:string]:any
}
const initialState= {
  auth: {},
  signup:false
  
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
    },
    setSignup(state ,{payload}: PayloadAction<boolean>){
      state.signup = payload;
    },
  },
});

export const { setAuth, logoutAuth ,setSignup} = authSlice.actions;
export default authSlice.reducer;



