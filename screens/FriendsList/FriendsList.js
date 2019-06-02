import React from 'react'
import { View, Button, Text, StyleSheet, TouchableHighlight, ScrollView } from 'react-native'
import axios from 'axios'
import { url } from '../../url'

import LogoHeader from './../../commonComponents/LogoHeader'
import Header from '../../commonComponents/MainHeader'


class FriendsList extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            friendsList: []
        }
    }
    static navigationOptions = {
        drawerLabel: "Friends List",

    }

    componentDidMount() {
        this.friendsList()
    }





    friendsList = () => {
        axios.get(`${url.url}/api/friendsList/1`).then(res => {
            console.log(res.data)
            this.setState({ friendsList: res.data })
        })
    }

    render() {
        const { state, props } = this
        let mappedPlayers = state.friendsList.map((player, i) => {
            return (
                <View key={i} style={{}} >
                    <Text style={s.formHeaderText}>{player.name}</Text>
                    <Text>{player.location} {player.rating}</Text>
                    <Text></Text>
                </View>
            )
        })

        return (
            <View style={{ flex: 1 }}>
                <Header navigation={props.navigation} />
                <LogoHeader />
                <View style={s.formAreaWrapper}>
                    <ScrollView style={{ flex: 1 }}>
                        <View style={s.formHeader}>
                            <Text style={s.formHeaderText}>Friends List</Text>

                            {mappedPlayers}
                        </View>

                    </ScrollView>
                </View>
            </View>
        )
    }
}

export default FriendsList

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
        fontSize: 35,
        fontWeight: 'bold'
    },
    formContent: {
        // backgroundColor: 'orange',
        flex: 3,
    },
})