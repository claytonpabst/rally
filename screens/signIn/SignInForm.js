import React from 'react'
import {View, TextInput, Button, TouchableHighlight, StyleSheet} from 'react-native'

import layout from './../../constants/layout'

class SignInForm extends React.Component {
  constructor(props){
    super(props)
    this.state = {

    }
  }

  signIn = () => {
    
  }

  render(){
    const {state, props} = this

    return (
      <View style={s.outer}>
        <TextInput
          style={s.input}
          placeholder="email/phone"
        />
        <TextInput
          style={s.input}
          placeholder="Password"
        />
        <TouchableHighlight style={s.button}>
          <Button color="#fff" title="Sign In" onPress={this.signIn}/>
        </TouchableHighlight>
        <TouchableHighlight style={s.button}>
          <Button color="#fff" title="Register" onPress={() => props.navigation.navigate("Register")}/>
        </TouchableHighlight>
      </View>
    )
  }
}

export default SignInForm

const s = StyleSheet.create({
  outer: {
    flex: 1,
    justifyContent: 'space-around',
    padding: 30
  },
  input: {
    borderBottomColor: '#039BE5',
    borderBottomWidth: 2,
    padding: 15,
  },
  button: {
    backgroundColor: '#17B4CB',
    padding: 13,
    borderRadius: 20
  }
})