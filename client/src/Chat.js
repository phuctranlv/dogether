import React, {useState, useEffect} from 'react';
import {Text} from 'react-native';
import moment from 'moment';

const Chat = ({message}) => {
  return (
    <>
      <Text>{message.chatter ? message.username2 : message.username1} ({moment(message.time).format("dddd, MMMM Do YYYY, h:mm:ss a")}): </Text>
      <Text>{message.message}</Text>
      <Text> </Text>
    </>
  )
};

export default Chat;
