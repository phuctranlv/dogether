import React, { Component } from 'react';
import {
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Button,
  Aleart,
  Modal,
  TouchableHighlight
} from 'react-native';
import defaultStyles from './styles';
import axios from 'axios';
import moment from 'moment';

// Get screen dimensions
const { width, height } = Dimensions.get('window');
// How many posters we want to have in each row and column
const cols = 3, rows = 4;

class Friend extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalVisible: false,
      chats: []
    }
  }

  componentDidMount() {
    // console.log('this.props.freinduserid:', this.props.friend.frienduserid)
    axios.get('http:localhost:3000/plans/tasks', {
      params: {
        userId: this.props.friend.frienduserid
      }
    })
      .then((result) => {
        this.setState({
          friendTask: result.data[0].title,
          friendTaskCurrent: result.data[0].current,
          friendTaskShare: result.data[0].share
        });
        axios.get('http:localhost:3000/social/conversations', {
          params: {
            userId1: this.props.userId,
            userId2: this.props.friend.frienduserid
          }
        })
          .then((result) => {
            this.setState({
              chats: result.data
            })
          })
          .catch((error) => {
            console.log('There\'s an error getting the conversations:', error);
          })
      })
      .catch((error) => {
        console.log(error);
      })
  }

  render() {
    const { friend, friend: { friendusername, friendavatar, frienduserid, current, share }, onOpen } = this.props;
    const chats = JSON.parse(JSON.stringify(this.state.chats));
    return (
      <TouchableOpacity style={styles.container} onPress={() => {
        onOpen(friend, chats)
      }}>
        <View style={styles.imageContainer}>
          <Image source={{ uri: friendavatar }} style={styles.image} />
        </View>
        <Text style={styles.friendusername} numberOfLines={1}>{friendusername}</Text>

        <Text numberOfLines={1}>Task: {this.state.friendTask ? this.state.friendTask : 'current task'}</Text>
        <Text>Current: {`${this.state.friendTaskCurrent}`}</Text>
        <Text>Share: {`${this.state.friendTaskShare}`}</Text>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    marginLeft: 10,
    marginBottom: 10,
    height: (height - 20 - 20) / rows - 10,
    width: (width - 10) / cols - 10,
  },
  imageContainer: {
    flex: 1,                          // take up all available space
  },
  image: {
    borderRadius: 10,                 // rounded corners
    ...StyleSheet.absoluteFillObject, // fill up all space in a container
  },
  friendusername: {
    ...defaultStyles.text,
    fontSize: 14,
    marginTop: 4,
  },
  frienduserid: {
    ...defaultStyles.text,
    color: '#BBBBBB',
    fontSize: 12,
    lineHeight: 14,
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5
  },
  openButton: {
    backgroundColor: "#F194FF",
    borderRadius: 20,
    padding: 10,
    elevation: 2
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center"
  }
});

export default Friend;
