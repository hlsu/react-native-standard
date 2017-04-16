import React, { Component, PropTypes } from 'react';
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


const {height, width} = Dimensions.get('window');
export default class ShowBlock extends Component {
    static propTypes = {
        items: PropTypes.array.isRequired,
        total: PropTypes.number.isRequired,
        index: PropTypes.number.isRequired,
    }

    render() {
        let items = this.props.items;
        let total = this.props.total;
        this.blockIdex = this.props.index;
        let itemsComponent = items.map((item, itemIndex) => {
            return <Text key = {'item' +itemIndex}>{item + ""}</Text>
        });
        return (
            <View style={styles.blockWeight}>
                <View  style={styles.blockWeightDetail}>
                    {itemsComponent}
                </View>
                <Text>{total + ""}</Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
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


// export default connect(
//     state => ({

//     }),
//     dispatch => ({ actions: bindActionCreators(ActionCreators, dispatch), dispatch })
// )(ShowBlock);