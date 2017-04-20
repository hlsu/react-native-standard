import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    AsyncStorage,
} from 'react-native';
import {
    Text,
    Container,
    Header,
    Title,
    Body,
    List,
    ListItem,
    Icon,
    Content,
    Button,
    H2,
    Left
} from 'native-base';

import Config from '../../config';
import { SELLING_KEY_STORAGE } from '../common/const';

// REDUX 
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ActionCreators } from '../actions';

class HistorySelling extends Component {

    constructor(props) {
        super(props);
        this.state = {
            historySellingData: []
        }
    }

    componentDidMount() {
        AsyncStorage.getAllKeys((error, keys) => {
            let sellingKeys = keys.filter(k => k.indexOf(SELLING_KEY_STORAGE) != -1);
            // console.log(sellingKeys)
            AsyncStorage.multiGet(sellingKeys, (err, data) => {
                let historySellingData = data.map(d => {
                    return JSON.parse(d[1]);
                })
                this.setState({
                    historySellingData: historySellingData
                })
            });
        });
    }

    renderHistory() {
        let historiesComponent = this.state.historySellingData.map(k => {
            let info = k.info;
            let date = new Date(k.id);
            return (
                <ListItem button key={k.id}>
                    <View style={{ flex: 1, flexDirection: 'column', alignSelf: 'flex-start' }}>
                        <Text style={{ fontSize: 19, fontWeight: 'bold'}}>{info.field.name + ': ' + info.vuLua.name + ' - ' + info.year}</Text>
                        <Text>{"Tổng số bao: " + k.count}</Text>
                        <Text>{"Tổng ký: " + (k.sum - (+k.subtractVolumn))}kg ({"đã trừ bao " + k.subtractVolumn}kg)</Text>
                        <Text>{"Tiền: " + 123456789}</Text>
                        <Text>{"Ngày: " + date.getDay() + "/" + date.getMonth() + "/" + date.getFullYear() + " " + date.toLocaleTimeString()}</Text>
                    </View>
                </ListItem>
            )
        })
        return (
            <List>
                {historiesComponent}
            </List>
        );
    }

    render() {

        return (
            <Container>
                <Header>
                    <Body>
                        <Title>Lịch sử bán lúa</Title>
                    </Body>
                </Header>
                <Content>
                    {this.renderHistory()}
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
)(HistorySelling);