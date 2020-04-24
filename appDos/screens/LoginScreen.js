import React from 'react';
import {
  StyleSheet,
  Text, View, Image,
  TouchableHighlight,
  TextInput, Dimensions,
  KeyboardAvoidingView, Alert
} from 'react-native';
//import Icon from 'react-native-vector-icons/FontAwesome';
import firebase from '../firebase';

export default class LoginScreen extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      user: '',
      password: '',
    };
  }

  onLoginPress = () => {
    firebase.auth().signInWithEmailAndPassword(this.state.user, this.state.password)
      .then(() => {}, (error) => { Alert.alert('Usuario o contraseña incorrectos'); });
  }

  render() {
    return (
      <KeyboardAvoidingView style={styles.container} behavior="position" enabled>
        <View style={styles.containerImage}>
          <Image
            style={{ width: Dimensions.get('window').width + 40, height: Dimensions.get('window').height / 3 }}
            source={require('../assets/images/main.jpg')}
          />
        </View>
        <View style={styles.containerText}>
          <Text style={{ fontSize: 34, textAlign: "center", fontFamily: 'open-sans' }}>
            Aplicación Ventas
          </Text>
          <Text style={{ fontFamily: 'open-sans', marginTop: 5, fontSize: 15, color: 'rgb(0,0,0)', opacity: .5, textAlign: "center" }}>
            Por favor ingresa o registrate para usar la app
          </Text>
        </View>
        <View style={styles.containerInput}>
          <TextInput
            style={styles.textInput}
            placeholder='Usuario'
            onChangeText={(user) => this.setState({ user })}
            autoCapitalize="none"
            onSubmitEditing={() => { this.password.focus(); }}
            blurOnSubmit={false}
          />
          <TextInput
            ref={(input) => { this.password = input; }}
            secureTextEntry={true}
            autoCapitalize="none"
            autoCorrect={false}
            style={styles.textInput}
            placeholder='Contraseña'
            onChangeText={(password) => this.setState({ password })}
          />
        </View>
        <View style={styles.containerFooter}>
          <View style={styles.containerButtons}>
            <TouchableHighlight onPress={this.onLoginPress} underlayColor="white">
              <View style={styles.button}>
                <Text style={styles.buttonText}>Ingresar</Text>
              </View>
            </TouchableHighlight>
          </View>
        </View>
      </KeyboardAvoidingView>
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
    justifyContent: 'space-between',
  },
  containerImage: {
    flex: 2,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  containerFooter: {
    flex: 1.5,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  containerButtons: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  containerInput: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center'
  },
  containerText: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
  },
  logInText: {
    fontFamily: 'open-sans',
    marginTop: 20,
    fontSize: 15,
    color: 'rgb(0,0,0)',
    opacity: .5,
    marginBottom: 20
  },
  button: {
    width: 260,
    marginTop: 20,
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
    color: 'white',
  },
  textInput: {
    marginTop: 15,
    height: 40,
    borderColor: 'gray',
    //borderWidth: .5,
    width: 300,
    paddingLeft: 10,
    borderRadius: 3,
    shadowColor: '#c0c0c0',
    shadowOpacity: .5,
    elevation: 1,
    backgroundColor: '#fff',
  },
});
