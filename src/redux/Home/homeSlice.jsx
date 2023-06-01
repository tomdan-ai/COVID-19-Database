import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Define the initial state
const initialState = {
  data: [],
  status: 'idle',
  error: null,
};

// Define the asynchronous thunk for fetching data
export const fetchData = createAsyncThunk('home/fetchData', async () => {
  try {
    const response = await fetch('https://coronavirus.m.pipedream.net/');
    const data = await response.json();
    return data;
  } catch (error) {
    throw Error('Failed to fetch data from the API');
  }
});

// Create the homeSlice
const homeSlice = createSlice({
  name: 'home',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchData.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchData.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.data = action.payload;
      })
      .addCase(fetchData.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export const selectData = (state) => state.home.data;
export const selectStatus = (state) => state.home.status;
export const selectError = (state) => state.home.error;

export default homeSlice.reducer;
