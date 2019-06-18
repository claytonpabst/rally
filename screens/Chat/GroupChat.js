import React from 'react'
import { GiftedChat } from 'react-native-gifted-chat'
import axios from 'axios'
import { View, Button, Text, Image } from 'react-native'
import io from 'socket.io-client'
import { url } from '../../url'

import Header from '../../commonComponents/MainHeader'
import AuthContext from '../../globalState/AuthContext'


class GroupChat extends React.Component {
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
        drawerLabel: "GroupChat"
    }

    componentDidMount() {
        this.setSocketListeners()
        this.joinChatRoom()
        this.getMessages()

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
        console.log('hit joinchatroom')
        await this.socket.emit('joinRoom', `${this.props.navigation.state.params.gameId}`)
        // this.getChat()
    }

    getMessages = () => {
        axios.get(`${url.url}/api/getMessages/${this.props.navigation.state.params.gameId}`).then(res => {
            console.log('messages', res.data)
            this.setState({
                messages: res.data
            })
        })
    }

    sendMessage = (messages) => {
        console.log(4545, messages[0].createdAt)
        this.socket.emit('sendMsg', {
            room: `${this.props.navigation.state.params.gameId}`,
            text: messages[0].text,
            createdAt: messages[0].createdAt,
            user_id: this.props.id
        })
        this.setState({ message: '' })
    }


    render() {
        console.log('group chat gameId', this.props.navigation.state.params.gameId)


        return (
            <View style={{ flex: 1 }}>
                <Header navigation={this.props.navigation} />
                {/* <Button color="#123" title="Play Details" onPress={() => this.props.navigation.navigate("ViewInvite", {
                    gameId: this.props.navigation.state.params.gameId
                })} /> */}


                <Text>Group Chat</Text>
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
            <GroupChat
                {...props}
                authenticated={authContext.authenticated}
                username={authContext.username}
                id={authContext.id}
            />
        )}
    </AuthContext>
))