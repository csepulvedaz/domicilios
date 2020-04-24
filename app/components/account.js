import React from 'react';
import {
    View, StyleSheet,
    BackHandler, Text,
    TouchableHighlight,
    Dimensions, TextInput,
    KeyboardAvoidingView,
    Image, ScrollView
} from 'react-native';

import { AppLoading, LinearGradient } from 'expo';
import firebase from '../firebase';

export default class Account extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            user: '',
            name: '',
            lastName: '',
            email: '',
            adress: '',
            isLoading: true
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
                    user: (snapshot.val() && snapshot.val().name),
                    name: (snapshot.val() && snapshot.val().name),
                    lastName: (snapshot.val() && snapshot.val().lastName),
                    email: (snapshot.val() && snapshot.val().email),
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
        this.updateState({ isSelectedAccount: false });
        return true;
    }

    updateState = (data) => {
        this.props.updateParentParentState(data);
    }

    onSignoutPress = () => {
        firebase.auth().signOut();
    }

    onPressSave = () => {
        var user = firebase.auth().currentUser;
        if (user) {
            firebase.database().ref('users/' + user.uid).update({
                name: this.state.name,
                lastName: this.state.lastName,
                //email: this.state.email,
                phone: this.state.phone,
                adress: this.state.adress,
            })
        }
        this.updateState({ isSelectedAccount: false })
    }

    render() {

        if (this.state.isLoading) {
            return (
                <AppLoading />
            )
        }
        return (
            <KeyboardAvoidingView style={styles.container} behavior='position'>
                <LinearGradient
                    colors={['#87D6E7', '#AFE4EF', '#D7F1F7', '#FAFAFA']}
                    style={styles.containerHeader}>
                    <Image style={styles.avatar} source={{ uri: 'https://bootdey.com/img/Content/avatar/avatar6.png' }} />
                    <Text style={styles.titleHeader}>
                        {this.state.user.charAt(0).toUpperCase() + this.state.user.slice(1)}
                    </Text>
                    <Text style={styles.subTitleHeader}>
                        ¡Bienvenido!
                    </Text>
                </LinearGradient>
                <View style={styles.containerInput}>
                    <ScrollView showsVerticalScrollIndicator={false}>
                        <View style={styles.input}>
                            <Text style={styles.inputTitle}>Nombre</Text>
                            <TextInput
                                style={styles.textInput}
                                value={this.state.name}
                                autoCorrect={false}
                                onChangeText={(name) => this.setState({ name: name })}
                            />
                        </View>
                        <View style={styles.input}>
                            <Text style={styles.inputTitle}>Apellido</Text>
                            <TextInput
                                style={styles.textInput}
                                value={this.state.lastName}
                                autoCorrect={false}
                                onChangeText={(lastName) => this.setState({ lastName: lastName })}
                            />
                        </View>
                        <View style={styles.input}>
                            <Text style={styles.inputTitle}>Correo</Text>
                            <TextInput
                                style={styles.textInput}
                                placeholder={this.state.email}
                                placeholderTextColor='gray'
                                autoCapitalize="none"
                                autoCorrect={false}
                                editable={false}
                            //onChangeText={(email) => this.setState({ email: email })}
                            />
                        </View>
                        <View style={styles.input}>
                            <Text style={styles.inputTitle}>Celular</Text>
                            <TextInput
                                style={styles.textInput}
                                value={this.state.phone}
                                autoCorrect={false}
                                onChangeText={(phone) => this.setState({ phone: phone })}
                            />
                        </View>
                        <View style={styles.input}>
                            <Text style={styles.inputTitle}>Dirección</Text>
                            <TextInput
                                style={styles.textInput}
                                value={this.state.adress}
                                autoCorrect={false}
                                onChangeText={(adress) => this.setState({ adress: adress })}
                            />
                        </View>

                        <View style={styles.containerButtons}>
                            <TouchableHighlight onPress={this.onPressSave} underlayColor="white">
                                <View style={styles.button}>
                                    <Text style={styles.buttonTextOrange}>Guardar Datos</Text>
                                </View>
                            </TouchableHighlight>

                            <TouchableHighlight onPress={this.onSignoutPress} underlayColor="white">
                                <View style={styles.button}>
                                    <Text style={styles.buttonText}>Cerrar Sesión</Text>
                                </View>
                            </TouchableHighlight>

                            <TouchableHighlight onPress={null} underlayColor="white">
                                <View style={styles.button}>
                                    <Text style={styles.buttonText}>Soporte</Text>
                                </View>
                            </TouchableHighlight>
                        </View>
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
    containerButtons: {
        flexDirection: 'column',
        alignItems: 'center',
    },
    containerInput: {
        flex: 6,
        marginTop: 5,
        backgroundColor: '#fafafa',
    },
    input: {
        alignItems: 'center',
        marginBottom: 15,
    },
    containerHeader: {
        flex: 3,
        width: Dimensions.get('window').width,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: -15,
    },
    avatar: {
        width: 130,
        height: 130,
        borderRadius: 63,
        borderWidth: 4,
        borderColor: "white",
        marginBottom: 5,
    },
    textInput: {
        height: 40,
        backgroundColor: '#fff',
        width: 300,
        paddingLeft: 15,
        borderRadius: 3,
        shadowColor: '#c0c0c0',
        shadowOpacity: .5,
        elevation: 1,
    },
    inputTitle: {
        fontFamily: 'open-sans-bold',
        fontSize: 14,
        marginBottom: 10,
        color: '#211414',
    },
    titleHeader: {
        fontFamily: 'open-sans-bold',
        fontSize: 20,
        color: 'gray',
    },
    subTitleHeader: {
        fontFamily: 'open-sans',
        fontSize: 16,
        color: 'gray',
    },
    button: {
        width: (Dimensions.get('window').width / 2) - 20,
        alignItems: 'center',
        backgroundColor: '#fafafa'
    },
    buttonText: {
        fontFamily: 'open-sans-bold',
        paddingTop: 15,
        paddingBottom: 15,
        fontSize: 18,
        color: 'gray'
    },
    buttonTextOrange: {
        fontFamily: 'open-sans-bold',
        paddingTop: 15,
        paddingBottom: 15,
        fontSize: 18,
        color: '#DE7047',
    },
});
