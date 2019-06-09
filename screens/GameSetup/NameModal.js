import React from 'react'
import { Modal, View, Button, Text, StyleSheet, TouchableHighlight, ScrollView } from 'react-native'

const NameModal = (props) => {

    let mappedNames = props.friends.map((friend, i) => {
        return (
            <View key={i}>
                <Text style={s.formHeaderText} onPress={() => props.addPreConfirmed(friend, i)}> {friend.first_name} {friend.last_name}</Text>
            </View>
        )
    })

    return (
        <View>
            <Text>This is a modal</Text>
            {mappedNames}
        </View>
    )

}
export default NameModal

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