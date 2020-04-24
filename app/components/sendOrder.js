import React from 'react';
import {
    View, StyleSheet,
    BackHandler, Text,
    TouchableHighlight,
    Dimensions, TextInput,
    TouchableWithoutFeedback,
    ScrollView, KeyboardAvoidingView
} from 'react-native';

import { AppLoading } from 'expo';
import firebase from '../firebase';
import Icon from "react-native-vector-icons/FontAwesome";

export default class SendOrder extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            adress: '',
            phone: '',
            payment: 'Efectivo',
            pickUp: 'Domicilio',
            comments: '',
            subtotal: this.props.state.total,
            deliveryPrice: 1500,
            isLoading: true,
        }
        this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
    }
    componentWillMount() {
        BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick);
        let _this = this;
        if (firebase.auth().currentUser.uid !== null) {
            var userId = firebase.auth().currentUser.uid;
            firebase.database().ref('/users/' + userId).once('value').then(function (snapshot) {
                _this.setState({
                    phone: (snapshot.val() && snapshot.val().phone),
                    adress: (snapshot.val() && snapshot.val().adress),
                })
                _this.setState({ isLoading: false });
            });
        }
    }

    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.handleBackButtonClick);
    }

    handleBackButtonClick() {
        this.updateState({ isSelectedSendOrder: false })
        return true;
    }

    updateState = (data) => {
        this.props.updateParentParentState(data);
    }

    onPressPayment = (type) => {
        if (type === 'Efectivo') this.setState({ payment: type })
        if (type === 'Tarjeta') this.setState({ payment: type })
    }

    onPressPickUp = (type) => {
        if (type === 'Tienda') this.setState({ pickUp: type })
        if (type === 'Domicilio') this.setState({ pickUp: type })
    }

    render() {
        var icon = <Icon name={'check-square-o'} color="#6E6E6E" size={16} />
        var icon_square = <Icon name={'square-o'} style={{ marginRight: 2 }} color="#6E6E6E" size={16} />

        var deliveryPrice = 0;
        if (this.state.pickUp === 'Domicilio') { deliveryPrice = this.state.deliveryPrice }
        var total = this.state.subtotal + deliveryPrice;
        if (this.state.isLoading) {
            return (
                <AppLoading />
            )
        }
        return (

            <KeyboardAvoidingView style={styles.container} behavior='position'>
                <Text style={styles.title}>Finalizar Orden</Text>
                <View style={styles.containerScroll}>
                    <ScrollView showsVerticalScrollIndicator={false}>
                        <Text style={styles.inputTitle}>Método de pago</Text>
                        <TouchableWithoutFeedback onPress={() => this.onPressPayment('Efectivo')}>
                            <View style={styles.cashOrCredit}>
                                <View style={{ flex: 9 }}>
                                    <Text style={styles.subTitle}>Efectivo</Text>
                                </View>
                                <View style={{ flex: 1, alignItems: 'flex-end' }}>
                                    {this.state.payment === 'Tarjeta' && icon_square}
                                    {this.state.payment === 'Efectivo' && icon}
                                </View>
                            </View>
                        </TouchableWithoutFeedback>
                        <TouchableWithoutFeedback onPress={() => this.onPressPayment('Tarjeta')}>
                            <View style={styles.cashOrCredit}>
                                <View style={{ flex: 9 }}>
                                    <Text style={styles.subTitle}>Tarjeta de credito</Text>
                                </View>
                                <View style={{ flex: 1, alignItems: 'flex-end' }}>
                                    {this.state.payment === 'Efectivo' && icon_square}
                                    {this.state.payment === 'Tarjeta' && icon}
                                </View>
                            </View>
                        </TouchableWithoutFeedback>
                        <Text style={styles.inputTitle}>Recoger en</Text>
                        <TouchableWithoutFeedback onPress={() => this.onPressPickUp('Domicilio')}>
                            <View style={styles.cashOrCredit}>
                                <View style={{ flex: 9 }}>
                                    <Text style={styles.subTitle}>A domicilio</Text>
                                </View>
                                <View style={{ flex: 1, alignItems: 'flex-end' }}>
                                    {this.state.pickUp === 'Tienda' && icon_square}
                                    {this.state.pickUp === 'Domicilio' && icon}
                                </View>
                            </View>
                        </TouchableWithoutFeedback>
                        <TouchableWithoutFeedback onPress={() => this.onPressPickUp('Tienda')}>
                            <View style={styles.cashOrCredit}>
                                <View style={{ flex: 9 }}>
                                    <Text style={styles.subTitle}>Tienda</Text>
                                </View>
                                <View style={{ flex: 1, alignItems: 'flex-end' }}>
                                    {this.state.pickUp === 'Domicilio' && icon_square}
                                    {this.state.pickUp === 'Tienda' && icon}
                                </View>
                            </View>
                        </TouchableWithoutFeedback>
                        {this.state.pickUp === 'Tienda' &&
                            <View>
                                <Text style={styles.inputTitle}>Celular</Text>
                                <TextInput
                                    style={styles.textInput}
                                    value={this.state.phone}
                                    placeholderTextColor='gray'
                                    autoCorrect={false}
                                    onChangeText={(phone) => this.setState({ phone: phone })}
                                />
                            </View>}
                        {this.state.pickUp === 'Domicilio' &&
                            <View>
                                <Text style={styles.inputTitle}>Celular</Text>
                                <TextInput
                                    style={styles.textInput}
                                    value={this.state.phone}
                                    placeholderTextColor='gray'
                                    autoCorrect={false}
                                    onChangeText={(phone) => this.setState({ phone: phone })}
                                    onSubmitEditing={() => { this.adress.focus(); }}
                                    blurOnSubmit={false}
                                />

                                <Text style={styles.inputTitle}>Dirección</Text>
                                <TextInput
                                    ref={(input) => { this.adress = input; }}
                                    style={styles.textInput}
                                    value={this.state.adress}
                                    placeholderTextColor='gray'
                                    autoCorrect={false}
                                    onChangeText={(adress) => this.setState({ adress: adress })}
                                />
                            </View>}
                        <Text style={styles.inputTitle}>Comentarios</Text>
                        <TextInput
                            style={styles.textInputComments}
                            multiline={true}
                            placeholderTextColor='gray'
                            maxLength={200}
                            onChangeText={(comments) => this.setState({ comments: comments })}
                        />

                        <View style={styles.cashOrCredit}>
                            <View style={{ flex: 7 }}>
                                <Text style={styles.subTitle}>Subtotal</Text>
                            </View>
                            <View style={{ flex: 3, alignItems: 'flex-end' }}>
                                <Text style={styles.subTitle}>$ {this.state.subtotal}</Text>
                            </View>
                        </View>
                        <View style={styles.cashOrCredit}>
                            <View style={{ flex: 7 }}>
                                <Text style={styles.subTitle}>Costo Domicilio</Text>
                            </View>
                            <View style={{ flex: 3, alignItems: 'flex-end' }}>
                                <Text style={styles.subTitle}>$ {deliveryPrice}</Text>
                            </View>
                        </View>
                        <View style={styles.cashOrCredit}>
                            <View style={{ flex: 7 }}>
                                <Text style={styles.totalText}>Total</Text>
                            </View>
                            <View style={{ flex: 3, alignItems: 'flex-end' }}>
                                <Text style={styles.totalText}>$ {total}</Text>
                            </View>
                        </View>
                    </ScrollView>
                </View>

                <View style={styles.containerButtons}>
                    <TouchableHighlight onPress={() => {
                        this.updateState({ isSelectedSendOrder: false })
                    }} underlayColor="white">
                        <View style={styles.button}>
                            <Text style={styles.buttonText}>Cancelar</Text>
                        </View>
                    </TouchableHighlight>

                    <TouchableHighlight onPress={() => this.props.send(this.state, total)} underlayColor="white">
                        <View style={styles.buttonOrange}>
                            <Text style={styles.buttonTextOrange}>Enviar Pedido</Text>
                        </View>
                    </TouchableHighlight>
                </View>
            </KeyboardAvoidingView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fafafa',
        flexDirection: 'column',
        alignItems: 'center',
    },
    containerScroll: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fafafa',
    },
    containerButtons: {
        width: Dimensions.get('window').width,
        flexDirection: 'row',
        justifyContent: 'space-evenly',
    },
    cashOrCredit: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        //paddingLeft: 15,
        //paddingRight: 15,
        marginTop: 10,
        marginBottom: 10,
    },
    button: {
        width: Dimensions.get('window').width / 2,
        alignItems: 'center',
        backgroundColor: '#fafafa',
    },
    buttonOrange: {
        width: Dimensions.get('window').width / 2,
        alignItems: 'center',
        backgroundColor: '#fafafa',
        borderLeftWidth: .5,
        borderColor: '#c0c0c0',
    },
    buttonText: {
        fontFamily: 'open-sans-bold',
        padding: 15,
        fontSize: 18,
        color: 'gray',
    },
    buttonTextOrange: {
        fontFamily: 'open-sans-bold',
        padding: 15,
        fontSize: 18,
        color: '#DE7047',
    },
    title: {
        textAlign: 'center',
        fontFamily: 'open-sans',
        fontSize: 20,
        color: '#211414',
        marginTop: 15,
        marginBottom: 15,
    },
    subTitle: {
        fontFamily: 'open-sans',
        fontSize: 14,
        color: 'gray',
    },
    textInput: {
        height: 35,
        backgroundColor: '#fff',
        width: 300,
        paddingLeft: 15,
        borderRadius: 3,
        shadowColor: '#c0c0c0',
        shadowOpacity: .5,
        elevation: 1,
    },
    textInputComments: {
        height: 75,
        backgroundColor: '#fff',
        marginBottom: 15,
        width: 300,
        padding: 10,
        borderRadius: 3,
        shadowColor: '#c0c0c0',
        shadowOpacity: .5,
        elevation: 1,
        textAlignVertical: 'top',
    },
    inputTitle: {
        //backgroundColor: '#fff',
        fontFamily: 'open-sans-bold',
        color: '#211414',
        marginTop: 15,
        fontSize: 14,
        marginBottom: 10,
    },
    totalText: {
        fontFamily: 'open-sans-bold',
        fontSize: 14,
        color: '#211414',
    },
});
