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
      <View style={styles.conteiner}>
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
        borderWidth: 1,
        backgroundColor: 'white',
        borderWidth: 1,
        borderColor: 'black',
        borderRadius: 8,
        padding: 20,
        fontSize: 16,
        marginVertical: 15
},
conteiner:{
        flex: 1,
        backgroundColor: 'white',
        color: 'rgb(255,255,255)',
        padding: 15,
        justifyContent: 'center'
}
})

export default FormPost