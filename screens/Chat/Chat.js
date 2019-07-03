import React from 'react'
import { GiftedChat } from 'react-native-gifted-chat'
import axios from 'axios'
import { View, Button, Text, Image } from 'react-native'
import io from 'socket.io-client'
import { url } from '../../url'

import Header from '../../commonComponents/MainHeader'
import AuthContext from '../../globalState/AuthContext'


class Chat extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            input: '',
            message: '',
            messages: [],
            room: null
        }
    }


    static navigationOptions = {
        drawerLabel: "Chat"
    }

    componentDidMount() {
        this.setSocketListeners()
        this.joinChatRoom()

    }

    componentWillUnmount() {
        this.socket.disconnect()
    }

    setSocketListeners = () => {
        this.socket = io(url.url)

        this.socket.on('sendMsg', (messages) => {
            this.setState({ messages: messages })
        })
        // this.joinChatRoom()
        // this.socket.emit('joinRoom', this.state.room)
    }

    joinChatRoom = async () => {
        let myId = this.props.id
        let friendId = this.props.navigation.state.params.friendId
        let highUser
        let lowUser
        if (myId > friendId) {
            highUser = myId
            lowUser = friendId
        } else {
            highUser = friendId
            lowUser = myId
        }
        const roomId = highUser + ':' + lowUser
        console.log(roomId)
        await this.setState({ room: roomId })
        this.socket.emit('joinRoom', roomId)
        this.getMessages()
    }

    getMessages = () => {
        axios.get(`${url.url}/api/getMessages/${this.state.room}`).then(res => {
            console.log('messages', res.data)
            this.setState({
                messages: res.data
            })
        })
    }

    sendMessage = (messages) => {
        console.log(4545, messages[0].createdAt)
        this.socket.emit('sendMsg', {
            room: `${this.state.room}`,
            text: messages[0].text,
            createdAt: messages[0].createdAt,
            user_id: this.props.id
        })
        this.setState({ message: '' })
    }


    render() {
        console.log('chat friendId', this.props.navigation.state.params.friendId)


        return (
            <View style={{ flex: 1 }}>
                <Header navigation={this.props.navigation} />
                {/* <Button color="#123" title="Play Details" onPress={() => this.props.navigation.navigate("ViewInvite", {
                    gameId: this.props.navigation.state.params.gameId
                })} /> */}


                <Text>Chat with {this.props.navigation.state.params.fName} {this.props.navigation.state.params.lName}</Text>
                <GiftedChat
                    messages={this.state.messages}
                    onSend={messages => this.sendMessage(messages)}
                    inverted={false}
                    user={{
                        _id: 1,
                    }}
                />



            </View>
        )
    }
}

export default (props => (
    <AuthContext>
        {authContext => (
            <Chat
                {...props}
                authenticated={authContext.authenticated}
                username={authContext.username}
                id={authContext.id}
            />
        )}
    </AuthContext>
))