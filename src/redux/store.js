
import { configureStore } from '@reduxjs/toolkit';
import mainStateReducer from './sliceData'

export default configureStore({
  reducer: {
    data: mainStateReducer,
  },
});
  