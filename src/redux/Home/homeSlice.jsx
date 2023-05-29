import { createSlice } from '@reduxjs/toolkit';

const homeSlice = createSlice({
  name: 'home',
  initialState: {
    // Define initial state properties for your home component
    data: [],
    loading: false,
    error: null,
  },
  reducers: {
    // Define your reducers for updating the state
    fetchDataStart(state) {
      state.loading = true;
      state.error = null;
    },
    fetchDataSuccess(state, action) {
      state.loading = false;
      state.data = action.payload;
    },
    fetchDataFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

// Export the actions and reducer
export const { fetchDataStart, fetchDataSuccess, fetchDataFailure } = homeSlice.actions;
export default homeSlice.reducer;
