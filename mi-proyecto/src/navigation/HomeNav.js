import { View, Text } from 'react-native'
import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import Home from '../screens/Home'
import Registro from '../screens/Registro'
import Login from '../components/Login'

const Tab = createBottomTabNavigator()

export default function HomeNav() {
  return (
    <Tab.Navigator>
        <Tab.Screen name='Home' component={Home} />
        <Tab.Screen name='Registro' component={Registro} />
        <Tab.Screen name='Login' component={Login} />
    </Tab.Navigator>
  )
}