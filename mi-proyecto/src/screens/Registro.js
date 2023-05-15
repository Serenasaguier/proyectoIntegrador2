import { Text, View, TouchableOpacity, Touchable } from 'react-native'
import React, { Component } from 'react'
import FormularioRegistro from '../components/FormularioRegistro'

export default class Registro extends Component {
    constructor(props){
        super(props)
        this.state={
            
        }
    }
  render() {
    return (
      <View>
        <FormularioRegistro navigation={this.props.navigation}/>
        <TouchableOpacity onPress={()=> this.props.navigation.navigate('HomeNav')}>
            <Text> No tenes cuenta? Vamos a Home</Text>
        </TouchableOpacity>
      </View>
    )
  }
}