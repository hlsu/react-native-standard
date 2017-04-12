import React, { Component } from 'react';
import {
    StyleSheet,
    Dimensions,
    View,
    ScrollView,
} from 'react-native';
import {
    Text,
    Button,
    Content,
    Container,
} from 'native-base';
import _ from 'lodash';

import Config from '../../config';

// REDUX 
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ActionCreators } from '../actions';


const {height, width} = Dimensions.get('window');
class InputWeight extends Component {

    constructor(props) {
        super(props);

        this.state = {
            weights: []
        }

    }

    componentDidMount() {
        let weights = Array(900).fill().map(() => Math.floor(Math.random() * (70 - 50 + 1)) + 50);
        this.setState({
            weights: weights,
        })
    }

    addMore() {
        let newState = this.state.weights;
        newState.push(Math.floor(Math.random() * (70 - 50 + 1)) + 50);
        this.setState({
            weights: newState,
        });
        if(newState.length % 5 == 1)
            setTimeout(() => {this._scrollView.scrollToEnd({ animated: true})}, 500);
    }

    render() {
        if (!_.isEmpty(this.state.weights)) {
            let items = _.chunk(this.state.weights, 5);
            let itemsView = items.map((is, isindex) => {
                let itemView = is.map((i, iindex) => {
                    return (
                        <Text key={isindex * 5 + iindex}>{i}</Text>
                    )
                })
                let total = is.reduce((sum, v) => sum + v, 0);
                return (
                    <View key={'block' + isindex} style={styles.blockWeight}>
                        <View style={styles.blockWeightDetail}>
                            {itemView}
                        </View>
                        <Text>{total}</Text>
                    </View>
                )
            })
            return (
                <View style={styles.container}>
                    <ScrollView horizontal={true} ref={(ref) => this._scrollView = ref}>
                        <View style={styles.allWeight}>
                            {itemsView}
                        </View>
                    </ScrollView>
                    <Button block onPress={this.addMore.bind(this)}>
                        <Text>Add more</Text>
                    </Button>
                </View>
                
            );
        }
        return (
            <View style={styles.container}>
                <Text>loading</Text>
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
        // flexWrap: 'wrap',
        flexDirection: 'column',
    },
    allWeight: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
        // flexWrap: 'wrap',
        flexDirection: 'row',
    },
    blockWeight: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        margin: 10,
    },
    blockWeightDetail: {
        flexDirection: 'column',
        borderBottomColor: '#000000',
        borderBottomWidth: 1,
    }
});


export default connect(
    state => ({

    }),
    dispatch => ({ actions: bindActionCreators(ActionCreators, dispatch), dispatch })
)(InputWeight);