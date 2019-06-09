import React from 'react'
import { Modal, View, TextInput, Button, Text, StyleSheet, TouchableOpacity, TouchableHighlight, ScrollView } from 'react-native'
import { CheckBox } from 'react-native-elements'
import AuthContext from '../../globalState/AuthContext'
import Header from '../../commonComponents/MainHeader'


class GameInfo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

            timeOptions: [{ label: '1hr', value: 60 }, { label: '2hr', value: 120 }, { label: '4hr', value: 240 }, { label: '8hr', value: 480 }, { label: '1 day', value: 1440 }],
            priorityOptions: [{ label: 'none', value: false }, { label: 'priority invite', value: true }],
            date: '',
            time: '',
            location: '',
            playType: '',
            singlesChecked: false,
            doublesChecked: true,
            note: '',
            groupLimit: false,
            groupSize: null,
            priority: false,
            responseTime: null


        }
    }

    static navigationOptions = {
        drawerLabel: "Game Info",

    }

    setPlayType = playTypeData => {
        console.log('playtype', playTypeData)
        this.setState({ playType: playTypeData.value })
    };



    render() {
        console.log('state', this.state)
        return (

            <View style={s.formAreaWrapper}>
                <Header navigation={this.props.navigation} />
                <Text>Date</Text>
                <Text>Time</Text>
                <Text>Play Type</Text>
                <CheckBox
                    title="Doubles"
                    checked={this.state.doublesChecked}
                    onPress={() => this.setState({ playType: 'doubles', singlesChecked: false, doublesChecked: true })}
                />
                <CheckBox
                    title="Singles"
                    checked={this.state.singlesChecked}
                    onPress={() => this.setState({ playType: 'singles', singlesChecked: true, doublesChecked: false })}
                />

                <Text>Location:</Text>
                <TextInput
                    style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
                    onChangeText={(location) => this.setState({ location })}
                    value={this.state.location}
                    returnKeyType={"next"}
                    onSubmitEditing={() => { this.note.focus(); }}
                    blurOnSubmit={false}
                />
                <Text>Note:</Text>
                <TextInput
                    style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
                    onChangeText={(note) => this.setState({ note })}
                    value={this.state.note}
                    ref={(input) => { this.note = input; }}
                    returnKeyType={"next"}
                    onSubmitEditing={() => { this.size.focus(); }}
                    blurOnSubmit={false}

                />
                <Text>Group Size:</Text>

                <TextInput
                    style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
                    onChangeText={(groupSize) => this.setState({ groupSize })}
                    value={this.state.groupSize}
                    keyboardType='numeric'
                    returnKeyType='done'
                    maxLength={2}
                    ref={(input) => { this.size = input; }}
                    blurOnSubmit={true}
                />
                {/* <Text>Priority Invites</Text>
                <CheckBox
                    title="Priority Invites"
                    checked={this.state.priority}
                    onPress={() => this.setState({ priority: !this.state.priority })}
                />

                <Text>Time to respond</Text> */}

                <Button color="#123" title="Add Players" onPress={() => this.props.navigation.navigate("AddPlayers", {
                    date: this.state.date,
                    time: this.state.time,
                    location: this.state.location,
                    playType: this.state.playType,
                    note: this.state.note,
                    groupLimit: this.state.groupLimit,
                    groupSize: this.state.groupSize,
                    priority: this.state.priority,
                    responseTime: this.state.responseTime
                })} />
            </View>
        )

    }
}
export default (props => (
    <AuthContext>
        {authContext => (
            <GameInfo
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