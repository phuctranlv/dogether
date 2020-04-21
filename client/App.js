/* eslint-disable react/prefer-stateless-function */
/* eslint-disable react/jsx-filename-extension */
import 'react-native-gesture-handler';
import React, { Component } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import PlanningScreen from './src/Planning';
import CollaborationRequestScreen from './src/CollaborationRequest';
import SocialScreen from './src/Social';
import ProfileScreen from './src/Profile';

const Tab = createBottomTabNavigator();

class App extends Component {
  render() {
    return (
      <NavigationContainer>
        <Tab.Navigator>
          <Tab.Screen name="Planning" component={PlanningScreen} />
          <Tab.Screen name="Collaboration Request" component={CollaborationRequestScreen} />
          <Tab.Screen name="Social" component={SocialScreen} />
          <Tab.Screen name="Profile" component={ProfileScreen} />
        </Tab.Navigator>
      </NavigationContainer>
    );
  }
}

export default App;
