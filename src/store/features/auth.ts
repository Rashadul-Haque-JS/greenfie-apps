import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Define a reducer
type TAuth={
  [key:string]:any
}
const initialState= {
  auth: {},
  signup:false,
  signupIcon:false
  
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

    setSignupIcon(state ,{payload}: PayloadAction<boolean>){
      state.signupIcon = payload;
    },
  },
});

export const { setAuth, logoutAuth ,setSignup,setSignupIcon} = authSlice.actions;
export default authSlice.reducer;



