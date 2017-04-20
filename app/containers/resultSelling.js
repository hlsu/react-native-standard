import React, { Component } from 'react';
import {
    StyleSheet,
    Dimensions,
    View,
    ScrollView,
    Image,
    AsyncStorage,
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
    H2,
    Card,
    CardItem
} from 'native-base';

import _ from 'lodash';

import Config from '../../config';
import { SELLING_KEY_STORAGE } from '../common/const';
import CommonUtils from '../common/commonUtils';

// REDUX 
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ActionCreators } from '../actions';

const {height, width} = Dimensions.get('window');
const logo = require('../images/lua.png');
class ResultSelling extends Component {

    constructor(props) {
        super(props);

        this.state = {
        }
    }

    componentDidMount() {
        let sellingId = this.props.sellingId || 1492617455226   ;
        AsyncStorage.getItem(SELLING_KEY_STORAGE + '-' + sellingId, (error, dataStr) => {
            console.log(dataStr);
            let data = JSON.parse(dataStr);
            let info = data.info;
            let price = +data.info.price;
            let total = data.sum;
            let subtractVolumn = +data.subtractVolumn;
            let finalTotal = total - subtractVolumn;
            let finalMoney = finalTotal * price;
            let moneyStr = CommonUtils.convertNumberToString(finalMoney);
            let count = data.count || 0;

            this.setState({
                info: info,
                price: price,
                total: total,
                subtractVolumn: subtractVolumn,
                finalTotal: finalTotal,
                finalMoney: finalMoney,
                moneyStr: moneyStr,
                count: count
            })
        });
    }

    renderContent() {
        if (this.state.info) {
            return (
                <View>
                    <H2>{'Ruộng: ' + this.state.info.field.name}</H2>
                    <Card>
                        <CardItem>
                            <Body>
                                <Text>{'Vụ ' + this.state.info.vuLua.name + ' năm ' + this.state.info.year}</Text>
                                <Text>{'Số công: ' + this.state.info.field.num}</Text>
                                <Text>{'Giá bán: ' + this.state.price}</Text>
                            </Body>
                        </CardItem>
                    </Card>
                    <Card>
                        <CardItem>
                            <Body>
                                <Text>{'Tổng số bao: ' + this.state.count}</Text>
                                <Text>{'Tổng số ký: ' + this.state.total}</Text>
                                <Text>{'Trừ bao: ' + this.state.subtractVolumn}</Text>
                                <Text>{'Tổng cuối: ' + this.state.finalTotal}</Text>
                            </Body>
                        </CardItem>
                    </Card>
                    <Card>
                        <CardItem>
                            <Body>
                                <Text>{'Tổng tiền: ' + this.state.finalMoney}</Text>
                                <Text>{this.state.moneyStr}</Text>
                            </Body>
                        </CardItem>
                    </Card>
                </View>
            )
        }
        return null;
    }

    done() {
        let sellingId = this.props.sellingId;
        AsyncStorage.mergeItem(SELLING_KEY_STORAGE + '-' + sellingId, JSON.stringify({
            done: true
        }));
        this.props.navigator('home');
    }

    renderActionButton() {
        return (
            <View>
                <Button block primary onPress={this.done.bind(this)}>
                    <Text>Xong</Text>
                </Button>
            </View>
        )
    }

    render() {
        return (
            <Container>
                <Header>
                    <Body>
                        <Title>Kết quả</Title>
                    </Body>
                </Header>
                <Content>
                    {this.renderContent()}
                    {this.renderActionButton()}
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
)(ResultSelling);