import React from 'react'
import {View, StyleSheet, ImageBackground} from 'react-native'

import layout from '../constants/layout'

const LogoHeader = () => {
  return (
    <ImageBackground source={require('./../assets/images/big-logo.png')} style={s.outer}>

    </ImageBackground> 
  )
}

export default LogoHeader

const screenX = layout.window.width
const screenY = layout.window.height

const s = StyleSheet.create({
  outer: {
    backgroundColor: 'pink',
    flex: 1,
    padding: 10,
    paddingLeft: screenX * .05,
  },
})