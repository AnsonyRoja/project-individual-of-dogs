
import { createStore, applyMiddleware, compose } from 'redux';
import thunkMiddleware from 'redux-thunk';
import reducer from './reducer';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';


//configuracion de redux persist
const persistConfig = {
    key: 'root',
    storage,
};

//creamos un nuevo reducer con la configuracion de redux persist
const persistedReducer = persistReducer(persistConfig, reducer);

//esta linea sirve para conectar nuestra app con la extension de redux devtools del navegador
const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(persistedReducer,
    composeEnhancer(applyMiddleware(thunkMiddleware))// esta linea sirve para que podamos hacer peticiones a una Api/servidor
);

//creamos una variable para poder usar el store en el componente index.js
const persistedStore = persistStore(store);


export { store, persistedStore };