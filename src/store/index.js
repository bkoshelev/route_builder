import { createStore, combineReducers, applyMiddleware } from 'redux';
import { pointsList, inputValue, currentMapCenter } from './reducers';
import stateData from '../data/state';

const storeFactory = () =>
  applyMiddleware()(createStore)(
    combineReducers({
      pointsList,
      inputValue,
      currentMapCenter,
    }),
    stateData,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
  );

export default storeFactory;
