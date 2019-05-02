import React from 'react'
import {View, TextInput, Button, TouchableHighlight, StyleSheet} from 'react-native'

import layout from './../../constants/layout'
import FloatingTextInput from './../../commonComponents/FloatingTextInput'

class RegisterForm extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      firstName: '',
      lastName:'',
      phone:'',
      email: '',
      password: '',
      passwordConfirm: ''
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
          stateName="firstName"
          title="First Name"
          value={state.firstName}
          style={s.input}
        />
        <FloatingTextInput
          borderBottomColor='#039BE5'
          setInput={this.setInput}
          stateName="lastName"
          title="Last Name"
          value={state.lastName}
          style={s.input}
        />
        <FloatingTextInput
          borderBottomColor='#039BE5'
          setInput={this.setInput}
          stateName="phone"
          title="Phone"
          value={state.phone}
          style={s.input}
        />
        <FloatingTextInput
          borderBottomColor='#039BE5'
          setInput={this.setInput}
          stateName="email"
          title="Email"
          value={state.email}
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
        <FloatingTextInput
          borderBottomColor='#039BE5'
          setInput={this.setInput}
          stateName="passwordConfirm"
          title="Re-Type Password"
          value={state.passwordConfirm}
          style={s.input}
        />
        <TouchableHighlight style={s.button}>
          <Button color="#fff" title="Register" onPress={this.signIn}/>
        </TouchableHighlight>
        <TouchableHighlight style={s.button}>
          <Button color="#fff" title="Back" onPress={() => props.navigation.navigate("SignIn")}/>
        </TouchableHighlight>
      </View>
    )
  }
}

export default RegisterForm

const s = StyleSheet.create({
  outer: {
    flex: 1,
    // justifyContent: 'space-around',
    paddingHorizontal: 30,
    paddingVertical: 10,
  },
  input: {
    borderBottomColor: '#039BE5',
    marginVertical: 5
  },
  button: {
    backgroundColor: '#17B4CB',
    marginVertical: 5,
    padding: 10,
    borderRadius: 20
  }
})