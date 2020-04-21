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
const cols = 3, rows = 3;

class Task extends Component {
  constructor(props) {
    super(props);
    this.state = {

    }
  }
  render() {
    const { task: { task, note, current, share }, onOpen } = this.props;
    console.log('================================================================task in Task.js is:', note)
    return (
      <TouchableOpacity style={styles.container} onPress={() => onOpen(task)}>
        <View style={styles.imageContainer}>
          <Image source={{ uri: 'https://s3.amazonaws.com/uifaces/faces/twitter/j04ntoh/128.jpg', share }} style={styles.image} />
        </View>
        <Text style={styles.task} numberOfLines={1}>{task}</Text>
        <Text style={styles.note} numberOfLines={1}>{note}</Text>
        
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
  task: {
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
