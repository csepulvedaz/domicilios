import React from 'react';
import { View, StyleSheet, Text, TouchableWithoutFeedback, Alert } from 'react-native';
import Icon from "react-native-vector-icons/FontAwesome";

export default class ShoppingCart extends React.Component {

    updateParentState = (data) => {
        this.props.updateState(data);
    }
    onPress = () => {
        if(this.props.state.counter>0){
            return this.updateParentState({ isSelectedOrder: true, isSelectedAdditions: false })
        } else {
            Alert.alert('¡Carrito vacío!',
            'Por favor agregue algún producto.',)
        }
    }

    render() {
        return (
            <TouchableWithoutFeedback onPress={this.onPress}>
                <View style={styles.containerPrice}>
                    <Text style={styles.text}>$ {this.props.state.total}</Text>
                    <View style={styles.containerIcon}>
                        <Icon
                            name="shopping-cart"
                            color="#211414"
                            size={20}
                        />
                        {(this.props.state.counter > 0) &&
                            <View style={styles.counter}>
                                <Text style={{ textAlign: 'center', fontSize: 13, color: 'white' }}>{this.props.state.counter}</Text>
                            </View>
                        }
                    </View>
                </View>
            </TouchableWithoutFeedback>
        );
    }
}

const styles = StyleSheet.create({

    containerIcon: {
        width: 30,
        height: 30,
        //borderRadius: 100,
        //backgroundColor: '#211414',
        alignItems: 'center',
        justifyContent: 'center',
    },
    containerPrice: {
        width: 100,
        //borderRadius: 50,
        //backgroundColor: '#95989A',
        borderBottomWidth: 0.5,
        borderColor: 'gray',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        zIndex: 0,
    },
    counter: {
        width: 17,
        height: 17,
        borderRadius: 100,
        backgroundColor: '#23D25B',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute',
        zIndex: 1,
        bottom: 20,
        left: 20,
    },
    text: {
        fontFamily: 'open-sans', 
        textAlign: 'center',
        fontSize: 15,
        color: 'gray'
    },

});
