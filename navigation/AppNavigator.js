import React from 'react';
import { createAppContainer, createStackNavigator, createSwitchNavigator, createDrawerNavigator, DrawerItems } from 'react-navigation';

import InitialAuth from './../screens/initialAuth/InitialAuth'
import SignIn from './../screens/signIn/SignIn'
import Register from './../screens/register/Register'
import Dashboard from './../screens/dashboard/Dashboard'
import PlayerSearch from './../screens/playerSearch/PlayerSearch'
import FriendsList from './../screens/FriendsList/FriendsList'
import GameInfo from './../screens/GameSetup/GameInfo'
import AddPlayers from './../screens/GameSetup/AddPlayers'
import InviteSent from './../screens/GameSetup/InviteSent'
import EditProfile from './../screens/Profile/EditProfile'
import PlayerProfile from './../screens/Profile/PlayerProfile'
import ViewInvite from './../screens/Invites/ViewInvite'
import InviteList from './../screens/Invites/InviteList'
import GroupChat from './../screens/Chat/GroupChat'
import Chat from './../screens/Chat/Chat'

import layout from './../constants/layout'



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

const GameStack = createStackNavigator({
  GameInfo: {
    screen: GameInfo,
    navigationOptions: ({ navigation }) => ({
      header: null
    })
  },
  AddPlayers: {
    screen: AddPlayers,
    navigationOptions: ({ navigation }) => ({
      header: null
    })
  },
  InviteSent: {
    screen: InviteSent,
    navigationOptions: ({ navigation }) => ({
      header: null
    })
  }
})

const InviteStack = createStackNavigator({
  InviteList: {
    screen: InviteList,
    navigationOptions: ({ navigation }) => ({
      header: null
    })
  },

  ViewInvite: {
    screen: ViewInvite,
    navigationOptions: ({ navigation }) => ({
      header: null
    })
  },
  GroupChat: {
    screen: GroupChat,
    navigationOptions: ({ navigation }) => ({
      header: null
    })
  }
});

const ProfileStack = createStackNavigator({
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
  },
  PlayerProfile: {
    screen: PlayerProfile,
    navigationOptions: ({ navigation }) => ({
      header: null
    })
  },
  Chat: {
    screen: Chat,
    navigationOptions: ({ navigation }) => ({
      header: null
    })
  }
})

const AppStack = createDrawerNavigator({
  Dashboard: {
    screen: Dashboard,
    navigationOptions: ({ navigation }) => ({
      header: null
    })
  },
  PlayerSearch: {
    screen: ProfileStack,
    navigationOptions: ({ navigation }) => ({
      // header: null
    })
  },
  FriendsList: {
    screen: FriendsList,
    navigationOptions: ({ navigation }) => ({
      // header: null
    })
  },
  GameInfo: {
    screen: GameStack
  },
  EditProfile: {
    screen: EditProfile,
    navigationOptions: ({ navigation }) => ({
      header: null
    })
  },
  InviteList: {
    screen: InviteStack,
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

export default createAppContainer(createSwitchNavigator(
  {
    InitialAuth,
    Auth: AuthStack,
    App: AppStack,
    Game: GameStack,
    Invite: InviteStack,
    Profile: ProfileStack
  },
  {
    initialRouteName: 'InitialAuth',
  }
));
