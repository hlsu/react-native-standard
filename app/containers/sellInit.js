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
} from 'native-base';

import _ from 'lodash';

import Config from '../../config';
import { FIELD_KEY_STORAGE, SELLING_KEY_STORAGE } from '../common/const';

// REDUX 
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ActionCreators } from '../actions';

const {height, width} = Dimensions.get('window');
const logo = require('../images/lua.png');
class SellInit extends Component {

    constructor(props) {
        super(props);

        this.state = {
            vuLua: [],
            years: [],
            fields: [],
        }
    }

    componentDidMount() {
        let vuLuas = [
                        {
                            name: 'Đông Xuân',
                            value: 'DongXuan'
                        },
                        {
                            name: 'Hè Thu',
                            value: 'HeThu'
                        },
                        {
                            name: 'Thu Đông',
                            value: 'ThuDong'
                        }
                    ];
        let currentYear = new Date().getFullYear();
        let currentVuLua = this.getVuLua(vuLuas);

        // AsyncStorage.getAllKeys((error, data) => {
        //     console.log(data);
        //     data.forEach(k => {
        //         if(k.indexOf(SELLING_KEY_STORAGE) != -1) {
        //             AsyncStorage.removeItem(k);
        //             console.log('remove key', k)
        //         }
        //     });
        // })

        AsyncStorage.getItem(FIELD_KEY_STORAGE, (err, data) => {
            if (!err && !_.isEmpty(data)) {
                let fields = JSON.parse(data);
                this.setState({
                    fields: fields,
                    vuLua: vuLuas,
                    years: [currentYear, currentYear - 1],
                    selectedVuLua: currentVuLua,
                    selectedYear: currentYear,
                    selectedField: fields[0],
                });
            }
        });
    }

    getVuLua(vuLuas) {
        let month = new Date().getMonth();
        if (month >= 0 && month < 6) {
            return vuLuas[0];
        } else if (month >= 6 && month <= 10) {
            return vuLuas[1];
        } else {
            return vuLuas[2];
        }
    }

    renderVuLuaPicker() {
        if (_.isEmpty(this.state.vuLua))
            return null;

        let vuLuaItems = this.state.vuLua.map(v => {
            return (
                <Picker.Item key={v.value} label={v.name} value={v} />
            )
        });
        return (
            <Picker
                mode="dropdown"
                selectedValue={this.state.selectedVuLua}
                onValueChange={(selected) => this.setState({ selectedVuLua: selected })}
            >
                {vuLuaItems}
            </Picker>
        );
    }

    renderYearPicker() {
        if (_.isEmpty(this.state.years))
            return null;

        let yearItems = this.state.years.map(v => {
            return (
                <Picker.Item key={"year-" + v} label={v + ""} value={v} />
            )
        });
        return (
            <Picker
                mode="dropdown"
                selectedValue={this.state.selectedYear}
                onValueChange={(selected) => this.setState({ selectedYear: selected })}
            >
                {yearItems}
            </Picker>
        );
    }

    renderFieldPicker() {
        if (_.isEmpty(this.state.fields))
            return null;

        let fieldItems = this.state.fields.map(v => {
            return (
                <Picker.Item key={v.id} label={v.name + ' - ' + v.num + ' công'} value={v} />
            )
        });
        return (
            <Picker
                mode="dropdown"
                selectedValue={this.state.selectedField}
                onValueChange={(selected) => this.setState({ selectedField: selected })}
            >
                {fieldItems}
            </Picker>
        );
    }

    _nextButtonPress() {
        // Store to localstorage
        if(_.isEmpty(this.state.price)) {
            ToastAndroid.show('Vui lòng nhập giá bán!', ToastAndroid.LONG);
            return;
        }

        let sellingId = this.state.sellingId || new Date().getTime();
        let sellingInfo = {
            vuLua: this.state.selectedVuLua,
            year: this.state.selectedYear,
            field: this.state.selectedField,
            price: this.state.price,
            id: sellingId
        }
        AsyncStorage.setItem(SELLING_KEY_STORAGE + '-' + sellingId, JSON.stringify({
            done: false,
            id: sellingId,
            info: sellingInfo,
        }));
        this.setState({
            sellingId: sellingId
        })
        this.props.navigator('push', { id: 'InputWeight', key: 'InputWeight', sellingId: sellingId });
    }

    render() {
        return (
            <Container>
                <Header>
                    <Body>
                        <Title>Bán lúa</Title>
                    </Body>
                    <Right>
                        <Button transparent onPress={this._nextButtonPress.bind(this)}>
                            <Text style={styles.nextButtion}>Tiếp theo</Text>
                        </Button>
                    </Right>
                </Header>
                <Content>
                    <Image source={logo} style={styles.logo} />

                    <Label>Vụ lúa</Label>
                    {this.renderVuLuaPicker()}

                    <Label>Năm</Label>
                    {this.renderYearPicker()}

                    <Label>Ruộng</Label>
                    {this.renderFieldPicker()}

                    <Label>Giá (vnd / 1 kg)</Label>
                    <Input keyboardType='numeric'
                        placeholder='Nhập giá ...'
                        value={this.state.price}
                        onChangeText={(price) => this.setState({ price })} />
                </Content>
            </Container>
        );
    }
}


const styles = {
    logo: {
        alignSelf: 'center',
        marginTop: 20,
        marginBottom: 10,
        height: 150,
        width: 150,
        borderRadius: 50,
    }
};


export default connect(
    state => ({

    }),
    dispatch => ({ actions: bindActionCreators(ActionCreators, dispatch), dispatch })
)(SellInit);