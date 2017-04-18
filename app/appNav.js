import React, { Component } from 'react';
import {
  BackAndroid,
  NavigationExperimental,
} from 'react-native';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ActionCreators } from './actions';

import Config from '../config';
import Home from './containers/home';
import About from './containers/about';
import SellInit from './containers/sellInit';
import ResultSelling from './containers/resultSelling'
import InputWeight from './containers/inputWeight';
import InputSubtract from './containers/inputSubtract';
import FieldList from './containers/fieldList';

const {
  CardStack: NavigationCardStack,
  StateUtils: NavigationStateUtils
} = NavigationExperimental;
const defaultNavigationState = {
  index: 0,
  routes: [{id: 'Home', key: 'Home'}],
}
class AppNav extends Component {
  constructor(props) {
    super(props);
    this.navigator = null;

    this.components =
      {
        'Home': Home,
        'About': About,
        'InputWeight': InputWeight,
        'SellInit': SellInit,
        'ResultSelling': ResultSelling,
        'InputSubtract': InputSubtract,
        'FieldList': FieldList,
      };
    this.state = {
    }
  }

  _onNavigationChange(type, route) {
    // console.log('On navigate change', type);
    // let {navigationState} = this.props;
    switch (type) {
      case 'push':
        this.props.actions.push(route);
        break;
      case 'pop':
        this.props.actions.pop();
        break;
      case 'home':
        this.props.actions.goToHome();
        break;
    }
  }

  componentDidMount() {
    // CONFIG WHEN CLICK BACKBUTTON OF ANDOIRD
    BackAndroid.addEventListener('hardwareBackPress', () => {
      if (this.props.navigationState.routes.length > 1) {
        this._onNavigationChange('pop');
        return true;
      }
      return false;
    });
  }

  navigatorRenderScene(route, navigator) {
    // console.log(JSON.stringify(route));
    this.navigator = navigator;
    let RenderComponent = this.components[route.scene.route.id];
    return (
      <RenderComponent navigator={navigator} {...route.scene.route} navigator={this._onNavigationChange.bind(this)} />
    );
  }

  render() {
    return (
        <NavigationCardStack
          //direction='vertical'
          navigationState={this.props.navigationState}
          onNavigate={this._onNavigationChange.bind(this)}
          renderScene={this.navigatorRenderScene.bind(this)} />
        
    );
  }
}

export default connect(
  state => ({
    navigationState: state.nav.navigationState || defaultNavigationState,
  }),
  dispatch => ({ actions: bindActionCreators(ActionCreators, dispatch), dispatch })
)(AppNav);