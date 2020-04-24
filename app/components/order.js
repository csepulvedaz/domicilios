import React from 'react';
import {
    StyleSheet, Text, View,
    TouchableHighlight, ScrollView,
    Dimensions, BackHandler,
    TouchableWithoutFeedback,
    Alert,
} from 'react-native';
import Icon from "react-native-vector-icons/FontAwesome";

export default class Order extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            isSelectedEdit: false,
        };
        this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
    }

    componentWillMount() {
        BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick);
    }

    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.handleBackButtonClick);
    }

    handleBackButtonClick() {
        this.updateState({ isSelectedOrder: false })
        return true;
    }

    updateState = (data) => {
        this.props.updateParentParentState(data);
    }

    onRemoveItem = (i) => {
        var products = this.props.shoppingCart;
        var prices = this.props.shoppingCartPrice;
        //alert(prices[i])
        const resultProducts = products.filter((item, j) => i !== j);

        this.updateState((state) => {
            const counter = state.counter - state.multiplier[i]
            const total = state.total - prices[i] * state.multiplier[i]
            const resultPrices = prices.filter((item, j) => i !== j);
            const multiplier = state.multiplier.filter((item, j) => i !== j);
            return {
                shoppingCart: resultProducts,
                shoppingCartPrice: resultPrices,
                counter: counter,
                total: total,
                multiplier: multiplier,
            };
        })
    }

    onPressContinue = () => {
        if (!this.props.shoppingCart.length) {
            Alert.alert('¡Carrito vacío!', 'Por favor agregue algún producto para continuar.')
            return this.updateState({ isSelectedOrder: false });
        } else {
            return this.updateState({ isSelectedOrder: false, isSelectedSendOrder: true })
        }
    }

    onPressPlus = (multiplier, index, counter, price, total) => {
        multiplier[index] = multiplier[index] + 1
        this.updateState({
            multiplier: multiplier,
            counter: counter + 1,
            total: total + price
        })
    }

    onPressMinus = (multiplier, index, counter, price, total) => {
        if (multiplier[index] > 1) {
            multiplier[index] = multiplier[index] - 1
            this.updateState({
                multiplier: multiplier,
                counter: counter - 1,
                total: total - price
            })
        }
    }

    render() {
        var empty = !this.props.shoppingCart.length;
        var price = this.props.shoppingCartPrice;
        var multiplier = this.props.state.multiplier;
        var counter = this.props.state.counter;
        var total = this.props.state.total;

        return (
            <View style={styles.container}>
                <View style={{ flex: 1, width: Dimensions.get('window').width }}>
                    <View style={styles.containerTitle}>
                        <View style={{ flexDirection: 'column', justifyContent: 'center' }}>
                            <Text style={styles.title}>Tu Orden</Text>
                            <Text style={styles.subtitle}>Para domicilio</Text>
                        </View>
                        {!empty && !this.state.isSelectedEdit &&
                            <TouchableWithoutFeedback onPress={() => this.setState({ isSelectedEdit: !this.state.isSelectedEdit })}>
                                <View style={{ justifyContent: 'center', paddingTop: 10, paddingBottom: 10 }}>
                                    <Text style={styles.edit}>EDITAR</Text>
                                </View>
                            </TouchableWithoutFeedback>
                        }
                        {!empty && this.state.isSelectedEdit &&
                            <TouchableWithoutFeedback onPress={() => this.setState({ isSelectedEdit: !this.state.isSelectedEdit })}>
                                <View style={{ justifyContent: 'center', paddingTop: 10, paddingBottom: 10 }}>
                                    <Text style={styles.edit}>OK</Text>
                                </View>
                            </TouchableWithoutFeedback>
                        }
                    </View>
                    <ScrollView contentContainerStyle={{ alignItems: 'center', paddingTop: 5 }} showsVerticalScrollIndicator={true}>
                        {!empty && this.props.shoppingCart.map((item, index) => (
                            <View style={styles.shoppingCartItem} key={index}>
                                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', paddingLeft: 15 }}>
                                    <Icon
                                        style={styles.icon}
                                        onPress={() => { this.onPressPlus(multiplier, index, counter, price[index], total) }}
                                        name="plus"
                                        color='#6E6E6E'
                                        size={15}
                                    />
                                    <Icon
                                        style={styles.icon}
                                        onPress={() => this.onPressMinus(multiplier, index, counter, price, total)}
                                        name="minus"
                                        color='#6E6E6E'
                                        size={15}
                                    />
                                </View>
                                {item}
                                <Text style={{
                                    height: '100%',
                                    backgroundColor: '#DE7047',
                                    textAlignVertical: 'center',
                                    paddingRight: 5,
                                    paddingLeft: 5,
                                    fontFamily: 'open-sans-bold',
                                    fontSize: 12,
                                    color: '#fff',
                                }}>x{multiplier[index]}</Text>
                                <Text style={{
                                    height: '100%',
                                    backgroundColor: '#23D25B',
                                    textAlignVertical: 'center',
                                    paddingRight: 5,
                                    paddingLeft: 5,
                                    borderTopRightRadius: 3,
                                    borderBottomRightRadius: 3,
                                    fontFamily: 'open-sans-bold',
                                    fontSize: 12,
                                    color: '#fff',
                                }}>$ {price[index] * multiplier[index]}</Text>
                                {this.state.isSelectedEdit &&
                                    <Icon
                                        style={styles.close}
                                        onPress={() => {this.onRemoveItem(index)}}
                                        name="times"
                                        color='#fff'
                                        size={14}
                                    />
                                }
                            </View>
                        ))}
                    </ScrollView>
                </View>
                {empty &&
                    <View style={{ flex: 1 }}>
                        <Text style={styles.empty}>¡VACÍO!</Text>
                    </View>
                }
                <View style={styles.containerButtons}>

                    <TouchableHighlight onPress={() => {
                        this.updateState({ isSelectedOrder: false })
                    }} underlayColor="white">
                        <View style={styles.button}>
                            <Text style={styles.buttonText}>Cancelar</Text>
                        </View>
                    </TouchableHighlight>

                    <TouchableHighlight onPress={this.onPressContinue} underlayColor="white">
                        <View style={styles.buttonOrange}>
                            <Text style={styles.buttonTextOrange}>Continuar</Text>
                        </View>
                    </TouchableHighlight>
                </View>
            </View>
        );
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fafafa',
        flexDirection: 'column',
        alignItems: 'center',
        //width: Dimensions.get('window').width-40,
        //justifyContent: 'center',
    },
    containerButtons: {
        width: Dimensions.get('window').width,
        flexDirection: 'row',
        justifyContent: 'space-evenly',
    },
    containerTitle: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: - 15,
        marginBottom: 15,
        marginLeft: 20,
        marginRight: 20
    },
    button: {
        width: Dimensions.get('window').width / 2,
        borderRadius: 5,
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
        fontFamily: 'open-sans',
        fontSize: 20,
        color: '#211414',
    },
    subtitle: {
        fontFamily: 'open-sans',
        fontSize: 12,
        color: '#8E8E93',
    },
    empty: {
        fontFamily: 'open-sans',
        fontSize: 18,
        color: '#8E8E93',
    },
    edit: {
        fontFamily: 'open-sans',
        fontSize: 15,
        color: '#8E8E93',
    },
    icon: {
        paddingRight: 15,
    },
    close: {
        width: 16,
        height: 16,
        borderRadius: 100,
        backgroundColor: '#6E6E6E',
        textAlign: 'center',
        position: 'absolute',
        elevation: 3,
        top: -10,
        left: Dimensions.get('window').width - 50,
    },
    shoppingCartItem: {
        width: Dimensions.get('window').width - 40,
        marginTop: 5,
        marginBottom: 5,
        //padding: 15,
        backgroundColor: '#fff',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderRadius: 3,
        shadowColor: '#c0c0c0',
        shadowOpacity: .5,
        elevation: 2,
    },
});