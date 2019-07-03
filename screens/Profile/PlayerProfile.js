import React from 'react'
import { View, Image, Button, Text, FlatList, ActivityIndicator, StyleSheet, TouchableHighlight, ScrollView } from 'react-native'
import { StackActions } from "react-navigation";
import { CheckBox } from 'react-native-elements'
import axios from 'axios'
import { url } from '../../url'
import Header from '../../commonComponents/MainHeader'


class PlayerProfile extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            id: this.props.navigation.state.params.profileId,
            profile: {},

        }
    }
    static navigationOptions = {
        drawerLabel: "Player Profile",

    }

    componentDidMount() {
        this.getProfile()
    }


    getProfile = () => {
        axios.get(`${url.url}/api/playerProfile/${this.state.id}`).then(res => {
            this.setState({ profile: res.data })
        })
    }




    render() {
        console.log('key props', this.props.navigation.params)
        const { profile } = this.state

        return (
            <View style={{ flex: 1 }}>
                <Button
                    title='Go Back'
                    onPress={() => this.props.navigation.goBack(null)}

                />

                <Text>id: {this.props.id}</Text>
                <Image
                    style={{ width: 75, height: 75 }}
                    source={{ uri: profile.picture }}
                />
                <Text>Name: {profile.first_name} {profile.last_name}</Text>



                <Text>Birth Year: {profile.birth_year}</Text>

                <Text>Zip Code: {profile.location}</Text>

                <Text>Rating: {profile.rating}</Text>

                <Text>Rating Type: {profile.rating_type}</Text>

                <Text>About: {profile.about}</Text>

                <Text>Contact me to play:</Text>
                <CheckBox
                    title="Singles"
                    checked={profile.singles}

                />

                <CheckBox
                    title="Mixed"
                    checked={profile.mixed}

                />

                <CheckBox
                    title="Gender"
                    checked={profile.gender}

                />
                <CheckBox
                    title="Open"
                    checked={profile.open}

                />
                <Text
                    onPress={() =>
                        this.props.navigation.navigate(
                            "Chat",
                            { friendId: profile.id, fName: profile.first_name, lName: profile.last_name }
                        )}>Message
                                        </Text>

            </View>
        )
    }
}

export default PlayerProfile

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