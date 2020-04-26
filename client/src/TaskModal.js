import React, { Component, useState, useEffect } from 'react';
import {
  Animated,
  Dimensions,
  Image,
  LayoutAnimation,
  PanResponder,
  StyleSheet,
  Text,
  TouchableHighlight,
  TouchableWithoutFeedback,
  View,
  Modal
} from 'react-native';
import defaultStyles from './styles';
import Options from './Options';
import axios from 'axios';

// Get screen dimensions
const { width, height } = Dimensions.get('window');
// Set default popup height to 67% of screen height
const defaultHeight = height * 0.67;

export const TaskModal = (props) => {
  const [task, setTask] = useState(props.task)
  const [position, setPosition] = useState(new Animated.Value(props.isOpen ? 0 : height));
  const [opacity, setOpacity] = useState(new Animated.Value(0));
  const [height, setHeight] = useState(defaultHeight);
  const [expanded, setExpanded] = useState(false);
  const [visible, setVisible] = useState(props.isOpen);
  const [modalVisible, setModalVisible] = useState(false);
  const [chosenCurrent, setChosenCurrent] = useState(task.current);
  const [chosenShare, setChosenShare] = useState(task.share);

  useEffect(() => {
    setChosenCurrent(task.current);
    setChosenShare(task.share);
  }, [task])


  // When user starts pulling popup previous height gets stored here
  // to help us calculate new height value during and after pulling
  _previousHeight = 0

  useEffect(() => {
    // Initialize PanResponder to handle move gestures
    this._panResponder = PanResponder.create({
      onStartShouldSetPanResponder: (evt, gestureState) => true,
      onMoveShouldSetPanResponder: (evt, gestureState) => {
        const { dx, dy } = gestureState;
        // Ignore taps
        if (dx !== 0 && dy === 0) {
          return true;
        }
        return false;
      },
      onPanResponderGrant: (evt, gestureState) => {
        // Store previous height before user changed it
        this._previousHeight = height;
      },
      onPanResponderMove: (evt, gestureState) => {
        // Pull delta and velocity values for y axis from gestureState
        const { dy, vy } = gestureState;
        // Subtract delta y from previous height to get new height
        let newHeight = this._previousHeight - dy;

        // Animate heigh change so it looks smooth
        LayoutAnimation.easeInEaseOut();

        // Switch to expanded mode if popup pulled up above 80% mark
        if (newHeight > height - height / 5) {
          setExpanded(true);
        } else {
          setExpanded(true);
        }

        // Expand to full height if pulled up rapidly
        if (vy < -0.75) {
          setExpanded(true);
          setHeight(height);
        }

        // Close if pulled down rapidly
        else if (vy > 0.75) {
          props.onClose();
        }
        // Close if pulled below 75% mark of default height
        else if (newHeight < defaultHeight * 0.75) {
          props.onClose();
        }
        // Limit max height to screen height
        else if (newHeight > height) {
          setHeight(height);
        }
        else {
          setHeight(newHeight);
        }
      },
      onPanResponderTerminationRequest: (evt, gestureState) => true,
      onPanResponderRelease: (evt, gestureState) => {
        const { dy } = gestureState;
        const newHeight = this._previousHeight - dy;

        // Close if pulled below default height
        if (newHeight < defaultHeight) {
          props.onClose();
        }

        // Update previous height
        this._previousHeight = height;
      },
      onShouldBlockNativeResponder: (evt, gestureState) => {
        // Returns whether this component should block native components from becoming the JS
        // responder. Returns true by default. Is currently only supported on android.
        return true;
      },
    });
  }, [props.isOpen]);

  // Handle isOpen changes to either open or close popup
  useEffect(() => {
    if (props.isOpen) {
      setVisible(true);
      animateOpen();
      setTask(props.task);
    } else if (!props.isOpen) {
      animateClose();
    }
  }, [props.isOpen])
  // UNSAFE_componentWillReceiveProps = (nextProps) => {
  //   // isOpen prop changed to true from false
  //   if (!props.isOpen && nextProps.isOpen) {
  //     this.animateOpen();
  //   }
  //   // isOpen prop changed to false from true
  //   else if (props.isOpen && !nextProps.isOpen) {
  //     this.animateClose();
  //   }
  // }

  // Open popup

  // Update state first

  animateOpen = () => {
    Animated.parallel([
      // Animate opacity
      Animated.timing(
        opacity, { toValue: 0.5, useNativeDriver: true } // semi-transparent
      ),
      // And slide up
      Animated.timing(
        position, { toValue: 0, useNativeDriver: true } // top of the screen
      ),
    ]).start();
  }

  // useEffect(animateOpen, [visible]);

  // Close popup
  animateClose = () => {
    Animated.parallel([
      // Animate opacity
      Animated.timing(
        opacity, { toValue: 0, useNativeDriver: true } // transparent
      ),
      // Slide down
      Animated.timing(
        position, { toValue: height, useNativeDriver: true } // bottom of the screen
      ),
    ]).start(() => {
      // Reset to default values
      setHeight(defaultHeight);
      setExpanded(false);
      setVisible(false);
    });
  }

  // Dynamic styles that depend on state
  getStyles = () => {
    return {
      imageContainer: expanded ? {
        width: width / 2,         // half of screen widtj
      } : {
          maxWidth: 110,            // limit width
          marginRight: 10,
        },
      movieContainer: expanded ? {
        flexDirection: 'column',  // arrange image and task info in a column
        alignItems: 'center',     // and center them
      } : {
          flexDirection: 'row',     // arrange image and task info in a row
        },
      movieInfo: expanded ? {
        flex: 0,
        alignItems: 'center',     // center horizontally
        paddingTop: 20,
      } : {
          flex: 1,
          justifyContent: 'center', // center vertically
        },
      title: expanded ? {
        textAlign: 'center',
      } : {},
    };
  }

  onChosenCurrent = () => {
    axios.put('http://localhost:3000/plans/tasks', {
      params: {
        title: task.title,
        note: task.note,
        current: !chosenCurrent,
        share: task.share,
        userId: task.userid,
        taskId: task.taskid
      }
    })
      .then((result) => {
        setChosenCurrent(!chosenCurrent);
      })
      .catch((error) => {
        console.log(error);
      })
  }

  onChosenShare = () => {
    axios.put('http://localhost:3000/plans/tasks', {
      params: {
        title: task.title,
        note: task.note,
        current: task.current,
        share: !chosenShare,
        userId: task.userid,
        taskId: task.taskid
      }
    })
      .then((result) => {
        setChosenShare(!chosenShare)
      })
      .catch((error) => {
        console.log(error);
      })
  }

  // Pull out task data
  const { title, note, picture, current, share } = task || {};
  // Render nothing if not visible
  if (!visible) {
    return null;
  }
  return (
    <View style={styles.container}>
      {/* Closes popup if user taps on semi-transparent backdrop */}
      <TouchableWithoutFeedback onPress={props.onClose}>
        <Animated.View style={[styles.backdrop, { opacity: opacity }]} />
      </TouchableWithoutFeedback>
      <Animated.View
        style={[styles.modal, {
          // Animates height
          height: height,
          // Animates position on the screen
          transform: [{ translateY: position }, { translateX: 0 }]
        }]}
      >

        {/* Content */}
        <View style={styles.content}>
          {/* Movie picture, title and note */}
          <View
            style={[styles.movieContainer, this.getStyles().movieContainer]}
            {...this._panResponder.panHandlers}
          >
            {/* Poster */}
            <View style={[styles.imageContainer, this.getStyles().imageContainer]}>
              <Image source={{ uri: picture }} style={styles.image} />
            </View>
            {/* Title and note */}
            <View style={[styles.movieInfo, this.getStyles().movieInfo]}>
              <Text style={[styles.title, this.getStyles().title]}>Task: {title}</Text>
              <Text style={styles.note}>Note: {note}</Text>
            </View>
          </View>

          {/* Showtimes */}
          <View>
            {/* Day */}
            <Text style={styles.sectionHeader}>Set current status</Text>
            {/* TODO: Add day options here */}
            <Options
              values={`current`}
              chosen={chosenCurrent}
              onChosen={onChosenCurrent}
            />
            {/* Time */}
            <Text style={styles.sectionHeader}>Set share status</Text>
            {/* TODO: Add show time options here */}
            <Options
              values={`share`}
              chosen={chosenShare}
              onChosen={onChosenShare}
            />
          </View>

        </View>

        {/* Footer */}
        <View style={styles.footer}>
          <TouchableHighlight
            underlayColor="#9575CD"
            style={styles.buttonContainer}
            onPress={() => {
              if (!chosenCurrent || !chosenShare) {
                alert('Current status and share status are required for collaboration');
              } else {
                setModalVisible(!modalVisible);
              }
            }}
          >
            <Text style={styles.button}>Send collaboration request</Text>
          </TouchableHighlight>


          <View style={styles.centeredView}>
            <Modal
              animationType="slide"
              transparent={true}
              visible={modalVisible}
              onRequestClose={() => {
                Alert.alert("Modal has been closed.");
              }}
            >
              <View style={styles.centeredView}>
                <View style={styles.modalView}>
                  <View>
                    <Text style={styles.modalText}>Your request has been sent. Happy dogether!</Text>
                  </View>

                  <TouchableHighlight
                    style={{ ...styles.openButton, backgroundColor: "#2196F3" }}
                    onPress={() => {
                      setModalVisible(!modalVisible);
                    }}
                  >
                    <Text style={styles.textStyle}>Close</Text>
                  </TouchableHighlight>
                </View>
              </View>
            </Modal>
          </View>
        </View>

        <View style={styles.footer}>
          <TouchableHighlight
            underlayColor="#9575CD"
            style={styles.buttonContainer}
          >
            <Text style={styles.button}>Hello</Text>
          </TouchableHighlight>
        </View>

      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  // Main container
  container: {
    ...StyleSheet.absoluteFillObject,   // fill up all screen
    justifyContent: 'flex-end',         // align popup at the bottom
    backgroundColor: 'transparent',     // transparent background
  },
  // Semi-transparent background below popup
  backdrop: {
    ...StyleSheet.absoluteFillObject,   // fill up all screen
    backgroundColor: 'black',
  },
  // Popup
  modal: {
    backgroundColor: 'white',
  },
  content: {
    flex: 1,
    margin: 20,
    marginBottom: 0,
  },
  // Movie container
  movieContainer: {
    flex: 1,                            // take up all available space
    marginBottom: 20,
  },
  imageContainer: {
    flex: 1,                            // take up all available space
  },
  image: {
    borderRadius: 10,                   // rounded corners
    ...StyleSheet.absoluteFillObject,   // fill up all space in a container
  },
  movieInfo: {
    backgroundColor: 'transparent',     // looks nicier when switching to/from expanded mode
  },
  title: {
    ...defaultStyles.text,
    fontSize: 20,
  },
  genre: {
    ...defaultStyles.text,
    color: '#BBBBBB',
    fontSize: 14,
  },
  sectionHeader: {
    ...defaultStyles.text,
    color: '#AAAAAA',
  },
  // Footer
  footer: {
    padding: 20,
  },
  buttonContainer: {
    backgroundColor: '#673AB7',
    borderRadius: 100,
    paddingVertical: 10,
    paddingHorizontal: 15,
    alignItems: 'center',
  },
  button: {
    ...defaultStyles.text,
    color: '#FFFFFF',
    fontSize: 18,
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