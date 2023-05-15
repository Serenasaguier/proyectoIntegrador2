import React, { Component } from 'react'
import { View, Text, TouchableOpacity, ActivityIndicator, StyleSheet, Image, FlatList } from 'react-native'
import Card from '../components/Card'

class Home extends Component{
  constructor(props){
      super(props)
  }


  render(){
      return(
          <View>
              <TouchableOpacity onPress={()=> this.props.navigation.navigate('Register')}>
                  <Text> Volver al registro</Text>
              </TouchableOpacity>
           </View>
      )
  }
}

const styles = StyleSheet.create({
  button:{
      backgroundColor: 'green',
      borderRadius: 20,
      borderWidth:2,
      textAlign:'center',
      padding:10
  },
  textoBtn:{
      color:'white'
  },
  img: {
      height:350
  }
 
})

export default Home