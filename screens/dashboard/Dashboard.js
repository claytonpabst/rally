import React from 'react'
import {View, Button, Text, Image} from 'react-native'

import Header from '../../commonComponents/MainHeader'


class Dashboard extends React.Component {
  constructor(props){
    super(props)
    this.state = {

    }
  }

  static navigationOptions = {
    drawerLabel: "Dashboard",
    drawerIcon: ({tintColor}) => (
      <Image source={require('./../../assets/images/robot-dev.png')}/>
    )
  }

  render(){
    const {state, props} = this

    return (
      <View style={{flex:1}}>
        <Header navigation={props.navigation}/>
        <Text>Should be here if user is authorized</Text>

      </View>
    )
  }
}

export default Dashboard