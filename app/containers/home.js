import React, { Component } from 'react';
import {
    StyleSheet,
    Dimensions,
    View,
} from 'react-native';
import {
    Text,
    Button,
} from 'native-base';

import Config from '../../config';

// REDUX 
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ActionCreators } from '../actions';


const {height, width} = Dimensions.get('window');
class Home extends Component {

    constructor(props) {
        super(props);

        this.state = {
        }

    }

    componentDidMount() {

    }

    aboutPress() {
        this.props.navigator('push', {id: 'About', key: 'About'});
    }

    render() {
        return (
            <View style={styles.container}>
                <Text> Welcome to React Native! </Text>
                <Button block onPress={this.aboutPress.bind(this)}>
                    <Text>About author</Text>
                </Button>
            </View>
        );
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
});


export default connect(
    state => ({

    }),
    dispatch => ({ actions: bindActionCreators(ActionCreators, dispatch), dispatch })
)(Home);