import React from 'react'
import {View, Text} from 'react-native'

import AuthContext from '../../globalState/AuthContext'

class InitialAuth extends React.Component {
  constructor(props){
    super(props)
    this.state = {

    }
  }

  componentDidUpdate() {
    console.log(this.props)
    this.props.navigation.navigate(this.props.authenticated ? "Dashboard" : "SignIn")
  }

  render(){
    return (
      <View>
        <Text>Initial session will be loaded here then navigated to sign in or dashboard</Text>
      </View>
    )
  }
}

export default (props => (
  <AuthContext>
    {authContext => (
      <InitialAuth 
        {...props} 
        authenticated={authContext.authenticated} 
        username={authContext.username}
      />
    )}
  </AuthContext>
))