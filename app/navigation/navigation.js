import { createAppContainer, createDrawerNavigator } from 'react-navigation';
import LogInScreen from '../screens/login';
import SignInScreen from '../screens/signin';


const RootStack = createDrawerNavigator(
  {
    Login: LogInScreen,
    Signin: SignInScreen,
  },
  {
    initialRouteName: 'Login',
  }
);

const Login = createAppContainer(RootStack);

export default Login;