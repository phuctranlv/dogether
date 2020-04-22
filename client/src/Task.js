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

// Get screen dimensions
const { width, height } = Dimensions.get('window');
// How many posters we want to have in each row and column
const cols = 3, rows = 4;

class Task extends Component {
  constructor(props) {
    super(props);
    this.state = {

    }
  }
  render() {
    const { task, task: { title, picture, note, current, share }, onOpen } = this.props;
    return (
      <TouchableOpacity style={styles.container} onPress={() => onOpen(task)}>
        <View style={styles.imageContainer}>
          <Image source={{ uri: picture }} style={styles.image} />
        </View>
        <Text style={styles.title} numberOfLines={1}>Task: {title}</Text>
        <Text numberOfLines={1}>Note: {note}</Text>
        <Text>Current: {`${current}`}</Text>
        <Text>Share: {`${share}`}</Text>
        
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
  title: {
    ...defaultStyles.text,
    fontSize: 14,
    marginTop: 4,
  },
  note: {
    ...defaultStyles.text,
    color: '#BBBBBB',
    fontSize: 12,
    lineHeight: 14,
  },
});

export default Task;
