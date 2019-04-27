import React from 'react'
import {View, Button, Text} from 'react-native'

class Dashboard extends React.Component {
  constructor(props){
    super(props)
    this.state = {

    }
  }

  render(){
    const {state, props} = this

    return (
      <View>
        <Text>Should be here if user is authorized</Text>
      </View>
    )
  }
}

export default Dashboard