import { createWrapper, HYDRATE } from 'next-redux-wrapper';
import { configureStore } from '@reduxjs/toolkit';
import rootReducer  from './reducers';

const makeStore = () =>
  configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: false,
      }),
  });

export const wrapper = createWrapper(makeStore);
export type AppDispatch = ReturnType<typeof makeStore>['dispatch'];
export type RootState = ReturnType<typeof rootReducer>;


// Define a custom GetServerSideProps that will inject the store into the props
export const getServerSideProps =
  wrapper.getServerSideProps(store => async ({ req, res }) => {
    // Dispatch a hydration action to hydrate the store with server-rendered data
    store.dispatch({ type: HYDRATE, payload: { auth: {}} });

    return { props: { initialReduxState: store.getState() } };
  });
