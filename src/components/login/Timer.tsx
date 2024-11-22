import React, { useState, useEffect } from 'react';
import { Text } from 'react-native';

const OneMinuteTimer = ({ onTimeUp }) => {
  const [seconds, setSeconds] = useState(60);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setSeconds(prevSeconds => {
        if (prevSeconds === 1) {
          clearInterval(intervalId);
          onTimeUp();
          return 0;
        }
        return prevSeconds - 1;
      });
    }, 1000);

    return () => clearInterval(intervalId);
  }, [onTimeUp]);

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  return (
    <Text style={{color: 'grey', fontSize: 15, padding: 5, fontWeight: 500}}>{`0${formatTime(seconds)}`}</Text>
  );
};

export default OneMinuteTimer;
