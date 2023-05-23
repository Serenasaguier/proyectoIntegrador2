import { Text, TextInput, View, StyleSheet } from 'react-native'
import React, { Component } from 'react'

 class FormPost extends Component {
    constructor(props){
        super(props)
        this.state={
            
        }
    }


  render() {
    return (
      <View>
        <TextInput
        style={styles.input}
        keyboardType='default'
        value={this.props.stateDescripcion}
        placeholder='Ingresa la descripcion'
        onChangeText={(text)=> this.props.actualizar(text) }
        multiline={true}
        rows={5}
        >
            </TextInput>
      </View>
    )
  }
}


const styles= StyleSheet.create({
    input:{
        borderWidth:1,
        borderColor: 'red',
        padding:10
    }
})

export default FormPost