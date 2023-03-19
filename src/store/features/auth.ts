import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Define a reducer

const initialState= {
  auth: {_id:0, name:''},
  
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    getAuth(state, {payload}: PayloadAction<{ auth:any}>) {
      state.auth = payload.auth;
    },

    logoutAuth(state){
      state.auth = {_id :0, name:''};
    }
  },
});

export const { getAuth, logoutAuth } = authSlice.actions;
export default authSlice.reducer;



