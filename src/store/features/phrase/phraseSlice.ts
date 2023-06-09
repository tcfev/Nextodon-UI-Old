import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../store';
import { fetchPhrase } from './phraseAPI';

export interface PhraseState {
  value: string[];
  status: 'idle' | 'loading' | 'failed';
}

const initialState: PhraseState = {
  value: [],
  status: 'idle',
};

export const phraseAsync = createAsyncThunk(
  'phrase/fetchPhrase',
  async (words: string[]) => {
    const response = await fetchPhrase(words);
    return response.data;
  }
);

export const counterSlice = createSlice({
  name: 'phrase',
  initialState,
  reducers: {
    setPhrase: (state, action: PayloadAction<string[]>) => {
      state.value = action.payload;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(phraseAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(phraseAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.value = action.payload;
      })
      .addCase(phraseAsync.rejected, (state) => {
        state.status = 'failed';
      });
  },
});

export const { setPhrase } = counterSlice.actions;
export const selectPhrase = (state: RootState) => state;
export default counterSlice.reducer;
