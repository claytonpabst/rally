import React from 'react'
import {View, Button, Text, StyleSheet, TouchableHighlight, ScrollView} from 'react-native'

import LogoHeader from './../../commonComponents/LogoHeader'
import RegisterForm from './RegisterForm'

class Register extends React.Component {
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
          <ScrollView style={{flex:1}}>
            <View style={s.formHeader}>
              <Text style={s.formHeaderText}>Register</Text>
            </View>
            <View style={s.formContent}>
              <RegisterForm navigation={props.navigation}/>
            </View>
          </ScrollView>
        </View>
      </View>
    )
  }
}

export default Register

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