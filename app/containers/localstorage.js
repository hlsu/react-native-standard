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
    Button
} from 'native-base';

import Config from '../../config';

// REDUX 
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ActionCreators } from '../actions';

export default class LocalStorage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            keys: []
        }
    }

    componentDidMount() {
        AsyncStorage.getAllKeys((error, keys) => {
            this.setState({
                keys: keys
            })
        });
    }

    deleteStoraged(key) {
        AsyncStorage.removeItem(key);
        let keys = this.state.keys.filter(k=>k!=key);
        this.setState({
            keys: keys
        })
    }

    render() {
        let keysComponent = this.state.keys.map(k => {
            return (
                <ListItem key={k} style={{flex: 1, flexDirection: 'row', justifyContent: 'space-between'}}>
                    <Text>{k}</Text>
                    <Button transparent onPress={this.deleteStoraged.bind(this, k)}>
                        <Icon name="md-close" style={{color: 'red'}} />
                    </Button>
                </ListItem>
            )
        })
        return (
            <Container>
                <Header>
                    <Body>
                        <Title>LocalStorage</Title>
                    </Body>
                </Header>
                <Content>
                    <List>
                        {keysComponent}
                    </List>
                </Content>
            </Container>
        );
    }
}


const styles = {

};


// export default connect(
//     state => ({

//     }),
//     dispatch => ({ actions: bindActionCreators(ActionCreators, dispatch), dispatch })
// )(LocalStorage);