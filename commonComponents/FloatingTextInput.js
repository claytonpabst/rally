import React, { Component } from 'react';
import { View, Animated, StyleSheet, TextInput } from 'react-native';
import { string, func } from 'prop-types';

class FloatingTextInput extends Component {
  static propTypes = {
    stateName: string.isRequired,
    title: string.isRequired,
    value: string.isRequired,
    setInput: func.isRequired,
    borderBottomColor: string.isRequired,
  }

  constructor(props) {
    super(props);
    const { value } = this.props;
    this.position = new Animated.Value(value ? 1 : 0);
    this.state = {
      isFieldActive: false,
    }
  }

  _handleFocus = () => {
    if (!this.state.isFieldActive) {
      this.setState({ isFieldActive: true });
      Animated.timing(this.position, {
        toValue: 1,
        duration: 150,
      }).start();
    }
  }

  _handleBlur = () => {
    if (this.state.isFieldActive && !this.props.value) {
      this.setState({ isFieldActive: false });
      Animated.timing(this.position, {
        toValue: 0,
        duration: 150,
      }).start();
    }
  }

  _onChangeText = (updatedValue) => {
    const { stateName, setInput } = this.props; 
    setInput(stateName, updatedValue);
  }

  _returnAnimatedTitleStyles = () => {
    const { isFieldActive } = this.state;
    return {
      top: this.position.interpolate({
        inputRange: [0, 1],
        outputRange: [14, 0],
      }),
      fontSize: isFieldActive ? 11.5 : 18,
      color: isFieldActive ? 'black' : '#aaa',
    }
  }

  render() {
    return (
      <View style = {{...Styles.container, ...this.props.style}}>
        <Animated.Text
          style = {[Styles.titleStyles, this._returnAnimatedTitleStyles()]}
        >
          {this.props.title}
        </Animated.Text>
        <TextInput
          value = {this.props.value}
          style = {Styles.textInput}
          underlineColorAndroid = 'transparent'
          onFocus = {this._handleFocus}
          onBlur = {this._handleBlur}
          onChangeText = {this._onChangeText}
        />
      </View>
    )
  }
}

export default FloatingTextInput

const Styles = StyleSheet.create({
  container: {
    padding: 5,
    width: '100%',
    borderStyle: 'solid',
    // borderWidth: 2,
    borderBottomWidth: 2,
    height: 50,
  },
  textInput: {
    fontSize: 18,
    marginTop: 10,
    fontFamily: 'Avenir-Medium',
    color: 'black',
  },
  titleStyles: {
    position: 'absolute',
    fontFamily: 'Avenir-Medium',
    left: 3,
    left: 4,
  }
})