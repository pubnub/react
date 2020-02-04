import React from 'react'
import { App } from './src/App'

import PubNub from 'pubnub'
import { PubNubProvider } from 'pubnub-react'

const pubnub = new PubNub({
    subscribeKey: 'demo',
    publishKey: 'demo'
})

export const Application = () => (
    <PubNubProvider client={pubnub}>
        <App />
    </PubNubProvider>
)
