import React from 'react';
import { View, StyleSheet, FlatList, AppRegistry, Dimensions, BackHandler, Alert } from 'react-native';
import MenuItem from './menuItem';
import Additions from './additions';
import Order from './order';
import Account from './account';
import SendOrder from './sendOrder';

const data = [{
    title: 'Hamburguesas',
    description: ['Hamburguesa 100 gr', 'Hamburguesa 180 gr', 'Hamburguesa Pollo Crosby'],
    price: [7400, 9900, 7400]
},
{
    title: 'Perros',
    description: ['Perro Caliente Cocheros'],
    price: [7400]
},
{
    title: 'Chorizos',
    description: ['Chorizo con Arepa', 'Chorizo Granjero', 'Choripan'],
    price: [3000, 5400, 5400]
},
{
    title: 'Pinchos',
    description: ['Pincho Nativo Pollo'],
    price: [3000]
},
{
    title: 'Bolitas',
    description: ['Choribolita', 'Salchibolita'],
    price: [2600, 2600]
},
{
    title: 'Combos',
    description: ['Combo hamburguesa res 100gr', 'Combo hamburguesa res 180gr', 'Combo Perro Caliente'],
    price: [11000, 13500, 11000]
},
{
    title: 'Acompañamientos',
    description: ['Papa Francesa', 'Bebidas'],
    price: [0, 0]
},
];

export default class Menu extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            titleProduct: '',
            price: 0,
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
        Alert.alert(
            '¿Desea salir de la aplicación?',
            '',
            [
                { text: 'OK', onPress: () => BackHandler.exitApp() },
                {
                    text: 'Cancel',
                    style: 'cancel',
                },
            ],
            { cancelable: false },
        );
        return true;
    }

    updateState = (data) => {
        this.setState(data);
    }

    updateParentState = (data) => {
        this.props.updateState(data);
    }

    renderDetails = () => {
        return (
            <View style={styles.additionsContainer}>
                <Additions updateParentState={this.updateState.bind(this)}
                    updateParentParentState={this.updateParentState.bind(this)}
                    titleProduct={this.state.titleProduct}
                    nameProduct={this.props.nameProduct}
                    price={this.state.price} state={this.props.state}
                    total={this.props.total.bind()} />
            </View>
        )
    }

    renderSendOrder = () => {
        return (
            <View style={styles.accountContainer}>
                <SendOrder
                    state={this.props.state} 
                    send={this.props.send.bind(this)}
                    updateParentState={this.updateState.bind(this)}
                    updateParentParentState={this.updateParentState.bind(this)} />
            </View>
        )
    }

    renderAccount = () => {
        return (
            <View style={styles.accountContainer}>
                <Account updateParentState={this.updateState.bind(this)}
                    updateParentParentState={this.updateParentState.bind(this)} />
            </View>
        )
    }

    renderProducts = () => {
        return (
            <View style={styles.orderContainer}>
                <Order
                    state={this.props.state} 
                    shoppingCart={this.props.shoppingCart}
                    shoppingCartPrice={this.props.shoppingCartPrice}
                    updateParentParentState={this.updateParentState.bind(this)} />
            </View>
        )
    }

    renderItem = ({ item }) => <MenuItem
        updateParentParentState={this.updateParentState.bind(this)}
        updateParentState={this.updateState.bind(this)} item={item} />

    render() {
        return (
            <View style={styles.container}>
                {!this.props.isSelectedAdditions && !this.props.isSelectedOrder && 
                    !this.props.isSelectedAccount && !this.props.isSelectedSendOrder &&
                    <FlatList style={{ marginBottom: 10 }} data={data} renderItem={this.renderItem} keyExtractor={(item, index) => item + index}
                        showsVerticalScrollIndicator={false} />
                }
                {this.props.isSelectedAdditions && !this.props.isSelectedOrder && this.renderDetails()}
                {this.props.isSelectedOrder && !this.props.isSelectedAdditions && this.renderProducts()}
                {this.props.isSelectedAccount && this.renderAccount()}
                {this.props.isSelectedSendOrder && this.renderSendOrder()}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 3,
        marginTop: 15,
        width: Dimensions.get('window').width,
        backgroundColor: '#fafafa',
    },
    orderContainer: {
        flex: 1,
        width: Dimensions.get('window').width - 40,
        marginLeft: 20,
        marginRight: 20,
    },
    accountContainer: {
        flex: 1,
        width: Dimensions.get('window').width - 40,
        marginLeft: 20,
        marginRight: 20,
    },
    additionsContainer: {
        flex: 1,
        width: Dimensions.get('window').width - 40,
        marginLeft: 20,
        marginRight: 20,
    },
});

AppRegistry.registerComponent('Menu', () => Menu);