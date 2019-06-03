import React from 'react'
import { View, Button, Text, StyleSheet, TouchableHighlight, ScrollView } from 'react-native'
import axios from 'axios'
import { url } from '../../url'

import LogoHeader from './../../commonComponents/LogoHeader'
import Header from '../../commonComponents/MainHeader'


class PlayerSearch extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            players: []
        }
    }
    static navigationOptions = {
        drawerLabel: "Player Search",

    }

    componentDidMount() {
        this.playerList()
    }





    playerList = () => {
        axios.get(`${url.url}/api/playerList`).then(res => {
            console.log(res.data)
            this.setState({ players: res.data })
        })
    }

    render() {
        const { state, props } = this
        let mappedPlayers = state.players.map((player, i) => {
            return (
                <View key={i} style={{ flex: 1 }} >
                    <Text>Name long text to see what happends</Text>
                    <Text style={s.formHeaderText}>{player.name}</Text>
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
                            <Text style={s.formHeaderText}>Search For Players</Text>

                            {mappedPlayers}
                        </View>

                    </ScrollView>
                </View>
            </View>
        )
    }
}

export default PlayerSearch

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