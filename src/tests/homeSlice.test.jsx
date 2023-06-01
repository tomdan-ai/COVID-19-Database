import homeReducer, { fetchData } from '../redux/Home/homeSlice';

const mockData = [
];

global.fetch = jest.fn(() => Promise.resolve({
  json: () => Promise.resolve(mockData),
}));

describe('homeSlice reducer', () => {
  it('should handle fetchData.pending', () => {
    const initialState = { data: [], status: 'idle', error: null };
    const nextState = homeReducer(initialState, fetchData.pending());
    expect(nextState.status).toBe('loading');
    expect(nextState.error).toBeNull();
  });

  it('should handle fetchData.fulfilled', () => {
    const initialState = { data: [], status: 'loading', error: null };
    const nextState = homeReducer(initialState, fetchData.fulfilled(mockData));
    expect(nextState.status).toBe('succeeded');
    expect(nextState.data).toEqual(mockData);
  });
});
