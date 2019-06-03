import React, { Component } from 'react';
import { View, Text, FlatList, ActivityIndicator } from 'react-native';
import { ListItem, SearchBar } from 'react-native-elements';


class SearchName extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            loading: false,
            data: [],
            error: null,
        };
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

        const newData = this.props.friends.filter(item => {
            const itemData = `${item.rating.toUpperCase()} ${item.name.toUpperCase()} `;
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
        if (this.state.loading) {
            return (
                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                    <ActivityIndicator />
                </View>
            );
        }
        return (
            <View style={{ flex: 1 }}>
                <FlatList
                    data={this.state.data}
                    renderItem={({ item }) => (
                        <ListItem
                            leftAvatar={{ source: { uri: item.picture } }}

                            // <Button
                            //     onPress={() => this.props.addPreConfirmed(friend)}
                            //     title='Pre'
                            //     accessibilityLabel="Pre-Confirm" />
                            // <Button
                            //     onPress={() => this.props.addInvites(friend)}
                            //     title='Invite'
                            //     accessibilityLabel="Invite" />
                            onPress={() => this.props.addInvites(item)}
                            title={`${item.name}`}
                            subtitle={item.rating}


                        />


                    )}


                    keyExtractor={item => item.id}
                    ItemSeparatorComponent={this.renderSeparator}
                    ListHeaderComponent={this.renderHeader}
                />
            </View>
        );
    }
}

export default SearchName

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         marginTop: 50,
//         justifyContent: 'center',
//         alignItems: 'center',
//         backgroundColor: '#F5FCFF',
//     },
//     h2text: {
//         marginTop: 10,
//         fontFamily: 'Helvetica',
//         fontSize: 36,
//         fontWeight: 'bold',
//     },
//     flatview: {
//         justifyContent: 'center',
//         paddingTop: 30,
//         borderRadius: 2,
//     },
//     name: {
//         fontFamily: 'Verdana',
//         fontSize: 18
//     },
//     rating: {
//         color: 'red'
//     }

// });