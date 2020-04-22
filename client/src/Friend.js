import React, { Component, PropTypes } from 'react';
import {
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import defaultStyles from './styles';
import axios from 'axios';

// Get screen dimensions
const { width, height } = Dimensions.get('window');
// How many posters we want to have in each row and column
const cols = 3, rows = 4;

class Friend extends Component {
  constructor(props) {
    super(props);
    this.state = {

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
      })
    })
    .catch((error) => {
      console.log(error);
    })
  }

  render() {
    const { friend, friend: { friendusername, friendavatar, frienduserid, current, share }, onOpen } = this.props;
    return (
      <TouchableOpacity style={styles.container} onPress={() => onOpen(friend)}>
        <View style={styles.imageContainer}>
          <Image source={{ uri: friendavatar }} style={styles.image} />
        </View>
        <Text style={styles.friendusername} numberOfLines={1}>Friend: {friendusername}</Text>
        
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
});

export default Friend;
