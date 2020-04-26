/* eslint-disable react/jsx-filename-extension */
/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react';
import { ScrollView, Text, View, Button, StyleSheet } from 'react-native';
import axios from 'axios';
import Task from './Task';
import TaskModal from './TaskModal';

class PlanningScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tasks: undefined,
      popupIsOpen: false,
      task: 'a task'
    };
    this.openTask = this.openTask.bind(this);
    this.closeTask = this.closeTask.bind(this);
  }

  componentDidMount() {
    axios.get('http:localhost:3000/plans/tasks', {
      params: {
        userId: '7bc36916-ea7b-4d2e-8903-4a77e94d0d1b'
      }
    }).then((result) => {
      this.setState({
        tasks: result.data
      })
    })
  }

  openTask(task) {
    this.setState({
      popupIsOpen: true,
      task: task
    });
  }

  closeTask() {
    this.setState({
      popupIsOpen: false,
    });
  }
  render() {
    if (this.state.tasks === undefined) {
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
            title="Add a task"
            onPress={() => this.props.navigation.navigate('Social')}
          />
          <ScrollView
            contentContainerStyle={styles.scrollContent}
            // Hide all scroll indicators
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}
          >
            {this.state.tasks.map((task, index) => {
              return (
                <Task
                  task={task}
                  onOpen={this.openTask}
                  key={index}
                />
              )
            })}
          </ScrollView>
          <TaskModal
            task={this.state.task}
            isOpen={this.state.popupIsOpen}
            onClose={this.closeTask}
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


export default PlanningScreen;
