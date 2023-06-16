import { Text, View, TouchableOpacity } from 'react-native'
import React, { Component } from 'react'
import MiImagePicker from '../components/MiImagePicker'
import { db } from '../firebase/config'
export default class InfoAdicionalUser extends Component {
  constructor(props){
    super(props)
    this.state ={
        fotoDePerfil:''
    }
  }

  actualizarFotoDePerfil(url){
    this.setState({fotoDePerfil: url})
  }

  actualizarDocDelUsuario(){
    console.log(this.props.route.params.docId)
    db
    .collection('users')
    .doc(this.props.route.params.docId)
    .update({
        fotoPerfil: this.state.fotoDePerfil
    })
    .then(resp => {
        this.props.navigation.navigate('HomeNav')
    })
  }
  
  
    render() {
    return (
      <View>
        <Text>Aqui vamos a cargar la informacion adicional</Text>
        <MiImagePicker actualizarFotoPerfil={(url)=> this.actualizarFotoDePerfil(url)} />
        {
            this.state.fotoDePerfil !== '' ?
        <TouchableOpacity
        onPress={()=> this.actualizarDocDelUsuario()}
        >
            <Text>
                Añadir foto de perfil
            </Text>
        </TouchableOpacity>
        : null
        }
        <TouchableOpacity>
            <Text>
                Omitir este paso
            </Text>
        </TouchableOpacity>
      </View>
    )
  }
}