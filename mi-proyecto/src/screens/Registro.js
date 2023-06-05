import { View } from 'react-native'
import React, { Component } from 'react'
import FormularioRegistro from '../components/FormularioRegistro'
import { auth } from '../firebase/config'

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
      </View>
    )
  }
}