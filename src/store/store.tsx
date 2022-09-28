import user from './reducers/user';
import evilControl from './reducers/evilControl';
import { legacy_createStore as createStore, combineReducers } from 'redux'
import { composeWithDevTools } from "redux-devtools-extension";
// 缓存数据
import { persistReducer, persistStore } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

//在localStorge中生成key为root的值
const persistConfig = {
    key: 'root',
    storage,
    whiteList: ['allReducers ']  //blackList则设置某个reducer数据不持久化
}
const reducers = combineReducers({
    user,
    evilControl
});

const allReducers = persistReducer(persistConfig, reducers)
const store = createStore(allReducers, composeWithDevTools())
const persistor = persistStore(store)

export {
    store,
    persistor
}