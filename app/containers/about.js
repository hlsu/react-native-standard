import React, { Component } from 'react';
import {
    StyleSheet,
    Dimensions,
    View,
    Image,
} from 'react-native';
import {
    Text,
    Button,
    Container,
    Content,
    H1,
} from 'native-base';

import Config from '../../config';

// REDUX 
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ActionCreators } from '../actions';


const {height, width} = Dimensions.get('window');
const author = require('../images/author.jpg');
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
            <Container>
                <Content scrollEnabled={false}>
                    <Image source={author} style={styles.author} />
                    <View style={styles.information}>
                        <Text style={{
                            fontSize: 21,
                            fontWeight: 'bold'
                            }}>Võ Minh Quân (MrllKing)</Text>
                        <Text style={{
                            fontWeight: 'bold',
                            margin: 3
                            }}>Software Developer</Text>
                        <Text style={{
                            margin: 3
                            }}>Độc thân vui tính :), ai có con giá địa chủ 100 công đất giới thiệu cho cũng được :P</Text>
                        <Text style={{
                            margin: 3
                            }}>Sở thích: Du lịch, game, guitar ...</Text>
                        <Text style={{
                            margin: 3,
                            fontWeight: 'bold',
                            }}>Thông tin liên hệ</Text>
                        <Text style={{
                            margin: 3,
                            }}>Email: minhquan703@gmail.com</Text>
                        <Text style={{
                            margin: 3,
                            }}>Số điện thoại:{'\n'} 08 8686 0506</Text>
                    </View>
                </Content>
            </Container>
        );
    }
}


const styles = StyleSheet.create({
    logo: {
        height: 150,
        width: 200,
        alignSelf: 'center',
    },
    information: {
        width: 200,
        height: 380,
        backgroundColor: 'white',
        opacity: .5,
        position: 'absolute',
        left: 10,
        top: 10
    }
});


export default connect(
    state => ({

    }),
    dispatch => ({ actions: bindActionCreators(ActionCreators, dispatch), dispatch })
)(About);