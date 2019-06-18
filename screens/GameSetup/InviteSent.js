import React from 'react'
import { Modal, View, Button, Text, StyleSheet, TouchableHighlight, ScrollView } from 'react-native'
import Header from '../../commonComponents/MainHeader'

const InviteSent = (props) => {
    return (
        <View>
            <Header navigation={props.navigation} />
            <Text>Invites have been sent</Text>
        </View>
    )
}
export default InviteSent;