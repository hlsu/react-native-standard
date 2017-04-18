import React, { Component } from 'react';
import {
    StyleSheet,
    Dimensions,
    View,
    ScrollView,
    Image,
    TouchableOpacity,
    Modal,
    AsyncStorage,
    ToastAndroid,
    Alert,
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
    Title,
    Item,
    Label,
    Card,
    CardItem,
    Form,
    Textarea,
    H1
} from 'native-base';
import _ from 'lodash';

import Config from '../../config';
import { FIELD_KEY_STORAGE } from '../common/const';

// REDUX 
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ActionCreators } from '../actions';

const {height, width} = Dimensions.get('window');
const logo = require('../images/lua.png');
class FieldList extends Component {

    constructor(props) {
        super(props);

        this.state = {
            modalOpen: false,
            fields: [],
            newField: {},
            mode: 'create',
        }
    }

    componentDidMount() {
        // AsyncStorage.removeItem(FIELD_KEY_STORAGE);
        AsyncStorage.getItem(FIELD_KEY_STORAGE, (err, data) => {
            if (!err && !_.isEmpty(data)) {
                this.setState({
                    fields: JSON.parse(data)
                });
            }
        });
    }

    inputNewFieldChange(value, fieldName) {
        let newField = this.state.newField || {};
        newField[fieldName] = value;
        this.setState({
            newField: newField
        });
    }

    okButtonPress() {
        let fields = this.state.fields;
        let newField = this.state.newField;
        if (this.state.mode == 'create') {
            newField.id = new Date().getTime();
            if (_.isEmpty(fields)) {
                fields = [newField];
            } else {
                fields.push(newField);
            }
        } else {
            fields = fields.map(f => {
                if(f.id == newField.id) {
                    return newField;
                }
                return f;
            });
        }



        this.setState({
            fields: fields,
            newField: {},
            modalOpen: false,
        });

        AsyncStorage.setItem(FIELD_KEY_STORAGE, JSON.stringify(fields));
        ToastAndroid.show('Công ruộng đã được cập nhật', ToastAndroid.LONG);
    }

    deleteField(deleteField) {
        let fields = this.state.fields
            .filter(f => f.id != deleteField.id);
        this.setState({
            fields: fields,
        });
        AsyncStorage.setItem(FIELD_KEY_STORAGE, JSON.stringify(fields));
        ToastAndroid.show('Công ruộng "' + deleteField.name + '" đã được xóa', ToastAndroid.LONG);
    }

    _deleteButtonPress(deleteField) {
        Alert.alert(
            'Xóa ruộng',
            'Bạn có chắc muốn xóa miến ruộng "' + deleteField.name + '"',
            [
                { text: 'Không', onPress: () => console.log('Cancel Pressed'), style: 'cancel' },
                { text: 'Có', onPress: () => this.deleteField(deleteField) },
            ],
            { cancelable: false }
        )
    }

    _editButtonPress(editField) {
        this.setState({
            modalOpen: true,
            mode: 'edit',
            newField: editField,
        });
    }

    renderList() {
        let fields = this.state.fields;
        if (_.isEmpty(fields)) {
            return <Text>Bạn chưa có ruộng nào</Text>
        } else {
            return fields.map(f => {
                return <Card key={f.name}>
                    <CardItem header>
                        <Left>
                            <Text>{f.name}</Text>
                        </Left>
                        <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'flex-end' }}>
                            <Button bordered warning style={{ padding: 5, margin: 5 }}
                                onPress={() => this._editButtonPress(f)}>
                                <Icon name="md-create" />
                            </Button>
                            <Button bordered danger style={{ padding: 5, margin: 5 }}
                                onPress={() => this._deleteButtonPress(f)}>
                                <Icon name="md-close" />
                            </Button>
                        </View>
                    </CardItem>
                    <CardItem>
                        <Body>
                            <Text>
                                {f.description}
                            </Text>
                        </Body>
                    </CardItem>
                    <CardItem header>
                        <Text>{f.num + ' công'}</Text>
                    </CardItem>
                </Card>
            });
        }
    }

    renderAddModal() {
        return (
            <Modal
                animationType="slide"
                transparent={false}
                visible={this.state.modalOpen}
                onRequestClose={() => { this.setState({ modalOpen: false }) }}>
                <View>
                    <H1>Thêm ruộng</H1>
                    <Form>
                        <Item inlineLabel>
                            <Label>Tên</Label>
                            <Input value={this.state.newField.name}
                                onChangeText={(value) => this.inputNewFieldChange(value, 'name')} />
                        </Item>
                        <Item inlineLabel last>
                            <Label>Mô tả</Label>
                            <Input value={this.state.newField.description}
                                onChangeText={(value) => this.inputNewFieldChange(value, 'description')} />
                        </Item>
                        <Item inlineLabel last>
                            <Label>Số công</Label>
                            <Input keyboardType='numeric'
                                value={this.state.newField.num}
                                onChangeText={(value) => this.inputNewFieldChange(value, 'num')} />
                        </Item>
                    </Form>
                    <View style={styles.buttonGroup}>
                        <Button style={styles.buttonAction}
                            onPress={() => this.setState({ modalOpen: false })}>
                            <Text>Hủy</Text>
                        </Button>
                        <Button style={styles.buttonAction}
                            onPress={this.okButtonPress.bind(this)}>
                            <Text>OK</Text>
                        </Button>
                    </View>
                </View>
            </Modal>
        )
    }

    render() {
        return (
            <Container>
                <Header>
                    <Body>
                        <Title>Quản lý ruộng</Title>
                    </Body>
                    <Right>
                        <Button transparent onPress={() => this.setState({ modalOpen: true, mode: 'create' })}>
                            <Icon name='md-add' />
                        </Button>
                    </Right>
                </Header>
                <Content>
                    {this.renderList()}
                    {this.renderAddModal()}
                </Content>
            </Container>
        );
    }
}


const styles = {
    buttonGroup: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center'
    },
    buttonAction: {
        flex: 1,
        margin: 10,
        justifyContent: 'center'
    }
};


export default connect(
    state => ({

    }),
    dispatch => ({ actions: bindActionCreators(ActionCreators, dispatch), dispatch })
)(FieldList);