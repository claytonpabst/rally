import React from 'react'

const {Provider, Consumer} = React.createContext()

class AuthContext extends React.Component {
  constructor(){
    super()
    this.state = {
      authenticated: false,
      username: ''
    }
  }

  componentDidMount(){
    setTimeout(() => {
      this.setState({authenticated:true, username: 'Clayton'})
    }, 3000)
  }

  render() {
    const {props, state} = this

    return (
      <Provider
        value={{
          authenticated: state.authenticated,
          username: state.username
        }}
      >
        {props.children}
      </Provider>
    )
  }
}

export {AuthContext}

export default Consumer