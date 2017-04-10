import { combineReducers } from 'redux';

import * as NavReducer from './navReducer';

export default combineReducers(Object.assign(
    NavReducer,
));