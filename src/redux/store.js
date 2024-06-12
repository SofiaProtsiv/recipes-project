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
import { authSlice } from './auth/AuthSlice';
import { authApi } from './auth/AuthApi';
import { recipesApi } from './recipes/recipesApi';
import { categoriesApi } from './categories/categoriesApi';

const persistConfig = {
  key: 'authSlice',
  storage,
  whitelist: [authSlice.reducerPath],
};

const rootReducer = combineReducers({
  authSlice: authSlice.reducer,
  [recipesApi.reducerPath]: recipesApi.reducer,
  [authApi.reducerPath]: authApi.reducer,
  [testimonialsApi.reducerPath]: testimonialsApi.reducer,
  [ingredientsApi.reducerPath]: ingredientsApi.reducer,
  [areasApi.reducerPath]: areasApi.reducer,
  [categoriesApi.reducerPath]: categoriesApi.reducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const apiMiddlewares = [
  testimonialsApi.middleware,
  ingredientsApi.middleware,
  areasApi.middleware,
  authApi.middleware,
  recipesApi.middleware,
  categoriesApi.middleware,
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
