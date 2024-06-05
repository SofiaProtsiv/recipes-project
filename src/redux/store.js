import { combineReducers } from 'redux';
import { configureStore } from '@reduxjs/toolkit';
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { testimonialsApi } from './testimonials/testimonialsApi';
import { ingredientsApi } from './ingredients/ingredientsApi';
import { areasApi } from './areas/areasApi';
// import other slices here
// import exampleReducer from './example/slice'

const persistConfig = {
  key: 'root',
  storage,
};

const rootReducer = combineReducers({
  // Add your other reducers here
  // example: exampleReducer,
  [testimonialsApi.reducerPath]: testimonialsApi.reducer,
  [ingredientsApi.reducerPath]: ingredientsApi.reducer,
  [areasApi.reducerPath]: areasApi.reducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const apiMiddlewares = [
  testimonialsApi.middleware,
  ingredientsApi.middleware,
  areasApi.middleware,
];

const middleware = getDefaultMiddleware =>
  getDefaultMiddleware({
    serializableCheck: {
      ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
    },
  }).concat(...apiMiddlewares);

export const store = configureStore({
  reducer: persistedReducer,
  middleware,
});

export const persistor = persistStore(store);
