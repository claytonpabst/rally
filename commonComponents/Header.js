import React from 'react'
import {View, StyleSheet, Image, TouchableHighlight} from 'react-native'
import {Left, Button, Text, Header, Icon} from 'native-base'

import layout from './../constants/layout'

const MainHeader = (props) => {
  console.log(props)
  return (
    <View style={s.outer}>
      <View style={s.contentWrapper}>
        <TouchableHighlight onPress={() => props.navigation.openDrawer()}>
          <Image style={s.ham} source={require('./../assets/images/ham-menu.png')}/>
        </TouchableHighlight>
      </View>
    </View> 
  )
}

export default MainHeader

const screenX = layout.window.width
const screenY = layout.window.height
const hamSize = screenX / 9
const s = StyleSheet.create({
  outer: {
    backgroundColor: '#F4F6F8',
    padding: 10,
    paddingLeft: screenX * .05,
  },
  contentWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 0,
    width: screenX * .9,
  },
  ham: {
    justifyContent: 'center',
    height: hamSize,
    width: hamSize
  }
})