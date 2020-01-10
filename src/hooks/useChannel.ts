import { useCallback, useEffect } from 'react';
import PubNub from 'pubnub';

import { usePubNub } from './usePubNub';

type ChannelIdentifiers = string[];
type ChannelHandler = (message: PubNub.MessageEvent) => void;

export function useChannel(
  channels: ChannelIdentifiers,
  handler: ChannelHandler
) {
  const pubnub = usePubNub();

  const publish = useCallback(
    (channel: string, options: Omit<PubNub.PublishParameters, 'channel'>) => {
      pubnub.publish({
        channel,
        ...options,
      });
    },
    [pubnub]
  );

  const unsubscribe = useCallback(
    (channels: string[]) => {
      pubnub.unsubscribe({
        channels: channels,
      });
    },
    [pubnub]
  );

  useEffect(() => {
    const handleMessage = (message: PubNub.MessageEvent) => {
      if (channels.includes(message.channel)) {
        handler(message);
      }
    };

    pubnub.addListener({
      message: handleMessage,
    });

    pubnub.subscribe({
      channels: channels,
    });

    return () => {
      pubnub.unsubscribe({
        channels: channels,
      });

      pubnub.removeListener({
        message: handleMessage,
      });
    };
  }, []);

  return { publish, unsubscribe };
}
