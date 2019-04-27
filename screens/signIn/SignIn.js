import React from 'react'
import {View, Button, Text} from 'react-native'

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
      <View>
        <Text>Sign in will happen here</Text>
        <Button title="Register" onPress={() => props.navigation.navigate("Register")}/>
      </View>
    )
  }
}

export default SignIn