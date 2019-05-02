import React from 'react'
import {View, TextInput, Button, TouchableHighlight, StyleSheet} from 'react-native'

import layout from './../../constants/layout'
import FloatingTextInput from './../../commonComponents/FloatingTextInput'

class SignInForm extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      emailPhone: '',
      password: '',
    }
  }

  setInput = (stateName, val) => {
    this.setState({[stateName]:val})
  }

  signIn = () => {

  }

  render(){
    const {state, props} = this

    return (
      <View style={s.outer}>
        <FloatingTextInput
          borderBottomColor='#039BE5'
          setInput={this.setInput}
          stateName="emailPhone"
          title="Email/Phone"
          value={state.emailPhone}
          style={s.input}
          />
        <FloatingTextInput
          borderBottomColor='#039BE5'
          setInput={this.setInput}
          stateName="password"
          title="Password"
          value={state.password}
          style={s.input}
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
    // justifyContent: 'space-around',
    paddingHorizontal: 30,
    paddingVertical: 20
  },
  input: {
    borderBottomColor: '#039BE5',
    marginVertical: 10
  },
  button: {
    backgroundColor: '#17B4CB',
    marginVertical: 10,
    padding: 10,
    borderRadius: 20
  }
})