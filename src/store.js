import {createStore} from 'redux';
import reducers from './reducers/combine'


const store = createStore(reducers);

export default store;