import { StyleSheet, Text, View,TouchableOpacity } from 'react-native';
import Registro from './src/screens/Registro';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeNav from './src/navigation/HomeNav';
import Login from './src/screens/Login';
import Home from './src/screens/Home'
import Comment from './src/screens/Comment';
import ProfileAmigo from './src/screens/ProfileAmigo';
import MasInfoUser from './src/screens/MasInfoUser';
import EditProfile from './src/screens/EditProfile';

const Stack = createNativeStackNavigator()

export default function App() { 
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name='Registro' component={Registro} options ={
          { headerShown:false} }/>
        <Stack.Screen name='HomeNav' component={HomeNav} options={{headerShown:false}}/>
        <Stack.Screen name='Login' component={Login} options={{headerShown:false}} />
        <Stack.Screen name='ProfileAmigo' component={ProfileAmigo} options={{headerShown:false}} />
        <Stack.Screen name='Comment' component={Comment} options={{headerShown:false}} />
        <Stack.Screen name='MasInfoUser' component={MasInfoUser} options={{headerShown:false}} />
        <Stack.Screen name='EditProfile' component={EditProfile} options={{headerShown:false}} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  img:{
    width: 200,
    height: 200
  }
});