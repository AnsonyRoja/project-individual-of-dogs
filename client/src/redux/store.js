
import { createStore, applyMiddleware, compose } from 'redux';
import thunkMiddleware from 'redux-thunk';
import reducer from './reducer';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';


const persistConfig = {
    key: 'root',
    storage,
}



const persistedReducer = persistReducer(persistConfig, reducer)




//esta linea sirve para conectar nuestra app con la extension de redux devtools del navegador
const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(persistedReducer,
    composeEnhancer(applyMiddleware(thunkMiddleware))// esta linea sirve para que podamos hacer peticiones a una Api/servidor
);

let persistor = persistStore(store);
export { store, persistor };