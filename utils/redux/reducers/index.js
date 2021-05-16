import { combineReducers } from 'redux';

import crud from './crud.reducer';
import { reducerData } from './assign.reducer';

const reducers = {}

reducerData.forEach(element => {
    reducers[element] = crud(element)
});

const rootReducer = combineReducers(
    reducers
);

export default rootReducer;