/* eslint-disable react/jsx-filename-extension */
import React, { Component } from 'react';
import {
  ScrollView,
  Text,
  View,
  Button
} from 'react-native';

class ProfileScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {

    }
  }

  render() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Profile</Text>
      </View>
    );
  }
}


export default ProfileScreen;
