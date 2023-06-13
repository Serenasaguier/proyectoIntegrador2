import React, { Component } from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Feed from '../screens/Feed';
import Comment from '../screens/Comment';

const Stack = createNativeStackNavigator()

 function StackNav () {
    return (
      <Stack.Navigator>
        <Stack.Screen name='Feed' component={Feed} />
        <Stack.Screen name='Comment' component={Comment}/>
      </Stack.Navigator>
    )
  }


export default StackNav
