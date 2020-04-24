import React from 'react';
import {
  Platform, StatusBar,
  StyleSheet, View,
  Alert, BackHandler,
  YellowBox
} from 'react-native';

import { AppLoading, Asset, Font } from 'expo';
import firebase from 'firebase';
import Login from './navigation/navigation';
import MainScreen from './screens/main'

export default class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      isLoadingComplete: false,
      isAuthenticationReady: false,
      isAuthenticated: false,
      stateApp: true,
    };
    firebase.auth().onAuthStateChanged(this.onAuthStateChanged);
    YellowBox.ignoreWarnings(['Setting a timer']);
  }

  onAuthStateChanged = (user) => {
    this.setState({ isAuthenticationReady: true });
    this.setState({ isAuthenticated: !!user });
  }

  render() {
    if ((!this.state.isLoadingComplete || !this.state.isAuthenticationReady) && !this.props.skipLoadingScreen) {
      this._handleAppState()
      return (
        <AppLoading
          startAsync={this._loadResourcesAsync}
          onError={this._handleLoadingError}
          onFinish={this._handleFinishLoading}
        />
      );
    } else {
      return (
        <View style={styles.container}>
          {Platform.OS === 'ios' && <StatusBar barStyle="default" />}
          {Platform.OS === 'android' && <View style={styles.statusBarUnderlay} />}
          {(this.state.isAuthenticated) ? <MainScreen /> : <Login />}
        </View>
      );
    }
  }

  _loadResourcesAsync = async () => {
    return Promise.all([
      Asset.loadAsync([
        require('./assets/splash.png'),
        require('./assets/img/logo.png'),
        require('./assets/img/main.jpg'),
        require('./assets/img/burguer.png'),
        require('./assets/img/granjero.png'),
        require('./assets/img/hotdog.png'),
      ]),
      Font.loadAsync({
        'open-sans-bold': require('./assets/fonts/OpenSans-Bold.ttf'),
        'open-sans-italic': require('./assets/fonts/OpenSans-Italic.ttf'),
        'open-sans-light': require('./assets/fonts/OpenSans-Light.ttf'),
        'open-sans': require('./assets/fonts/OpenSans-Regular.ttf'),
      }),
    ]);
  };

  _handleLoadingError = error => {
    // In this case, you might want to report the error to your error
    // reporting service, for example Sentry
    console.warn(error);
  };

  _handleFinishLoading = () => {
    this.setState({ isLoadingComplete: true });
  };

  _handleAppState = () => {
    let _this = this;
    firebase.database().ref('/state').once('value').then(function (snapshot) {

      if (snapshot.val().app == false) {
        Alert.alert(
          'Aplicación no disponible',
          'Tienda cerrada.',
          [
            {
              text: 'OK', onPress: () => {
                BackHandler.exitApp()
              }
            },
          ],
          { cancelable: false },
        );
      }
    });
    firebase.database().ref('/state').on('child_changed', function (snapshot) {
      _this.setState({ stateApp: snapshot.val() });
      if (snapshot.val() == false) {
        Alert.alert(
          'Aplicación no disponible',
          'Tienda cerrada.',
          [
            { text: 'OK', onPress: () => BackHandler.exitApp() },
          ],
          { cancelable: false },
        );
      }
    });
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  statusBarUnderlay: {
    height: 24,
    backgroundColor: 'rgba(0,0,0,0.1)',
  },
});
