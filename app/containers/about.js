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
class About extends Component {

    constructor(props) {
        super(props);

        this.state = {
        }

    }

    componentDidMount() {

    }

     backPress() {
         this.props.navigator('pop');
     }

    render() {
        return (
            <View style={styles.container}>
                <Text>
                    About me
                </Text>
                <Text>
                    Author: Quan Vo (minhquan703@gmai.com)
                </Text>
                <Button block onPress={this.backPress.bind(this)}>
                    <Text>Back</Text>
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
    }
});


export default connect(
    state => ({

    }),
    dispatch => ({ actions: bindActionCreators(ActionCreators, dispatch), dispatch })
)(About);