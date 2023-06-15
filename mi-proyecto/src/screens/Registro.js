import { View, StyleSheet } from 'react-native'
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
        <FormularioRegistro style={style.back} navigation={this.props.navigation}/>
      </View>
    )
  }
}

const style = StyleSheet.create({
  back: {
    backgroundColor:'rgb(255,87,51)'
  }
})