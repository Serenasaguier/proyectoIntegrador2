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
      <View style={styles.btn}>
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
    color: 'rgb(0,0,0)',
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: 'rgb(0,0,0)',
    backgroundColor: 'rgb(255,255,255)',
    padding: 10,
    margin: 10
}
})

export default FormPost