import React from 'react';
import { KeyboardAvoidingView, TextInput, StyleSheet, View, Text, ScrollView } from 'react-native';

export default class Registry extends React.Component {

    updateParentState(data) {
        this.props.updateParentState(data);
    }

    render() {
        return (
            <KeyboardAvoidingView style={styles.container} behavior="position" enabled>
                <View style={styles.containerText}>
                    <Text style={{ fontFamily: 'open-sans', fontSize: 34, textAlign: 'center' }}>
                        Crear cuenta
                    </Text>
                    <Text style={{ fontFamily: 'open-sans', fontSize: 15, color: 'rgb(0,0,0)', opacity: .5, textAlign: "center" }}>
                        Por favor ingresa tus datos
                    </Text>
                </View>
                <View style={styles.containerInput}>
                    <ScrollView showsVerticalScrollIndicator={false}>
                    <TextInput
                        style={styles.textInput}
                        placeholder='Nombre'
                        //autoFocus = {true}
                        onChangeText={(name) => this.updateParentState({ name: name })}
                        onSubmitEditing={() => { this.lastName.focus(); }}
                        blurOnSubmit={false}
                    />
                    <TextInput
                        ref={(input) => { this.lastName = input; }}
                        style={styles.textInput}
                        placeholder='Apellido'
                        onChangeText={(lastName) => this.updateParentState({ lastName: lastName })}
                        onSubmitEditing={() => { this.email.focus(); }}
                        blurOnSubmit={false}                        
                    />
                    <TextInput
                        ref={(input) => { this.email = input; }}
                        style={styles.textInput}
                        placeholder='Correo'
                        autoCapitalize="none"
                        onChangeText={(email) => this.updateParentState({ email: email })}
                        onSubmitEditing={() => { this.password.focus(); }}
                        blurOnSubmit={false}
                    />
                    <TextInput
                        ref={(input) => { this.password = input; }}
                        style={styles.textInput}
                        placeholder='Contraseña'
                        autoCapitalize="none"
                        autoCorrect={false}
                        secureTextEntry={true}
                        onChangeText={(password) => this.updateParentState({ password: password })}
                        onSubmitEditing={() => { this.confirmPassword.focus(); }}
                        blurOnSubmit={false}
                    />
                    <TextInput
                        ref={(input) => { this.confirmPassword = input; }}
                        style={styles.textInput}
                        placeholder='Confirme contraseña'
                        autoCapitalize="none"
                        autoCorrect={false}
                        secureTextEntry={true}
                        onChangeText={(confirmPassword) => this.updateParentState({ confirmPassword: confirmPassword })}
                    />
                    </ScrollView>
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
    containerInput: {
        flex: 3,
        flexDirection: 'column',
        justifyContent: 'center'
    },
    containerText: {
        flex: 2,
        flexDirection: 'column',
        justifyContent: 'center',
    },
    textInput: {
        marginBottom: 15,
        height: 40,
        backgroundColor: '#fff',
        borderColor: 'gray',
        width: 300,
        paddingLeft: 10,
        borderRadius: 3,
        shadowColor: '#c0c0c0',
        shadowOpacity: .5,
        elevation: 2,
    },
});
