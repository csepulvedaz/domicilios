import React from 'react';
import {
    StyleSheet,
    Text, View, Image,
    TouchableWithoutFeedback,
    Dimensions, Alert, Modal,
    TouchableHighlight, ScrollView
} from 'react-native';
import { AppLoading } from 'expo';
import Icon from 'react-native-vector-icons/FontAwesome';

import firebase from '../firebase';
import Options from '../components/options';


export default class MainScreen extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            isSelectedOptions: false,
            isLoading: true,
            modalVisible: false,
            modalOrderVisible: [],
            adress: '',
            comments: '',
            order: [],
            payment: '',
            phone: '',
            pickUp: '',
            subtotal: 0,
            name: '',
            receivedOrders: [],
            orderInfo: [],
            counter: 0,
            position: [],
        };
    }

    updateState = (data) => {
        this.setState(data)
    }

    componentWillMount() {
        this.setState({ isLoading: false })
        //Alert.alert('¡Bienvenido!');
        let _this = this;
        let orders = firebase.database().ref('orders/')
        orders.orderByChild('timestamp').startAt(Date.now()).on('child_added', function (data) {
            _this.setModalVisible(!_this.state.modalVisible)
            console.log(data)
            _this.setState({
                adress: data.val().adress,
                comments: data.val().comments,
                order: data.val().order,
                payment: data.val().payment,
                phone: data.val().phone,
                pickUp: data.val().pickUp,
                subtotal: data.val().subtotal,
                name: data.val().name,
            })
        });
    }

    onPressOptions = () => {
        this.setState({ isSelectedOptions: true })
    }

    setModalVisible(visible) {
        this.setState({ modalVisible: visible });
    }

    onPressAccept = () => {
        this.setModalVisible(!this.state.modalVisible);
        let position = this.state.position;
        let counter = this.state.counter + 1;
        position.push(
            counter
        )
        this.setState({ counter: counter, position: position });
        let order = this.state.receivedOrders;
        let orderInfo = this.state.orderInfo;
        let modalOrder = this.state.modalOrderVisible;
        modalOrder.push(false)
        orderInfo.push(
            <View>
                <Text style={styles.modalText}>
                    Orden: {this.state.order}
                </Text>
                <Text style={styles.modalText}>
                    Total: {this.state.subtotal}
                </Text>
                <Text style={styles.modalText}>
                    Recoger en: {this.state.pickUp}
                </Text>
                <Text style={styles.modalText}>
                    Dirección: {this.state.adress}
                </Text>
                <Text style={styles.modalText}>
                    Método de pago: {this.state.payment}
                </Text>
                <Text style={styles.modalText}>
                    Celular: {this.state.phone}
                </Text>
                <Text style={styles.modalText}>
                    Comentarios: {this.state.comments}
                </Text>
                <Text style={styles.modalText}>
                    Cliente: {this.state.name}
                </Text>
            </View>
        )
        order.push(
            <View style={styles.containerOrder}>
                <Text style={styles.orderText}>
                    Orden # {this.state.counter + 1}
                </Text>
                <Text style={styles.orderText}>
                    Aceptado
                </Text>
            </View>
        )
        this.setState({ receivedOrders: order, orderInfo: orderInfo, modalOrderVisible: modalOrder })
    }

    onPressRejected = () => {
        this.setModalVisible(!this.state.modalVisible);
        let position = this.state.position;
        let counter = this.state.counter + 1;
        position.push(
            counter
        )
        this.setState({ counter: counter, position: position });
        let order = this.state.receivedOrders;
        let orderInfo = this.state.orderInfo;
        let modalOrder = this.state.modalOrderVisible;
        modalOrder.push(false)
        orderInfo.push(
            <View>
                <Text style={styles.modalText}>
                    Orden: {this.state.order}
                </Text>
                <Text style={styles.modalText}>
                    Total: {this.state.subtotal}
                </Text>
                <Text style={styles.modalText}>
                    Recoger en: {this.state.pickUp}
                </Text>
                <Text style={styles.modalText}>
                    Dirección: {this.state.adress}
                </Text>
                <Text style={styles.modalText}>
                    Método de pago: {this.state.payment}
                </Text>
                <Text style={styles.modalText}>
                    Celular: {this.state.phone}
                </Text>
                <Text style={styles.modalText}>
                    Comentarios: {this.state.comments}
                </Text>
                <Text style={styles.modalText}>
                    Cliente: {this.state.name}
                </Text>
            </View>
        )
        order.push(
            <View style={styles.containerOrderRejected}>
                <Text style={styles.orderText}>
                    Orden # {this.state.counter + 1}
                </Text>
                <Text style={styles.orderText}>
                    Rechazado
                </Text>
            </View>
        )
        this.setState({ receivedOrders: order, orderInfo: orderInfo, modalOrder: modalOrder })
    }

    onPressOrder = (index) => {
        let modalOrderVisible = this.state.modalOrderVisible
        modalOrderVisible[index] = true
        this.setState({ modalOrderVisible: modalOrderVisible })
    }

    onPressBack = (index) => {
        let modalOrderVisible = this.state.modalOrderVisible
        modalOrderVisible[index] = false
        this.setState({ modalOrderVisible: modalOrderVisible })
    }

    onPressSend = (index) => {
        let order = this.state.receivedOrders;
        let orderInfo = this.state.orderInfo;
        let modalOrderVisible = this.state.modalOrderVisible
        modalOrderVisible[index] = false
        let position = this.state.position
        position.push(
            position[index]
        )
        order.push(
            <View style={styles.containerOrderSended}>
                <Text style={styles.orderText}>
                    Orden # {position[index]}
                </Text>
                <Text style={styles.orderText}>
                    Enviado
                    </Text>
            </View>
        )
        orderInfo.push(
            orderInfo[index]
        )
        const resultOrder = order.filter((item, j) => index !== j)
        const resultOrderInfo = orderInfo.filter((item, j) => index !== j)
        const resultPosition = position.filter((item, j) => index !== j)
        this.setState({
            modalOrderVisible: modalOrderVisible,
            receivedOrders: resultOrder,
            orderInfo: resultOrderInfo,
            position: resultPosition,
        })
    }

    render() {
        var orderInfo = this.state.orderInfo;
        if (this.state.isLoading) {
            return (
                <AppLoading />
            )
        }
        return (
            <View style={styles.container}>
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={this.state.modalVisible}
                    onRequestClose={() => {
                        Alert.alert('Por favor acepte o rechace el pedido')
                    }}>
                    <View style={styles.modalContainer}>
                        <View style={styles.modalContent}>
                            <Text style={styles.title}>
                                Nuevo pedido
                            </Text>
                            <View>
                                <Text style={styles.modalText}>
                                    Orden: {this.state.order}
                                </Text>
                                <Text style={styles.modalText}>
                                    Total: {this.state.subtotal}
                                </Text>
                                <Text style={styles.modalText}>
                                    Recoger en: {this.state.pickUp}
                                </Text>
                                <Text style={styles.modalText}>
                                    Dirección: {this.state.adress}
                                </Text>
                                <Text style={styles.modalText}>
                                    Método de pago: {this.state.payment}
                                </Text>
                                <Text style={styles.modalText}>
                                    Celular: {this.state.phone}
                                </Text>
                                <Text style={styles.modalText}>
                                    Comentarios: {this.state.comments}
                                </Text>
                            </View>
                            <View style={styles.modalButtons}>

                                <TouchableHighlight onPress={this.onPressAccept} underlayColor="white">
                                    <View style={styles.button}>
                                        <Text style={styles.buttonText}>Aceptar</Text>
                                    </View>
                                </TouchableHighlight>

                                <TouchableHighlight onPress={this.onPressRejected} underlayColor="white">
                                    <View style={styles.buttonRed}>
                                        <Text style={styles.buttonText}>Rechazar</Text>
                                    </View>
                                </TouchableHighlight>
                            </View>
                        </View>
                    </View>
                </Modal>
                <View style={styles.containerImage}>
                    <Image
                        style={{ width: Dimensions.get('window').width / 1.5, height: Dimensions.get('window').width / 3, }}
                        source={require('../assets/images/logo.png')}
                    />
                </View>
                <View style={styles.options}>
                    <TouchableWithoutFeedback onPress={this.onPressOptions}>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                            <Icon
                                name="bars"
                                color='#c0c0c0'
                                size={25}
                            />
                            <Text style={{ marginLeft: 10, fontFamily: 'open-sans-bold', fontSize: 18, color: "#211414" }}>Opciones
                            </Text>
                        </View>
                    </TouchableWithoutFeedback>
                </View>
                <TouchableWithoutFeedback
                    onPress={() => {
                        this.setModalVisible(true);
                    }}>
                    <Text>Show Modal</Text>
                </TouchableWithoutFeedback>
                <View style={styles.scrollContainer}>
                    <ScrollView>
                        <View style={styles.contentContainer}>

                            {this.state.receivedOrders.map((item, index) => (
                                <TouchableHighlight onPress={() => this.onPressOrder(index)} key={index} underlayColor="#fafafa">
                                    <View>
                                        {item}
                                        <Modal
                                            animationType="slide"
                                            transparent={true}
                                            visible={this.state.modalOrderVisible[index]}
                                            onRequestClose={() => {
                                                //Alert.alert('Por favor acepte o rechace el pedido')
                                            }}>
                                            <View style={styles.modalContainer}>
                                                <View style={styles.modalContent}>
                                                    <Text style={styles.title}>
                                                        Pedido número {index + 1}
                                                    </Text>
                                                    {orderInfo[index]}
                                                    <View style={styles.modalButtons}>

                                                        <TouchableHighlight onPress={() => this.onPressBack(index)} underlayColor="white">
                                                            <View style={styles.button}>
                                                                <Text style={styles.buttonText}>Volver</Text>
                                                            </View>
                                                        </TouchableHighlight>

                                                        <TouchableHighlight onPress={() => this.onPressSend(index)} underlayColor="white">
                                                            <View style={styles.buttonBlue}>
                                                                <Text style={styles.buttonText}>Enviar</Text>
                                                            </View>
                                                        </TouchableHighlight>
                                                    </View>
                                                </View>
                                            </View>
                                        </Modal>
                                    </View>
                                </TouchableHighlight>
                            ))}
                        </View>
                    </ScrollView>
                </View>
                {this.state.isSelectedOptions && <Options updateState={this.updateState.bind(this)} />}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
        flex: 1,
        backgroundColor: '#fafafa',
        flexDirection: 'column',
        alignItems: 'center',
    },
    containerImage: {
        flex: 1,
        alignItems: 'center'
    },
    containerOrder: {
        width: Dimensions.get('window').width / 3 - 20,
        height: Dimensions.get('window').width / 3 - 20,
        borderRadius: 10,
        elevation: 3,
        alignItems: 'center',
        padding: 5,
        marginLeft: 15,
        marginTop: 15,
        backgroundColor: '#23D25B',
    },
    containerOrderRejected: {
        width: Dimensions.get('window').width / 3 - 20,
        height: Dimensions.get('window').width / 3 - 20,
        borderRadius: 10,
        elevation: 3,
        alignItems: 'center',
        padding: 5,
        marginLeft: 15,
        marginTop: 15,
        backgroundColor: '#d22342',
    },
    containerOrderSended: {
        width: Dimensions.get('window').width / 3 - 20,
        height: Dimensions.get('window').width / 3 - 20,
        borderRadius: 10,
        elevation: 3,
        alignItems: 'center',
        padding: 5,
        marginLeft: 15,
        marginTop: 15,
        backgroundColor: '#23d2b3',
    },
    options: {
        width: Dimensions.get('window').width - 40,
        //backgroundColor: '#ccc',
        alignItems: 'flex-end',
        flexDirection: 'row',
        justifyContent: 'space-between',
        //marginTop: -10,
    },
    scrollContainer: {
        flex: 3,
        marginTop: 15,
        width: Dimensions.get('window').width,
    },
    contentContainer: {
        backgroundColor: '#fafafa',
        //alignItems: 'stretch',
        flexDirection: 'row',
        flexWrap: 'wrap',
        paddingBottom: 15,
    },
    modalContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    modalContent: {
        width: 300,
        height: 400,
        padding: 15,
        backgroundColor: '#fff',
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 10,
        elevation: 2,
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    modalButtons: {
        width: 300,
        justifyContent: 'space-evenly',
        flexDirection: 'row',
    },
    button: {
        width: 120,
        borderRadius: 5,
        elevation: 1,
        alignItems: 'center',
        backgroundColor: '#23D25B',
    },
    buttonRed: {
        width: 120,
        borderRadius: 5,
        elevation: 1,
        alignItems: 'center',
        backgroundColor: '#d22342',
    },
    buttonBlue: {
        width: 120,
        borderRadius: 5,
        elevation: 1,
        alignItems: 'center',
        backgroundColor: '#23d2b3',
    },
    buttonText: {
        fontFamily: 'open-sans-bold',
        padding: 5,
        fontSize: 18,
        color: '#fff',
    },
    title: {
        fontSize: 20,
        fontFamily: 'open-sans-bold'
    },
    modalText: {
        fontSize: 16,
        fontFamily: 'open-sans'
    },
    orderText: {
        fontSize: 16,
        fontFamily: 'open-sans-bold',
        color: '#fff'
    },
    list: {
        justifyContent: 'center',
        flexDirection: 'row',
        flexWrap: 'wrap',
    }
});
