import React, { Component } from 'react';
import {
    StyleSheet,
    Dimensions,
    View,
    ScrollView,
    Image,
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
const logo = require('../images/lua.png');

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

    sellPress() {
        this.props.navigator('push', {id: 'SellInit', key: 'SellInit'});
        // this.props.navigator('push', {id: 'ResultSelling', key: 'ResultSelling'});
    }
    fieldListPress() {
        this.props.navigator('push', {id: 'FieldList', key: 'FieldList'});
    }

    render() {
        return (
            <View style={styles.container}>
                <Image source={logo} style={styles.logo} />
                <Button block style={styles.button} onPress={this.sellPress.bind(this)}>
                    <Text style={{height: 35,fontSize: 19}}>Bán lúa</Text>
                </Button>
                <Button block style={styles.button} onPress={this.fieldListPress.bind(this)}>
                    <Text style={{height: 35,fontSize: 19}}>Quản lý ruộng</Text>
                </Button>
                <Button block style={styles.button} onPress={this.aboutPress.bind(this)}>
                    <Text style={{height: 35,fontSize: 19}}>Thông tin tác giả</Text>
                </Button>
            </View>
        );
    }
}


const styles = {
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    logo: {
        height: 150,
        width: 150,
        alignSelf: 'center',
        marginBottom: 50,
        borderRadius: 50,
    },
    button: {
        height: 35,
        margin: 10,
    }
};


export default connect(
    state => ({

    }),
    dispatch => ({ actions: bindActionCreators(ActionCreators, dispatch), dispatch })
)(Home);