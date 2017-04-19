import React, { Component } from 'react';
import {
    StyleSheet,
    Dimensions,
    View,
    ScrollView,
    AsyncStorage,
} from 'react-native';
import {
    Text,
    Button,
    Content,
    Container,
    InputGroup,
    Icon,
    Input,
    Header,
    Left,
    Right,
    Body,
    Title
} from 'native-base';
import _ from 'lodash';

import Config from '../../config';
import { SELLING_KEY_STORAGE } from '../common/const';

// REDUX 
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ActionCreators } from '../actions';

import ShowBlock from '../components/showBlock';


const {height, width} = Dimensions.get('window');
class InputWeight extends Component {

    constructor(props) {
        super(props);

        this.state = {
            blocks: [],
            currentBlockIndex: 0,
            sum: 0,
            input: null,
        }

    }

    componentDidMount() {
        AsyncStorage.getItem(SELLING_KEY_STORAGE + '-' + this.props.sellingId, (error, data) => {
            console.log(data);
        });
    }

    addMore() {
        let value = this.state.input;
        if(_.isEmpty(value)) {
            return;
        }
        value = +value;
        let blocks = this.state.blocks;
        let currentBlockIndex = this.state.currentBlockIndex;
        let sum = this.state.sum + value;
        let isCrolled = false;
        let block = blocks[currentBlockIndex];
        if(!block) {
            // create new Block
            block = {items: [], total: 0};
            blocks.push(block);
            isCrolled = true;
        }
        // add to current block
        block.items.push(value);
        block.total += value;
        if(block.items.length == 5) {
            currentBlockIndex++;
        }
        
        this.setState({
            blocks: blocks,
            currentBlockIndex: currentBlockIndex,
            sum: sum,
            input: null,
        });
        if(isCrolled)
            setTimeout(() => {this._scrollView.scrollToEnd({ animated: true})}, 500);
    }

    _okPress() { 
        let sellingId = this.props.sellingId;
        AsyncStorage.mergeItem(SELLING_KEY_STORAGE + '-' + sellingId, JSON.stringify({
            detail: this.state.blocks,
            sum: this.state.sum
        }));
        this.props.navigator('push', {id: 'InputSubtract', key: 'InputSubtract', sellingId: sellingId});
    }

    render() {
        let blocksComomponent = this.state.blocks.map((block, index) => {
            return <ShowBlock total={block.total} items={block.items} index={index} key={'block-' + index} />;
        })
        return (
            <Container>
                <Header>
                    {/*<Left>
                        <Button transparent>
                            <Icon name='arrow-back' />
                        </Button>
                    </Left>*/}
                    <Body>
                        <Title>Nhập liệu</Title>
                    </Body>
                    <Right>
                        <Button transparent>
                            <Icon name='ios-close' />
                        </Button>
                        <Button transparent onPress={this._okPress.bind(this)}>
                            <Icon name='ios-checkmark' />
                        </Button>
                    </Right>
                </Header>
                    <View style={styles.container}>
                        <ScrollView horizontal={true} ref={(ref) => this._scrollView = ref}>
                            <View style={styles.allWeight}>
                                {blocksComomponent}
                            </View>
                        </ScrollView>
                        <Text>{"Tổng: " + this.state.sum}</Text>
                        <InputGroup>
                            <Icon name='ios-add-circle-outline' style={{color:'#00C497'}}/>
                            <Input keyboardType = 'numeric' 
                                    placeholder='Nhập vào số ký'
                                    blurOnSubmit={false}
                                    value={this.state.input}
                                    onSubmitEditing={this.addMore.bind(this)}
                                    onChangeText={(input) => this.setState({input})} />
                        </InputGroup>
                    </View>
            </Container>
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