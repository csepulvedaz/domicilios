import { createAppContainer, createDrawerNavigator } from 'react-navigation';
import MainScreen from '../screens/main';


const RootStack = createDrawerNavigator(
  {
    Main: MainScreen,
  },
  {
    initialRouteName: 'Main',
  }
);

const Main = createAppContainer(RootStack);

export default Main;