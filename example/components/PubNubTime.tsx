import React, { useState, useEffect } from 'react';
import { usePubNub } from '../../src/index';

const PubNubTime = () => {
  const pubnub = usePubNub();
  const [time, setTime] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    pubnub
      .time()
      .then(({ timetoken }) => {
        setTime(timetoken);
      })
      .catch(error => {
        setError(error.message);
      });
  }, []);

  if (error !== null) {
    return <div>An error has occured: {error}</div>;
  }

  if (time === null) {
    return <div>Loading...</div>;
  }

  return <div>{time}</div>;
};

export default PubNubTime;
