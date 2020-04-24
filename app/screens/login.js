import React from 'react';
import {
  StyleSheet,
  Text, View, Image,
  TouchableHighlight,
  TextInput, Dimensions,
  KeyboardAvoidingView, Alert
} from 'react-native';
import { Facebook } from 'expo';
import Icon from 'react-native-vector-icons/FontAwesome';
import firebase from '../firebase';

export default class LogInScreen extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      user: '',
      password: '',
    };
  }

  onLoginPress = () => {
    let _this = this
    firebase.auth().signInWithEmailAndPassword(this.state.user, this.state.password)
      .then(() => { }, (error) => {
        Alert.alert(
          'Usuario o contraseña incorrectos',
          '',
          [
            { text: 'OK', onPress: () => _this.setState({ user: '', password: '' }) },

          ],
          { cancelable: false },
        );
      });
  }

  async signInWithFacebook() {
    try {
      const {
        type,
        token,
      } = await Facebook.logInWithReadPermissionsAsync('2076525255778233', {
        permissions: ['public_profile', 'email'],
      });
      if (type === 'success') {
        // Get the user's name using Facebook's Graph API
        const credential = firebase.auth.FacebookAuthProvider.credential(token)
        const response = await fetch(`https://graph.facebook.com/me?access_token=${token}`);
        //Alert.alert('¡Bienvenido!', `${(await response.json()).name}!`);
        firebase.auth().signInAndRetrieveDataWithCredential(credential)
          .then(function (userCredential) {
            const userInfo = userCredential.additionalUserInfo.profile;
            firebase.database().ref('users/' + userCredential.user.uid).set({
              name: userInfo.first_name,
              lastName: userInfo.last_name,
              email: userInfo.email,
              //password: '',
              phone: '',
              adress: '',
              counter: userCredential.user.uid,
            })
            //console.log(userCredential.additionalUserInfo.profile);
          });
      } else {
        type === 'cancel'
      }
    } catch ({ message }) {
      alert(`Facebook Login Error: ${message}`);
    }
  }

  render() {
    const { navigate } = this.props.navigation;
    return (
      <KeyboardAvoidingView style={styles.container} behavior="position" enabled>
        <View style={styles.containerImage}>
          <Image
            style={{ width: Dimensions.get('window').width + 40, height: Dimensions.get('window').height / 3 }}
            source={require('../assets/img/main.jpg')}
          />
        </View>
        <View style={styles.containerText}>
          <Text style={{ fontSize: 34, textAlign: "center", fontFamily: 'open-sans' }}>
            Bienvenido
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
            value={this.state.user}
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
            value={this.state.password}
          />
        </View>
        <View style={styles.containerFooter}>
          <View style={styles.containerButtons}>
            <TouchableHighlight onPress={this.onLoginPress} underlayColor="white">
              <View style={styles.button}>
                <Text style={styles.buttonText}>Ingresar</Text>
              </View>
            </TouchableHighlight>
            <Icon.Button
              name="facebook"
              backgroundColor="#3b5998"
              style={styles.buttonFB}
              onPress={this.signInWithFacebook}>
              <Text style={styles.buttonTextFB}>Ingresar con Facebook</Text>
            </Icon.Button>
          </View>
          <Text style={styles.logInText}>
            No tienes cuenta? <Text style={{ color: 'red', fontFamily: 'open-sans' }}
              onPress={() => navigate('Signin')}>Registrate</Text>
          </Text>
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
    justifyContent: 'flex-start',
  },
  containerInput: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center'
  },
  containerText: {
    flex: .7,
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
  buttonFB: {
    width: 260,
    justifyContent: 'center',
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
  buttonTextFB: {
    fontFamily: 'open-sans-bold',
    fontSize: 18,
    textAlign: 'center',
    color: 'white',
    padding: 5
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
