import React, { Component } from 'react';
import {
    StyleSheet,
    Dimensions,
    View,
    ScrollView,
    Image
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
                <View>
                    <H2>Miến đìa bình bát</H2>
                    <Text>Vụ đông xuân năm 2017</Text>
                    <Text>---</Text>
                    <Text>Tổng số bao: 124 bao</Text>
                    <Text>Tổng số ký: 12036kg</Text>
                    <Text>Trừ bao: 8kg</Text>
                    <Text>Tổng: 12354kg</Text>
                    <Text>Giá: 5550 đồng</Text>
                    <Text>---</Text>
                    <Text>Thành tiền: 1.223.213.121</Text>
                    <Text>Một tỉ, 2 trăm bảy mươi lăm triệu, bảy mười mốn ngàn chẳn</Text>
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
)(ResultSelling);