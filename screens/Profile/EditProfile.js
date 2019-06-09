import React from 'react'
import { View, Button, Image, Text, StyleSheet, TextInput, TouchableHighlight, ScrollView } from 'react-native'
import { CheckBox } from 'react-native-elements'
import axios from 'axios'
import AuthContext from '../../globalState/AuthContext'
import { url } from '../../url'
import Header from '../../commonComponents/MainHeader'

class EditProfile extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            profile: [],
            firstName: '',
            lastName: '',
            picture: '',
            birthYear: null,
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
        console.log('hit git info')
        axios.get(`${url.url}/api/getMyInfo/${this.props.id}`).then(res => {
            console.log('getInfo', res.data)
            this.setState({
                firstName: res.data[0].first_name,
                lastName: res.data[0].last_name,
                picture: res.data[0].picture,
                birthYear: res.data[0].birth_year,
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
        axios.put(`${url.url}/api/submitProfileChanges/${this.props.id}`, { ...this.state }).
            then(this.props.navigation.navigate("Dashboard")

            )
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
                            <Image
                                style={{ width: 75, height: 75 }}
                                source={{ uri: this.state.picture }}
                            />
                            <Text>Name: {this.state.firstName} {this.state.lastName}</Text>
                            {/* <TextInput
                                style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
                                onChangeText={(name) => this.setState({ name })}
                                value={this.state.name}
                            /> */}
                            <Text>Phone Number:</Text>
                            <TextInput
                                style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
                                onChangeText={(phone) => this.setState({ phone })}
                                value={this.state.phone}
                                returnKeyType='done'
                                onSubmitEditing={() => { this.email.focus(); }}
                                blurOnSubmit={false}
                            />
                            <Text>Email:</Text>
                            <TextInput
                                style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
                                onChangeText={(email) => this.setState({ email })}
                                value={this.state.email}
                                ref={(input) => { this.email = input; }}
                                returnKeyType={"next"}
                                onSubmitEditing={() => { this.zipCode.focus(); }}
                                blurOnSubmit={false}
                            />
                            <Text>Birth Year: {this.state.birthYear}</Text>
                            <TextInput
                                style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
                                onChangeText={(birthYear) => this.setState({ birthYear })}
                                value={this.state.birthYear}
                                keyboardType='numeric'
                                returnKeyType='done'
                                maxLength={4}

                            />
                            <Text>Zip Code:</Text>
                            <TextInput
                                style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
                                onChangeText={(location) => this.setState({ location })}
                                value={this.state.location}
                                keyboardType='numeric'
                                maxLength={5}
                                ref={(input) => { this.zipCode = input; }}
                                returnKeyType='done'
                                onSubmitEditing={() => { this.rating.focus(); }}
                                blurOnSubmit={false}
                            />
                            <Text>Rating:</Text>
                            <TextInput
                                style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
                                onChangeText={(rating) => this.setState({ rating })}
                                value={this.state.rating}
                                keyboardType='numeric'
                                maxLength={3}
                                ref={(input) => { this.rating = input; }}
                                returnKeyType='done'
                                onSubmitEditing={() => { this.ratingType.focus(); }}
                                blurOnSubmit={false}
                            />
                            <Text>Rating Type:</Text>
                            <TextInput
                                style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
                                onChangeText={(rating_type) => this.setState({ rating_type })}
                                value={this.state.rating_type}
                                ref={(input) => { this.ratingType = input; }}
                                returnKeyType='next'
                                onSubmitEditing={() => { this.about.focus(); }}
                                blurOnSubmit={false}
                            />
                            <Text>About:</Text>
                            <TextInput
                                style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
                                onChangeText={(about) => this.setState({ about })}
                                value={this.state.about}
                                ref={(input) => { this.about = input; }}
                                // returnKeyType={"done"}
                                blurOnSubmit={true}
                            />
                            <Text>Contact me to play:</Text>
                            <CheckBox
                                title="Singles"
                                checked={this.state.singles}
                                onPress={() => this.setState({ singles: !this.state.singles })}
                            />

                            <CheckBox
                                title="Mixed"
                                checked={this.state.mixed}
                                onPress={() => this.setState({ mixed: !this.state.mixed })}
                            />

                            <CheckBox
                                title="Gender"
                                checked={this.state.gender}
                                onPress={() => this.setState({ gender: !this.state.gender })}
                            />
                            <CheckBox
                                title="Open"
                                checked={this.state.open}
                                onPress={() => this.setState({ open: !this.state.open })}
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