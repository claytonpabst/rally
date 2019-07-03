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
        drawerLabel: 'ViewInvite'

    }

    componentDidMount() {
        this.getInvite()
    }

    getInvite = () => {
        axios.get(`${url.url}/api/getInvite/${this.props.navigation.state.params.gameId}`).then(res => {
            console.log('getinvite', res.data)
            this.setState({ invite: res.data, info: res.data[0] })
        })
    }

    sendResponse = (response) => {
        axios.put(`${url.url}/api/inviteResponse`, { gameId: this.props.navigation.state.params.gameId, response: response, userId: this.props.id }).then(res => {
            this.setState({ invite: res.data, info: res.data[0] })
        }).catch(err => {
            alert('Sorry all spots are taken')
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

    goBack = () => {
        this.props.navigation.state.params.getInvites()
        this.props.navigation.goBack()
    }


    render() {
        console.log('view invite props', this.props.navigation.state.params)
        console.log('status', this.state.info.status)
        const { state, props } = this
        let confirmed = state.invite.filter(obj => obj.status === 'pre')
        let waiting = state.invite.filter(obj => obj.status === 'invited')

        return (
            <View style={{ flex: 1 }}>
                <Header navigation={props.navigation} />
                <Button color="#123" title="Go Back" onPress={
                    this.goBack} />

                <Button color="#123" title="Chat" onPress={() => this.props.navigation.navigate("GroupChat", {
                    gameId: this.props.navigation.state.params.gameId
                })} />


                <Text>View Invite</Text>
                <Text>date: {state.info.game_date}</Text>
                <Text>Location: {state.info.game_location} </Text>
                <Text>Info: {state.info.info}</Text>
                <Text>Coordinator {state.info.organizer_id}</Text>
                <Text>Confirmed</Text>
                <FlatList
                    data={confirmed}
                    renderItem={({ item }) => (
                        < ListItem
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
                {this.state.info.status === "confirmed" ? <Text>You are confirmed status </Text> :
                    <Button color="#123" title="Yes" onPress={() => this.sendResponse('confirmed')} />}
                {this.state.invite.status === 'no' ? <Text>You responded no</Text> :
                    <Button color="#123" title="No" onPress={() => this.sendResponse('no')} />}
                {this.state.info.organizer_id === this.props.id ? <Button color="#123" title="Add Player" onPress={() => alert()} /> : <View></View>}
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