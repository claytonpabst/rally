import React from 'react';
import { createAppContainer, createStackNavigator, createSwitchNavigator, createDrawerNavigator, DrawerItems } from 'react-navigation';

import InitialAuth from './../screens/initialAuth/InitialAuth'
import SignIn from './../screens/signIn/SignIn'
import Register from './../screens/register/Register'
import Dashboard from './../screens/dashboard/Dashboard'
import PlayerSearch from './../screens/playerSearch/PlayerSearch'
import FriendsList from './../screens/FriendsList/FriendsList'

import layout from './../constants/layout'

const AppStack = createDrawerNavigator({
  Dashboard: {
    screen: Dashboard,
    navigationOptions: ({ navigation }) => ({
      header: null
    })
  },
  PlayerSearch: {
    screen: PlayerSearch,
    navigationOptions: ({ navigation }) => ({
      header: null
    })
  },
  FriendsList: {
    screen: FriendsList,
    navigationOptions: ({ navigation }) => ({
      header: null
    })
  }
},

  {
    drawerPosition: 'left',
    initialRouteName: "Dashboard",
    drawerBackgroundColor: "#E7E4E9",
    drawerWidth: layout.window.width * .8
  });

const AuthStack = createStackNavigator({
  SignIn: {
    screen: SignIn,
    navigationOptions: ({ navigation }) => ({
      header: null
    })
  },
  Register: {
    screen: Register,
    navigationOptions: ({ navigation }) => ({
      header: null
    })
  }
});

export default createAppContainer(createSwitchNavigator(
  {
    InitialAuth,
    Auth: AuthStack,
    App: AppStack,
  },
  {
    initialRouteName: 'InitialAuth',
  }
));
