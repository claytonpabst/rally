import React from 'react'
import { View, Button, Text, FlatList, ActivityIndicator, StyleSheet, TouchableHighlight, ScrollView } from 'react-native'
import { ListItem, SearchBar } from 'react-native-elements';
import axios from 'axios'
import { url } from '../../url'
import AuthContext from '../../globalState/AuthContext'

import LogoHeader from './../../commonComponents/LogoHeader'
import Header from '../../commonComponents/MainHeader'


class PlayerSearch extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            players: [],
            loading: false,
            data: [],
            error: null
        }
    }
    static navigationOptions = {
        drawerLabel: "Player Search",

    }

    componentDidMount() {
        this.playerList()
    }

    playerList = () => {
        axios.get(`${url.url}/api/playerList/${this.props.id}`).then(res => {
            console.log(res.data)
            this.setState({ players: res.data, data: res.data })
        })
    }


    addFriend = (friendId) => {
        axios.post(`${url.url}/api/addFriend/${this.props.id}`, { friendID: friendId }).then(res => {
            this.setState({ players: res.data, data: res.data })
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

    searchFilterFunction = text => {
        this.setState({
            value: text,
        });

        const newData = this.state.players.filter(item => {
            const itemData = `${item.rating.toUpperCase()} ${item.first_name.toUpperCase()} ${item.last_name.toUpperCase()} ${item.location.toUpperCase()} `;
            const textData = text.toUpperCase();

            return itemData.indexOf(textData) > -1;
        });
        this.setState({
            data: newData,
        });
    };

    renderHeader = () => {
        return (
            <SearchBar
                placeholder="Type Here..."
                lightTheme
                round
                onChangeText={text => this.searchFilterFunction(text)}
                autoCorrect={false}
                value={this.state.value}
            />
        );
    };

    render() {

        return (
            <View style={{ flex: 1 }}>
                <Header navigation={this.props.navigation} />
                <FlatList
                    data={this.state.data}
                    renderItem={({ item }) => (
                        <ListItem
                            leftAvatar={{ source: { uri: item.picture } }}

                            onPress={() =>
                                this.props.navigation.navigate(
                                    'PlayerProfile',
                                    { profileId: item.id, screen: 'PlayerSearch' }
                                )}

                            title={`${item.first_name} ${item.last_name}`}
                            subtitle={
                                <View>
                                    <Text>{`${item.rating} ${item.location}`}</Text>
                                </View>
                            }
                            rightElement={

                                <View>
                                    {item.request_confirmed === 'confirmed' ?
                                        <Text>Friends</Text> : item.friend_request === 'sent' ?
                                            <Text>Request Sent</Text> :


                                            <Text onPress={() => this.addFriend(item.id)}>add friend</Text>}
                                </View>}

                        />
                    )}
                    keyExtractor={item => item.email}
                    ItemSeparatorComponent={this.renderSeparator}
                    ListHeaderComponent={this.renderHeader}

                />
            </View>
        )
    }
}

export default (props => (
    <AuthContext>
        {authContext => (
            <PlayerSearch
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
        fontSize: 35,
        fontWeight: 'bold'
    },
    formContent: {
        // backgroundColor: 'orange',
        flex: 3,
    },
})