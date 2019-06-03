import React from 'react'
import { Modal, View, Button, Text, StyleSheet, TouchableHighlight, ScrollView } from 'react-native'
import axios from 'axios'
import { url } from '../../url'
import AuthContext from '../../globalState/AuthContext'

import LogoHeader from './../../commonComponents/LogoHeader'
import Header from '../../commonComponents/MainHeader'
import NameModal from './NameModal'
import SearchName from './SearchName'


class AddPlayers extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            friends: [],
            preConfirmed:
                [{ name: this.props.username, status: 'pre', friend_id: this.props.id }],
            invited: []
        }
    }
    static navigationOptions = {
        drawerLabel: "Add Players",

    }


    componentDidMount() {
        this.getFriends()
    }

    addPreConfirmed = (friend, i) => {
        friend.status = 'pre'
        let removeFriend = [...this.state.friends]
        let newFriends = removeFriend.filter(person => {
            return person !== friend
        })
        this.setState({ preConfirmed: [...this.state.preConfirmed, friend], friends: newFriends })
    }

    addInvites = (friend, i) => {
        let removeFriend = [...this.state.friends]
        friend.status = 'invited'
        let newFriends = removeFriend.filter(person => {
            return person !== friend
        })
        this.setState({ invited: [...this.state.invited, friend], friends: newFriends })
    }



    getFriends = () => {
        axios.get(`${url.url}/api/getFriendsToInvite/${this.props.id}`).then(res => {
            console.log(res.data)
            this.setState({ friends: res.data })
        })
    }

    invite = () => {
        axios.post(`${url.url}/api/invite`, { coordinatorId: this.props.id, matchInfo: this.props.navigation.state.params, preConfirmed: this.state.preConfirmed, invite: this.state.invited }).then(this.props.navigation.navigate("InviteSent"))

    }

    render() {
        const { state, props } = this
        let mappedConfirmed = state.preConfirmed.map((player, i) => {
            return (
                <View key={i} style={{ flex: 1 }} >
                    <Text style={s.name}>{player.name}</Text>
                </View>
            )
        })

        let mappedInvited = state.invited.map((player, i) => {
            return (
                <View key={i} style={{ flex: 1 }} >
                    <Text style={s.name}>{player.name}</Text>
                </View>
            )
        })

        // let mappedFriends = state.friends.map((friend, i) => {
        //     return (
        //         <View key={i} style={{ flex: 1 }} >
        //             {/* <Text onPress={() => this.addPreConfirmed(friend, i)}>Pre</Text>
        //             <Text onPress={() => this.addInvites(friend, i)}>invite</Text> */}

        // <Button
        //     onPress={() => this.addPreConfirmed(friend, i)}
        //     title='Pre'
        //     accessibilityLabel="Pre-Confirm" />
        // <Button
        //     onPress={() => this.addInvites(friend, i)}
        //     title='Invite'
        //     accessibilityLabel="Invite" />
        //             <Text style={s.formHeaderText} >
        //                 {friend.name} </Text>
        //         </View>
        //     )
        // })

        return (
            <View style={{ flex: 1 }}>
                <Header navigation={props.navigation} />
                {/* <LogoHe
                ader /> */}
                <View style={{ height: 300 }}>
                    <SearchName
                        friends={this.state.friends}
                        addPreConfirmed={this.addPreConfirmed}
                        addInvites={this.addInvites}
                    />
                </View>
                <View style={s.formAreaWrapper}>
                    {/* <SearchName
                        friends={this.state.friends} /> */}
                    <ScrollView style={{ flex: 1 }}>

                        <View style={s.formHeader}>
                            <Text style={s.formHeaderText}>Pre-Confirmed</Text>
                            {mappedConfirmed}
                        </View>

                        <View style={s.formHeader}>
                            <Text style={s.formHeaderText}>Invited</Text>

                            {mappedInvited}
                        </View>

                    </ScrollView>

                </View>

                <Button
                    onPress={() => this.invite()}
                    title='Send'
                    accessibilityLabel="Send" />
            </View>
        )
    }
}

export default (props => (
    <AuthContext>
        {authContext => (
            <AddPlayers
                {...props}
                authenticated={authContext.authenticated}
                username={authContext.username}
                id={authContext.id}
            />
        )}
    </AuthContext>
))

const s = StyleSheet.create({
    formAreaWrapper: {
        flex: 3
    },
    formHeader: {
        // backgroundColor:'pink',
        flex: .5,
        justifyContent: 'center',
        alignItems: 'center'
    },
    formHeaderText: {
        color: '#F7567C',
        fontSize: 25,
        fontWeight: 'bold'
    },
    name: {
        color: '#333',
        fontSize: 20,
    },
    formContent: {
        // backgroundColor: 'orange',
        flex: 3,
    },
})