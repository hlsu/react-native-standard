import React, { Component } from 'react';
import { NavigationExperimental } from 'react-native';

import { createStore, applyMiddleware, combineReducers, compose } from 'redux';
import { Provider } from 'react-redux';
import thunkMiddleware from 'redux-thunk';

import Config from '../config';

import reducers from './reducers';
import AppNav from './appNav';

const {
  CardStack: NavigationCardStack
} = NavigationExperimental


function configureStore(initialState) {
  const enhancer = compose(
    applyMiddleware(
      thunkMiddleware,
    ),
  );
  return createStore(reducers, initialState, enhancer);
}

const store = configureStore({});

export default class App extends Component {
  constructor(props) {
    super(props);

  }

  componentDidMount() {
  }

  render() {
    return (
      <Provider store={store} style={{ flex: 1 }}>
        <AppNav />
      </Provider>
    );
  }
}
