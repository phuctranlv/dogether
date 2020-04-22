/* eslint-disable react/jsx-filename-extension */
/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react';
import { ScrollView, Text, View, Button, StyleSheet } from 'react-native';
import axios from 'axios';
import Friend from './Friend';
import FriendModal from './FriendModal';
import CollaborationRequestScreen from './CollaborationRequest';

class SocialScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      friends: undefined,
      popupIsOpen: false,
      friend: 'a friend'
    };
    this.openFriend = this.openFriend.bind(this);
    this.closeFriend = this.closeFriend.bind(this);
    this.chooseCurrent = this.chooseCurrent.bind(this);
    this.chooseShare = this.chooseShare.bind(this);
    this.sendCollaborationRequest = this.sendCollaborationRequest.bind(this);
  }

  componentDidMount() {
    axios.get('http:localhost:3000/social/friends', {
      params: {
        userId: '19cd359e-b407-4747-8ce7-442a6e6085db'
      }
    }).then((result) => {
      this.setState({
        friends: result.data
      })
    })
  }

  openFriend(friend) {
    this.setState({
      popupIsOpen: true,
      friend: friend
    });
  }

  closeFriend() {
    this.setState({
      popupIsOpen: false,
      chosenCurrent: 0,
      chosenShare: null
    });
  }

  chooseCurrent(current) {
    this.setState({
      chosenCurrent: current,
    });
  }

  chooseShare(share) {
    this.setState({
      chosenShare: share,
    });
  }

  sendCollaborationRequest() {
    // Close popup
    this.closeFriend();
    // Navigate away to Confirmation route
    this.props.navigation.navigate('Collaboration Request')
  }

  render() {
    if (this.state.friends === undefined) {
      console.log('hello world!')
      return (<></>)
    } else {
      return (
        <View style={styles.container}>
          <Button
            title="Do! Dogether!"
            onPress={() => this.props.navigation.navigate('Social')}
          />
          <Button
            title="Friend's list:"
            onPress={() => this.props.navigation.navigate('Social')}
          />
          <ScrollView
            contentContainerStyle={styles.scrollContent}
            // Hide all scroll indicators
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}
          >
            {this.state.friends.map((friend, index) => {
              return (
                <Friend
                  friend={friend}
                  onOpen={this.openFriend}
                  key={index}
                />
              )
            })}
          </ScrollView>
          <FriendModal
            friend={this.state.friend}
            isOpen={this.state.popupIsOpen}
            onClose={this.closeFriend}
            chosenCurrent={this.state.chosenCurrent}
            chosenShare={this.state.chosenShare}
            onChooseCurrent={this.chooseCurrent}
            onChooseShare={this.chooseShare}
            onClickingSendCollaborationRequest={this.sendCollaborationRequest}
          />
        </View>
      );
    }
  }
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 20,         // start below status bar
  },
  scrollContent: {
    flexDirection: 'row',   // arrange posters in rows
    flexWrap: 'wrap',       // allow multiple rows
  },
});


export default SocialScreen;
