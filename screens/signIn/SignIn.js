import React from 'react'
import {View, Button, Text, StyleSheet, TouchableHighlight} from 'react-native'

import LogoHeader from './../../commonComponents/LogoHeader'
import SignInForm from './SignInForm'

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
      <View style={{flex:1}}>
        <LogoHeader/>
        <View style={s.formAreaWrapper}>
          <View style={s.formHeader}>
            <Text style={s.formHeaderText}>Sign In</Text>
          </View>
          <View style={s.formContent}>
            <SignInForm navigation={props.navigation}/>
          </View>
        </View>
      </View>
    )
  }
}

export default SignIn

const s = StyleSheet.create({
  formAreaWrapper: {
    flex: 3
  },
  formHeader: {
    // backgroundColor:'pink',
    flex: .5,
    justifyContent: 'center',
    alignItems: 'center'
  },
  formHeaderText: {
    color: '#F7567C',
    fontSize: 35,
    fontWeight: 'bold'
  },
  formContent: {
    // backgroundColor: 'orange',
    flex: 3,
  },
})