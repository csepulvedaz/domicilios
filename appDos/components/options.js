import React from 'react';
import {
    StyleSheet,
    Text, View,
    TouchableHighlight,
    BackHandler,
    Dimensions, Alert
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { AppLoading } from 'expo';
import firebase from '../firebase';

export default class Options extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            stateApp: false,
            isLoading: true,
        };
        this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
    }

    componentWillMount() {
        BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick);
        let _this = this;
        if (firebase.auth().currentUser.uid !== null) {
            firebase.database().ref('state/').once('value').then(function (snapshot) {
                _this.setState({
                    stateApp: (snapshot.val() && snapshot.val().app),
                })
                _this.setState({ isLoading: false });
            });
        }
    }

    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.handleBackButtonClick);
    }

    handleBackButtonClick() {
        this.updateState({ isSelectedOptions: false });
        return true;
    }

    updateParentState = (data) => {
        this.props.updateState(data)
    }

    onPressBackUp = () => {
        this.updateParentState({ isSelectedOptions: false })

    }

    onSignoutPress = () => {
        firebase.auth().signOut();
    }

    onDeactivate = () => {
        var user = firebase.auth().currentUser;
        var stateApp = this.state.stateApp;
        if (user) {
            firebase.database().ref('state/').update({
                app: !stateApp
            })
            this.setState({ stateApp: !stateApp })
        }
    }

    render() {
        if (this.state.isLoading) {
            return (
                <AppLoading />
            )
        }
        return (
            <View style={styles.container}>
                <TouchableHighlight onPress={this.onPressBackUp} underlayColor="white">
                    <View style={styles.button}>
                        <Text style={styles.buttonText}>Regresar</Text>
                    </View>
                </TouchableHighlight>
                <TouchableHighlight onPress={this.onSeeOrders} underlayColor="white">
                    <View style={styles.button}>
                        <Text style={styles.buttonText}>Ver Pedidos</Text>
                    </View>
                </TouchableHighlight>
                <TouchableHighlight onPress={this.onDeactivate} underlayColor="white">
                    <View style={styles.button}>
                        {!this.state.stateApp && <Text style={styles.buttonText}>Activar App</Text>}
                        {this.state.stateApp &&<Text style={styles.buttonText}>Desactivar App</Text>}
                    </View>
                </TouchableHighlight>
                <TouchableHighlight onPress={this.onSignoutPress} underlayColor="white">
                    <View style={styles.button}>
                        <Text style={styles.buttonText}>Cerrar Sesión</Text>
                    </View>
                </TouchableHighlight>
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
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute'
    },
    button: {
        width: 180,
        height: 50,
        marginBottom: 10,
        borderRadius: 10,
        borderColor: '#fff',
        borderWidth: 2,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#23D25B',

    },
    buttonText: {
        fontFamily: 'open-sans-bold',
        fontSize: 18,
        color: '#fafafa'
    },
});
