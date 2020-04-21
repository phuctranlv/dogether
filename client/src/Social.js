/* eslint-disable react/jsx-filename-extension */
import React, { Component } from 'react';
import {
  ScrollView,
  Text,
  View,
  Button
} from 'react-native';

class SocialScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {

    }
  }

  render() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Social</Text>
        <Button title="Go to Planning" onPress={() => this.props.navigation.navigate('Planning')} />
      </View>
    );
  }
}


export default SocialScreen;
