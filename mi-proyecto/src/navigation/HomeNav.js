import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { AntDesign } from '@expo/vector-icons'; 
import Profile from '../screens/Profile'
import NewPost from '../screens/NewPost'
import StackNav from './StackNav';
import Feed from '../screens/Feed';
import Comment from '../screens/Comment';
import ProfileAmigo from '../screens/ProfileAmigo';


const Tab = createBottomTabNavigator()

export default function HomeNav() {


  return (
    <Tab.Navigator>
        <Tab.Screen name='Feed' component={Feed} options={{
        headerShown: false,
        tabBarIcon: () => <AntDesign name='home' size={24} color='violet' />
        }} />

        <Tab.Screen name='NewPost' component={NewPost} options={ 
          { headerShown:false, tabBarIcon: ()=> <AntDesign name="plus" size={24} color="red" /> }
        } />

        <Tab.Screen name='Profile' component={Profile} options={ 
          {headerShown:false, tabBarIcon: ()=> <AntDesign name="profile" size={24} color="orange" />}
        }  />
      

      
    </Tab.Navigator>
  )
}