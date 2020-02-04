/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React, { useCallback, useState } from 'react'
import { Button, StyleSheet, Text, View } from 'react-native'
import { usePubNub } from 'pubnub-react'

export const Time = () => {
    const pubnub = usePubNub()
    const [isLoading, setLoadingState] = useState<boolean>(false)
    const [time, setTime] = useState<number | null>(null)
    const [error, setError] = useState<string | null>(null)

    const handlePress = useCallback(async () => {
        setLoadingState(true)
        try {
            const { timetoken } = await pubnub.time()

            setError(null)
            setTime(timetoken)
        } catch (error) {
            setTime(null)
            setError(error.message)
        } finally {
            setLoadingState(false)
        }
    }, [])

    let textComponent

    if (isLoading) {
        textComponent = (
            <Text style={[styles.viewItem, styles.loading]}>Loading...</Text>
        )
    } else if (error !== null) {
        textComponent = (
            <Text style={[styles.viewItem, styles.error]}>
                An error has occured: {error}
            </Text>
        )
    } else if (time) {
        textComponent = (
            <>
                <Text style={styles.viewItem}>
                    Current PubNub time is {time}
                </Text>
            </>
        )
    }

    return (
        <>
            <Button
                disabled={isLoading}
                title="get current pubnub time"
                onPress={handlePress}
            />
            {textComponent}
        </>
    )
}

const styles = StyleSheet.create({
    viewItem: {
        padding: 32
    },

    error: {
        color: 'red'
    },

    loading: {
        color: 'rgb(200, 200, 200)'
    }
})
