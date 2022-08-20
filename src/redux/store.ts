import thunk from "redux-thunk";
import {persistStore, persistReducer} from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {legacy_createStore as createStore, applyMiddleware, compose} from 'redux'
const enhancer = compose(applyMiddleware(thunk,createLogger({})));
import rootReducer from './rootReducer'
import { createLogger } from "redux-logger";
const persistConfig = {
  key: 'root',
  timeout: 0,
  storage: AsyncStorage,
  whitelist: ['authReducer','chatReducer'],
};
const persistedReducer = persistReducer(persistConfig,rootReducer);
export const store = createStore(persistedReducer, enhancer);
export const persistor = persistStore(store);