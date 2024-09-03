import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import commonSlice from './services/controllers/common/CommonSlice';
import userSlice from './services/controllers/user/UserSlice';
import workspaceSlice from './services/controllers/workspace/WorkspaceSlice';

const persistConfig = {
  key: 'root',
  storage,
  blacklist: ['common', 'workspace', 'user'],
};

const persistedReducer = persistReducer(
  persistConfig,
  combineReducers({
    common: commonSlice,
    workspace: workspaceSlice,
    user: userSlice,
  }),
);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
  devTools: true,
});

export const persistor = persistStore(store);

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

export default store;
