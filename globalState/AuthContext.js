import React from 'react'

const { Provider, Consumer } = React.createContext()

class AuthContext extends React.Component {
  constructor() {
    super()
    this.state = {
      authenticated: false,
      id: null,
      username: ''
    }
  }

  componentDidMount() {
    setTimeout(() => {
      this.setState({ authenticated: true, id: 1, username: 'test' })
    }, 100)
  }

  render() {
    const { props, state } = this

    return (
      <Provider
        value={{
          authenticated: state.authenticated,
          username: state.username,
          id: state.id
        }}
      >
        {props.children}
      </Provider>
    )
  }
}

export { AuthContext }

export default Consumer