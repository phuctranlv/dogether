/* eslint-disable react/jsx-filename-extension */
/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react';
import { ScrollView, Text, View, Button, StyleSheet } from 'react-native';
import axios from 'axios';
import Friend from './Friend';
import ChatModal from './ChatModal';

class SocialScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      friends: undefined,
      popupIsOpen: false,
      friend: 'a friend',
      conversations: undefined,
      conversation: 'a conversation'
    };
    this.openConversation = this.openConversation.bind(this);
    this.closeConversation = this.closeConversation.bind(this);
    this.chooseCurrent = this.chooseCurrent.bind(this);
    this.chooseShare = this.chooseShare.bind(this);
  }

  componentDidMount() {
    axios.get('http:localhost:3000/social/friends', {
      params: {
        userId: '7bc36916-ea7b-4d2e-8903-4a77e94d0d1b'
      }
    }).then((result) => {
      this.setState({
        friends: result.data
      })
    })
  }

  openConversation(friend, conversation) {
    // console.log(conversation);
    this.setState({
      friend, friend,
      popupIsOpen: true,
      conversation: conversation
    });
  }

  closeConversation() {
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

  render() {
    if (this.state.friends === undefined) {
      console.log('hello world!')
      return (<></>)
    } else {
      return (
        <>
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
                  userId={friend.userid}
                  friend={friend}
                  onOpen={this.openConversation}
                  key={index}
                />
              )
            })}
          </ScrollView>
          
        </View>
        <ChatModal
        friend={this.state.friend}
        conversation={this.state.conversation}
        isOpen={this.state.popupIsOpen}
        onClose={this.closeConversation}
        chosenCurrent={this.state.chosenCurrent}
        chosenShare={this.state.chosenShare}
        onChooseCurrent={this.chooseCurrent}
        onChooseShare={this.chooseShare}
      />
      </>
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
