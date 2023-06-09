import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import phraseReducer from './features/phrase/phraseSlice';

export const store = configureStore({
  reducer: {
    phrase: phraseReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;