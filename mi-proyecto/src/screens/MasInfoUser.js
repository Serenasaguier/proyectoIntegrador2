import { Text, View, TouchableOpacity, StyleSheet } from 'react-native'
import React, { Component } from 'react'
import MiImagePicker from '../components/MiImagePicker'
import { db } from '../firebase/config'
import { AntDesign } from '@expo/vector-icons'; 


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
      <View style={styles.cardContainer}>
        <MiImagePicker actualizarFotoPerfil={(url)=> this.actualizarFotoDePerfil(url)} />
        {
            this.state.fotoDePerfil !== '' ?
        <TouchableOpacity
        onPress={()=> this.actualizarDocDelUsuario()}
        >
            <Text style={styles.descripcion}>
                Añadir foto de perfil
            </Text>
            <AntDesign name="picture" size={30} color="black" />
        </TouchableOpacity>
        : null
        }
        <TouchableOpacity onPress={()=> this.props.navigation.navigate('Feed')}>
            <Text style={styles.descripcion}>
                Omitir este paso
            </Text>
        </TouchableOpacity>
      </View>
    )
  }
}

const styles= StyleSheet.create({
  
  contenido: {
    marginVertical: 15,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
    cardContainer: {
      margin: 7,
      padding: 50,
      borderWidth: 3,
      borderRadius: 5,
      borderColor: 'rgb(177,141,201)',
      backgroundColor: 'rgb(165,103,205)'
   },
   descripcion:{
    padding: 10,
    fontSize: 18,
    margin: 10,
    backgroundColor: 'rgb(209,181,227)',
    borderColor: '#C2C2C3'
   }

})