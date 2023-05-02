import axios from 'axios';
import { Dispatch } from 'redux';
import { RootState } from '@/store/store';
import { getAuth } from "@/store/features/auth";

const fetchUser = () => async (dispatch: Dispatch<any>, getState: () => RootState) => {
  try {
    const { data } = await axios.get('/api/users/authUser');
    dispatch(getAuth(data.user));
  } catch (error) {
    console.log(error);
  }
};

export default fetchUser;
