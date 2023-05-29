import { configureStore } from '@reduxjs/toolkit';
import homeReducer from './Home/homeSlice';

const store = configureStore({
  reducer: {
    home: homeReducer,
    // Add other reducers here if needed
  },
});

export default store;
