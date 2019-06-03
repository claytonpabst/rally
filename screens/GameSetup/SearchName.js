import React from 'react'
import { Modal, View, Button, Text, StyleSheet, TouchableOpacity, TouchableHighlight, ScrollView } from 'react-native'
// import SearchInput, { createFilter } from 'react-native-search-filter';
const KEYS_TO_FILTERS = [name]

class SearchName extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            searchTerm: ''
        }
    }
    searchUpdated(term) {
        this.setState({ searchTerm: term })
    }
    render() {
        const filteredFriends = this.props.friends.filter(createFilter(this.state.searchTerm, KEYS_TO_FILTERS))

        return (
            <View style={styles.container}>
                <SearchInput
                    caseSensitive={false}
                    onChangeText={(term) => { this.searchUpdated(term) }}
                    style={styles.searchInput}
                    placeholder="Type a name to search"
                />
                <ScrollView>
                    {filteredFriends.map(friend => {
                        return (
                            <TouchableOpacity onPress={() => alert(friend.name)} key={friend.id} style={styles.emailItem}>
                                <View>
                                    <Text>{friend.name}</Text>

                                </View>
                            </TouchableOpacity>
                        )
                    })}
                </ScrollView>
            </View>
        )

    }
}
export default SearchName

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        justifyContent: 'flex-start'
    },
    emailItem: {
        borderBottomWidth: 0.5,
        borderColor: 'rgba(0,0,0,0.3)',
        padding: 10
    },
    emailSubject: {
        color: 'rgba(0,0,0,0.5)'
    },
    searchInput: {
        padding: 10,
        borderColor: '#CCC',
        borderWidth: 1
    }
});