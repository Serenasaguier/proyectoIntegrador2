import { Text, View, TouchableOpacity, Image, StyleSheet } from 'react-native'
import React, { Component } from 'react'
import * as ImagePicker from 'expo-image-picker'
import { storage } from '../firebase/config'

import { AntDesign } from '@expo/vector-icons'; 

export default class MiImagePicker extends Component {
    constructor(props){
        super(props)
        this.state = {
            imgDeFototeca: ''
        }
    }

    // busque imagen en la libreria
    activarPicker() {
        ImagePicker.launchImageLibraryAsync()
        .then(imgData => this.setState({imgDeFototeca: imgData.assets[0].uri}))
        .catch( err => console.log(err))
    }

    //acepte imagen que eligio
    aceptarImagen(){
        fetch(this.state.imgDeFototeca)
        .then(resp => resp.blob()) // con blob la parseamos
        .then(imagen => {
            let ref = storage.ref(`fotoDePerfil/${Date.now()}.jpeg`) // con ref le pegamos al storage
            ref.put(imagen)
            .then(()=> {
                ref.getDownloadURL()
                .then(url => this.props.actualizarFotoPerfil(url)) // nos retorna una url que se la tenemos que pasar al padre
            })
        })
        .catch( err => console.log(err))
    }

    //rechaze imagen que eligio
    rechazarImagen(){
        this.setState({imgDeFototeca: ''})
    }

  render() {
    return (
      <View style={styles.contenido}>
        {
            this.state.imgDeFototeca !== '' ?
                <>
                    <Image 
                    source={{uri: this.state.imgDeFototeca}} //uri pq va a ser una imagen que no esta en mi proyecto local
                    style={styles.img}
                    />
                    <TouchableOpacity
                    onPress={()=> this.aceptarImagen()}
                    >
                        <Text style={styles.descripcion}>Aceptar imagen</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                    onPress={()=> this.rechazarImagen()}
                    >
                        <Text style={styles.descripcion}>Rechazar imagen</Text>
                    </TouchableOpacity>
                </>
            :
            <>
                <Text style={styles.descripcion}>Carga a una foto para tu perfil</Text>
                <AntDesign name="picture" size={24} color="black" />
                <TouchableOpacity
                onPress={()=> this.activarPicker()}
                >
                    <Text style={styles.descripcion}>
                        Cargar imagen de mi libreria
                    </Text>
                </TouchableOpacity>
            </>
        }
      </View>
    )
  }
}

const styles = StyleSheet.create({
    img: {
        height: 300,
        width: 300,
        borderRadius: 5, 
        borderColor:'rgb(177,141,201)'
    },contenido: {
        marginVertical: 15,
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
      },descripcion:{
        padding: 10,
        fontSize: 18,
        margin: 10,
        backgroundColor: 'rgb(209,181,227)',
        borderColor: '#C2C2C3'
       }
})