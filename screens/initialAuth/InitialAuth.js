import React from 'react'
import {View, Text} from 'react-native'

class InitialAuth extends React.Component {
  constructor(props){
    super(props)
    this.state = {

    }
  }

  componentDidMount(){
    setTimeout(() => {
      console.log(this.props)
      this.props.navigation.navigate("SignIn")
    }, 1000)
  }

  render(){
    return (
      <View>
        <Text>Initial session will be loaded here.</Text>
      </View>
    )
  }
}

export default InitialAuth