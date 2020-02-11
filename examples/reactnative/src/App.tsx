/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

import { Time } from './Time'

export const App = () => {
    return (
        <View style={styles.mainView}>
            <Text style={styles.viewItem}>Welcome to PubNub!</Text>
            <Time />
        </View>
    )
}

const styles = StyleSheet.create({
    mainView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },

    viewItem: {
        padding: 32
    }
})
