import React from 'react'
import { View, Button, Text, StyleSheet, TextInput, TouchableHighlight, ScrollView } from 'react-native'
import axios from 'axios'
import AuthContext from '../../globalState/AuthContext'
import { url } from '../../url'
import Header from '../../commonComponents/MainHeader'

class EditProfile extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            name: '',
            birth_year: null,
            location: '',
            rating: '',
            rating_type: null,
            about: '',
            singles: null,
            mixed: null,
            gender: null,
            open: null,
            phone: '',
            email: ''
        }
    }

    componentDidMount() {
        this.getInfo()
    }

    static navigationOptions = {
        drawerLabel: "Edit Profile",

    }

    getInfo = () => {
        axios.get(`${url.url}/api/getMyInfo/${this.props.id}`).then(res => {
            console.log('getInfo', res.data)
            this.setState({
                name: res.data[0].name,
                birth_year: res.data[0].birth_year,
                location: res.data[0].location,
                rating: res.data[0].rating,
                rating_type: res.data[0].rating_type,
                about: res.data[0].about,
                singles: res.data[0].singles,
                mixed: res.data[0].mixed,
                gender: res.data[0].gender,
                open: res.data[0].open,
                phone: res.data[0].phone,
                email: res.data[0].email

            })
        })
    }

    submitChanges = () => {
        axios.put(`${url.url}/api/submitProfileChanges/${this.props.id}`, { ...this.state })
    }

    setInput = (stateName, val) => {
        this.setState({ [stateName]: val })
    }


    render() {

        return (
            <View style={s.formAreaWrapper}>
                <Header navigation={this.props.navigation} />
                <View style={s.formAreaWrapper}>
                    <ScrollView style={{ flex: 1 }}>
                        <View>
                            <Text>Name:</Text>
                            <TextInput
                                style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
                                onChangeText={(name) => this.setState({ name })}
                                value={this.state.name}
                            />
                            <Text>Phone Number:</Text>
                            <TextInput
                                style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
                                onChangeText={(phone) => this.setState({ phone })}
                                value={this.state.phone}
                            />
                            <Text>Email:</Text>
                            <TextInput
                                style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
                                onChangeText={(email) => this.setState({ email })}
                                value={this.state.email}
                            />
                            <Text>Birth Year:</Text>
                            <TextInput
                                style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
                                onChangeText={(birth_year) => this.setState({ birth_year })}
                                value={this.state.birth_year}
                            />
                            <Text>Zip Code:</Text>
                            <TextInput
                                style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
                                onChangeText={(location) => this.setState({ location })}
                                value={this.state.location}
                            />
                            <Text>Rating:</Text>
                            <TextInput
                                style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
                                onChangeText={(rating) => this.setState({ rating })}
                                value={this.state.rating}
                            />
                            <Text>Rating Type:</Text>
                            <TextInput
                                style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
                                onChangeText={(rating_type) => this.setState({ rating_type })}
                                value={this.state.rating_type}
                            />
                            <Text>About:</Text>
                            <TextInput
                                style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
                                onChangeText={(about) => this.setState({ about })}
                                value={this.state.about}
                            />
                            <Text>Singles?:</Text>
                            <TextInput
                                style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
                                onChangeText={(singles) => this.setState({ singles })}
                                value={this.state.singles}
                            />
                            <Text>Mixed?:</Text>
                            <TextInput
                                style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
                                onChangeText={(mixed) => this.setState({ mixed })}
                                value={this.state.mixed}
                            />
                            <Text>Gender?</Text>
                            <TextInput
                                style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
                                onChangeText={(gender) => this.setState({ gender })}
                                value={this.state.gender}
                            />
                            <Text>Open</Text>
                            <TextInput
                                style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
                                onChangeText={(open) => this.setState({ open })}
                                value={this.state.open}
                            />
                            <Button color="#123" title="Save Changes" onPress={() => this.submitChanges()} />
                        </View>
                    </ScrollView>
                </View>
            </View>
        )
    }
}

export default (props => (
    <AuthContext>
        {authContext => (
            <EditProfile
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
        flex: 3,
        margin: 10
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