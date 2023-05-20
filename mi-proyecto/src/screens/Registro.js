import { Text, View, TouchableOpacity, Touchable } from 'react-native'
import React, { Component } from 'react'
import FormularioRegistro from '../components/FormularioRegistro'
import { auth } from '../firebase/config'

export default class Registro extends Component {
    constructor(props){
        super(props)
        this.state={
            
        }
    }

    componentDidMount(){
      auth.onAuthStateChanged(user => {
        if(user){
          this.props.navigation.navigate('HomeNav')
        }
      })
    }

  render() {
    return (
      <View>
        <FormularioRegistro navigation={this.props.navigation}/>
        <Text>
          Ya tenes cuenta?
          <TouchableOpacity onPress={()=> this.props.navigation.navigate('Login')}>
            <Text> Ir al Login</Text>
        </TouchableOpacity>
        </Text>
      </View>
    )
  }
}