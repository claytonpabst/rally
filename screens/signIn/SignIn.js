import React from 'react'
import {View, Button, Text, StyleSheet} from 'react-native'

import LogoHeader from './../../commonComponents/LogoHeader'

class SignIn extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      name: "Joe"
    }
  }

  render(){
    const {state, props} = this

    return (
      <View style={{flex:1, backgroundColor: 'orange'}}>
        <LogoHeader/>
        <View style={s.formWrapper}>
          <Text>Sign in will happen here</Text>
          <Button title="Register" onPress={() => props.navigation.navigate("Register")}/>
        </View>
      </View>
    )
  }
}

export default SignIn

const s = StyleSheet.create({
  formWrapper: {
    flex: 3
  }
})