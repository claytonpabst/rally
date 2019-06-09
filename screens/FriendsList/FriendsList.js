import React from 'react'
import { View, Button, Text, FlatList, ActivityIndicator, StyleSheet, TouchableHighlight, ScrollView } from 'react-native'
import { ListItem, SearchBar } from 'react-native-elements';
import axios from 'axios'
import { url } from '../../url'

import LogoHeader from './../../commonComponents/LogoHeader'
import Header from '../../commonComponents/MainHeader'


class FriendsList extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            friendsList: [],
            loading: false,
            data: [],
            error: null,
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
            this.setState({ friendsList: res.data, data: res.data })
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

        const newData = this.state.friendsList.filter(item => {
            const itemData = `${item.rating.toUpperCase()} ${item.first_name.toUpperCase()} ${item.first_name.toUpperCase()} ${item.location.toUpperCase()} `
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
        console.log('friendList key', this.props.navigation.state.key)
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
                                    { profileId: item.id, key: this.props.navigation.state.key }
                                )}
                            title={`${item.first_name} ${item.last_name}`}
                            subtitle={
                                <View>
                                    <Text>{`rating: ${item.rating} location: ${item.location}`}</Text>
                                </View>
                            }
                            rightElement={

                                <View>
                                    <Text onPress={() => alert('message')}>message</Text>
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