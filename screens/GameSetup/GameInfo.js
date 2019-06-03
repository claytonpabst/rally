import React from 'react'
import { Modal, View, TextInput, Button, Text, StyleSheet, TouchableOpacity, TouchableHighlight, ScrollView } from 'react-native'
import RadioForm, { RadioButton, RadioButtonInput, RadioButtonLabel } from 'react-native-simple-radio-button';
import AuthContext from '../../globalState/AuthContext'


class GameInfo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            playTypeData: [{ label: 'Doubles', value: 'doubles' }, { label: 'Singles', value: 'singles' }],
            timeOptions: [{ label: '1hr', value: 60 }, { label: '2hr', value: 120 }, { label: '4hr', value: 240 }, { label: '8hr', value: 480 }, { label: '1 day', value: 1440 }],
            priorityOptions: [{ label: 'none', value: false }, { label: 'priority invite', value: true }],
            date: '',
            time: '',
            location: '',
            playType: '',
            note: '',
            groupLimit: false,
            groupSize: null,
            priority: false,
            responseTime: null,
            playTypeProps: [
                { label: 'Doubles', value: 'doubles' },
                { label: 'Singles', value: 'singles' }]


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
                <Text>Date</Text>
                <Text>Time</Text>
                <Text>Play Type</Text>
                <RadioForm
                    playTypeProps={this.state.playTypeProps}
                    initial={'doubles'}
                    onPress={(value) => { this.setState({ playType: value }) }}
                />
                <Text>Location:</Text>
                <TextInput
                    style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
                    onChangeText={(location) => this.setState({ location })}
                    value={this.state.location}
                />
                <Text>Note:</Text>
                <TextInput
                    style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
                    onChangeText={(note) => this.setState({ note })}
                    value={this.state.note}
                />
                <Text>Group Size:</Text>
                <TextInput
                    style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
                    onChangeText={(groupSize) => this.setState({ groupSize })}
                    value={this.state.groupSize}
                />
                <Text>Priority Invites</Text>


                <Text>Time to respond</Text>

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