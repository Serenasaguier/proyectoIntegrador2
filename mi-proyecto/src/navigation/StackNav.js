import React, { Component } from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Feed from '../screens/Feed';
import Comment from '../screens/Comment';

const Stack = createNativeStackNavigator()

export default class StackNav extends Component {
  render() {
    return (
      <Stack.Navigator>
        <Stack.Screen name='Feed' component={Feed} />
        <Stack.Screen name='Comment' component={Comment}/>
      </Stack.Navigator>
    )
  }
}
