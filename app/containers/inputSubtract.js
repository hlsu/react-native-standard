import React, { Component } from 'react';
import {
    StyleSheet,
    Dimensions,
    View,
    ScrollView,
    Image,
    AsyncStorage,
    ToastAndroid
} from 'react-native';
import {
    Text,
    Button,
    Content,
    Container,
    List,
    ListItem,
    InputGroup,
    Icon,
    Input,
    Header,
    Left,
    Right,
    Body,
    Title,
    Thumbnail,
    Item,
    Label,
    Picker,
    H2
} from 'native-base';

import _ from 'lodash';

import Config from '../../config';
import { SELLING_KEY_STORAGE } from '../common/const';

// REDUX 
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ActionCreators } from '../actions';

const {height, width} = Dimensions.get('window');
const logo = require('../images/lua.png');
class InputSubtract extends Component {

    constructor(props) {
        super(props);

        this.state = {
        }
    }

    componentDidMount() {
        AsyncStorage.getItem(SELLING_KEY_STORAGE + '-' + this.props.sellingId, (erro, data) => {
            console.log(data);
        });
    }

    _okPress() {
        if(_.isEmpty(this.state.subtractVolumn)) {
            ToastAndroid.show('Vui lòng nhập số ký trừ!', ToastAndroid.LONG);
            return;
        }
        let sellingId = this.props.sellingId;
        AsyncStorage.mergeItem(SELLING_KEY_STORAGE + '-' + sellingId, JSON.stringify({
            subtractVolumn: this.state.subtractVolumn
        }));
        this.props.navigator('push', {id: 'ResultSelling', key: 'ResultSelling', sellingId: sellingId})
    }

    render() {
        return (
            <Container>
                <Header>
                    <Body>
                        <Title>Trừ bao</Title>
                    </Body>
                    <Right>
                        <Button transparent 
                            onPress={this._okPress.bind(this)}>
                            <Text style={styles.nextButtion}>Tiếp theo</Text>
                        </Button>
                    </Right>
                </Header>
                <Content>
                <View>
                    <Label>Trừ (kg)</Label>
                    <Input keyboardType = 'numeric' 
                            placeholder='Nhập số ký ...'
                            value={this.state.subtractVolumn}
                            onChangeText={(subtractVolumn) => this.setState({subtractVolumn})} />

                    <Text style={{fontStyle: 'italic'}}>* Thông thường 8 bao 1kg</Text>
                </View>
                </Content>
            </Container>
        );
    }
}


const styles = {

};


export default connect(
    state => ({

    }),
    dispatch => ({ actions: bindActionCreators(ActionCreators, dispatch), dispatch })
)(InputSubtract);