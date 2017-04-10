import { POP_ROUTE, PUSH_ROUTE, GOTO_LOGIN, GOTO_HOME } from './actionType';

export function push (route) {
  return (dispatch, getState) => {
    return dispatch({
      type: PUSH_ROUTE,
      route
    });
  }
}

export function pop () {
  return (dispatch, getState) => {
    return dispatch({
      type: POP_ROUTE,
    });
  }
}

export function goToHome() {
  return (dispatch, getState) => {
    return dispatch({
      type: GOTO_HOME,
    });
  }
}