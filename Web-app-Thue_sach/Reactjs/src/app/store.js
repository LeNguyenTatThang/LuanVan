import { configureStore } from '@reduxjs/toolkit';
import userReducer from './userReducer';
import storage from 'redux-persist/lib/storage';
import { combineReducers } from '@reduxjs/toolkit'
import {
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
} from 'redux-persist';
import persistStore from 'redux-persist/es/persistStore';


const persistConfig = {
    key: 'root',
    storage: storage,
    blacklist: ['apiProductSlice'],
}
const rootReducer = combineReducers({
    user: userReducer
});
const persistedReducer = persistReducer(persistConfig, rootReducer);
export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        }),
})
export let persistor = persistStore(store);