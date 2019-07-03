import React from 'react'
import { View, Button, Text, FlatList, ActivityIndicator, StyleSheet, TouchableHighlight, ScrollView } from 'react-native'
import { ListItem, SearchBar } from 'react-native-elements';
import axios from 'axios'
import { url } from '../../url'

import Header from '../../commonComponents/MainHeader'
import AuthContext from '../../globalState/AuthContext'


class InviteList extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            invites: [],
            loading: false,
            data: [],
            error: null

        }
    }

    static navigationOptions = {
        drawerLabel: "Invite List",
    }

    componentDidMount() {
        this.getInvites()
    }

    getInvites = () => {
        axios.get(`${url.url}/api/inviteList/${this.props.id}`).then(res => {
            this.setState({
                invites: res.data,
                data: res.data
            })
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

        const newData = this.state.invites.filter(item => {
            const itemData = `${item.game_date.toUpperCase()} ${item.location.toUpperCase()} `
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
                            // leftAvatar={<Text>{item.game_date}</Text>}

                            onPress={() =>
                                this.props.navigation.navigate(
                                    'ViewInvite',
                                    { gameId: item.game_id, getInvites: this.getInvites }
                                )}
                            title={`${item.game_date} ${item.game_time}`}
                            subtitle={
                                <View>
                                    <Text>{`location: ${item.location}`}</Text>
                                    <Text>{`spots left: ${item.spots_left}`}</Text>
                                </View>
                            }
                            rightElement={

                                <View>
                                    <Text onPress={() => alert('message')}>message</Text>
                                </View>}

                        />
                    )}
                    keyExtractor={item => item.game_id}
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
            <InviteList
                {...props}
                authenticated={authContext.authenticated}
                username={authContext.username}
                id={authContext.id}
            />
        )}
    </AuthContext>
))