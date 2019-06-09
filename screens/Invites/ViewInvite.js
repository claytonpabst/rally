import React from 'react'
import { View, Button, Text, FlatList, ActivityIndicator, StyleSheet, TouchableHighlight, ScrollView } from 'react-native'
import { ListItem } from 'react-native-elements'; import axios from 'axios';
import { url } from '../../url'

import Header from '../../commonComponents/MainHeader'
import AuthContext from '../../globalState/AuthContext'



class ViewInvite extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            invite: [],
            info: {}
        }
    }

    static navigationOptions = {
        drawerLabel: "View Invite",
        drawerIcon: ({ tintColor }) => (
            <Image source={require('./../../assets/images/robot-dev.png')} />
        )
    }

    componentDidMount() {
        this.getInvite()
    }

    getInvite = () => {
        axios.get(`${url.url}/api/getInvite/46`).then(res => {
            console.log('getinvite', res.data)
            this.setState({ invite: res.data, info: res.data[0] })
        })
    }

    renderSeparator = () => {
        return (
            <View
                style={{
                    height: 1,
                    width: '86%',
                    backgroundColor: '#CED0CE',
                    marginLeft: '14%',
                }}
            />
        );
    };


    render() {
        const { state, props } = this
        let confirmed = state.invite.filter(obj => obj.status === 'pre')
        let waiting = state.invite.filter(obj => obj.status === 'invited')

        return (
            <View style={{ flex: 1 }}>
                <Header navigation={props.navigation} />
                <Text>View Invite</Text>
                <Text>date: {state.info.game_date}</Text>
                <Text>Location: {state.info.game_location} </Text>
                <Text>Info: {state.info.info}</Text>
                <Text>Confirmed</Text>
                <FlatList
                    data={confirmed}
                    renderItem={({ item }) => (
                        <ListItem
                            leftAvatar={{ source: { uri: item.picture } }}
                            title={`${item.first_name} ${item.last_name}`}
                        />
                    )}
                    keyExtractor={item => item.email}
                    ItemSeparatorComponent={this.renderSeparator}
                />
                <Text>Waiting</Text>
                <FlatList
                    data={waiting}
                    renderItem={({ item }) => (
                        <ListItem
                            leftAvatar={{ source: { uri: item.picture } }}
                            title={`${item.first_name} ${item.last_name}`}
                        />
                    )}
                    keyExtractor={item => item.email}
                    ItemSeparatorComponent={this.renderSeparator}
                />
            </View>
        )
    }
}

export default (props => (
    <AuthContext>
        {authContext => (
            <ViewInvite
                {...props}
                authenticated={authContext.authenticated}
                username={authContext.username}
                id={authContext.id}
            />
        )}
    </AuthContext>
))