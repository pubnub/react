import React from 'react';
import { usePubNub } from '../../src/index';

const PubNubTime = () => {
  const PubNubClient = usePubNub();

  return (
    <div>
      {PubNubClient.time((status, response): void => {
        if (status.error) console.log('error', status);
        else console.log('response', response.timetoken);
      })}
    </div>
  );
};

export default PubNubTime;
