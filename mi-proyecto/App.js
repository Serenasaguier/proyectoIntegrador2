import { StyleSheet, Text, View,TouchableOpacity } from 'react-native';
import Registro from './src/screens/Registro';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeNav from './src/navigation/HomeNav';
import Login from './src/screens/Login';
import Home from './src/screens/Home'

const Stack = createNativeStackNavigator()

export default function App() { 
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name='Home' component={Home} options={{headerShown:false}} />
        <Stack.Screen name='Registro' component={Registro} options={{headerShown:false}}/>
        <Stack.Screen name='HomeNav' component={HomeNav} options={{headerShown:false}}/>
        <Stack.Screen name='Login' component={Login} options={{headerShown:false}} />
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