import { Text, View, TouchableOpacity, Touchable } from 'react-native'
import React, { Component } from 'react'
import FormularioLogin from '../components/FormularioLogin'

export default class Login extends Component {
    constructor(props){
        super(props)
        this.state={
            
        }
    }
  render() {
    return (
      <View>
        <FormularioLogin navigation={this.props.navigation}/>
        
      </View>
    )
  }
}


