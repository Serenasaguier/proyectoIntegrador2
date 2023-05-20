import { View, Text } from 'react-native'
import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import Home from '../screens/Home'
import Registro from '../screens/Registro'
import Login from '../screens/Login'
import { FontAwesome } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons'; 
import { MaterialIcons } from '@expo/vector-icons'; 
import Profile from '../screens/Profile'



const Tab = createBottomTabNavigator()

export default function HomeNav() {
  return (
    <Tab.Navigator>
        <Tab.Screen name='Home' component={Home} options={ 
          {tabBarIcon: ()=> <AntDesign name="home" size={24} color="black" />}
        } />
        <Tab.Screen name='Registro' component={Registro} options={ 
          {tabBarIcon: ()=> <MaterialIcons name="app-registration" size={24} color="black" />}
        }  />
        <Tab.Screen name='Login' component={Login} options={ 
          {tabBarIcon: ()=> <AntDesign name="login" size={24} color="black" />}
        } />

        <Tab.Screen name='Profile' component={Profile} options={ 
          {tabBarIcon: ()=> <AntDesign name="profile" size={24} color="black" />}
        }  />

    </Tab.Navigator>
  )
}