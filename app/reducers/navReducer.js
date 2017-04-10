import {
  Alert,
  NavigationExperimental,
  AsyncStorage,
} from 'react-native';
import * as types from '../actions/actionType';
import createReducer from '../common/createReducer';

const {
  StateUtils: NavigationStateUtils
} = NavigationExperimental;

const initialState = {
  index: 0,
  key: 'root',
  routes: [{
    id: 'Home',
    key: 'Home'
  }]
}

export const nav = createReducer({}, {
  [types.GOTO_HOME](state = initialState, action) {
    // let newState = NavigationStateUtils.push(state.navigationState, {id: 'Login', key: 'Login'});
    const homeState = {
      index: 0,
      key: 'root',
      routes: [{
        id: 'Home',
        key: 'Home'
      }]
    }
    return {
      ...state,
      navigationState: homeState
    }
  },
  [types.PUSH_ROUTE](state = initialState, action) {

    let navigationState = state.navigationState;
    if (navigationState == null || navigationState == undefined) {
      navigationState = initialState;
    }
    // Check if existed key in navigationState (app will be cashed if duplicate key)
    let exitedState = navigationState.routes.find(r => r.key == action.route.key);
    if(!exitedState) {
      let newState = NavigationStateUtils.push(navigationState, action.route);
      return {
        ...state,
        navigationState: newState
      }
    }
    return {
        ...state,
    }
  },
  [types.POP_ROUTE](state = initialState, action) {
    let newState = NavigationStateUtils.pop(state.navigationState);
    return {
      ...state,
      navigationState: newState
    }
  },
  [types.SHOW_ERROR](state = initialState, action) {
    let error = action.error;
    Alert.alert('Error', error.error_message || JSON.stringify(error));
    return {
      ...state,
    }
  },

});