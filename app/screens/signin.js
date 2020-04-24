import React from 'react';
import { StyleSheet, Text, View, TouchableHighlight, Dimensions, Alert, YellowBox } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import firebase from '../firebase';

import { Facebook } from 'expo';
import Registry from '../components/registry';

export default class SignInScreen extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            name: '',
            lastName: '',
            email: '',
            password: '',
            confirmPassword: '',
        }
        YellowBox.ignoreWarnings(['Setting a timer']);
    }

    updateState(data) {
        this.setState(data);
    }

    onSignupPress = () => {
        var name = this.state.name === '';
        var password = this.state.password === '';
        var confirmPassword = this.state.confirmPassword === '';

        if (this.state.password !== this.state.confirmPassword) {
            Alert.alert('La contraseña no es igual.');
            return;
        }
        if (name || confirmPassword || password) {
            if (name) Alert.alert('Por favor escriba su nombre.')
            if (password) Alert.alert('Por favor escriba su contraseña.')
            if (confirmPassword) Alert.alert('Por favor confirme su contraseña.')

            return;
        }
        firebase.auth().createUserWithEmailAndPassword(this.state.email, this.state.password)
            .then(
                (res) => {
                    firebase.database().ref('users/' + res.user.uid).set({
                        name: this.state.name,
                        lastName: this.state.lastName,
                        email: this.state.email,
                        //password: this.state.password,
                        phone: '',
                        adress: '',
                        counter: res.user.uid,
                    })
                    //Alert.alert('¡Bienvenido!', this.state.name)
                },
                (error) => {
                    var errorCode = error.code;
                    if (errorCode == 'auth/email-already-in-use') {
                        Alert.alert('Ya existe un usuario con el mismo correo.');
                    }
                    if (errorCode == 'auth/invalid-email') {
                        Alert.alert('Correo invalido.');
                    }
                    if (errorCode == 'auth/weak-password') {
                        Alert.alert('Constraseña demasiado débil.');
                    }
                })
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.containerResgistry}>
                    <Registry navigation={this.props.navigation}
                        updateParentState={this.updateState.bind(this)} />
                </View>
                <View style={styles.containerButtons}>
                    <TouchableHighlight onPress={this.onSignupPress} underlayColor="white">
                        <View style={styles.button}>
                            <Text style={styles.buttonText}>Enviar</Text>
                        </View>
                    </TouchableHighlight>
                    {/*<Icon.Button
                        name="facebook"
                        backgroundColor="#3b5998"
                        style={styles.buttonFB}
                        onPress={this.signInWithFacebook}>
                        <Text style={styles.buttonTextFB}>Ingresar con Facebook</Text>
                    </Icon.Button>*/}
                </View>
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
        justifyContent: 'center',
    },
    containerResgistry: {
        flex: 3,
    },
    containerButtons: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
    },
    buttonFB: {
        width: 260,
        justifyContent: 'center',
    },
    button: {
        width: 260,
        marginBottom: 10,
        borderRadius: 5,
        alignItems: 'center',
        backgroundColor: '#23D25B'
    },
    buttonText: {
        fontFamily: 'open-sans-bold',
        textAlign: 'center',
        padding: 10,
        fontSize: 18,
        color: 'white'
    },
    buttonTextFB: {
        fontFamily: 'open-sans-bold',
        fontSize: 18,
        textAlign: 'center',
        color: 'white',
        padding: 5
    }
});

