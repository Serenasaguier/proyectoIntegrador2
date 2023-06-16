import { Text, View, TouchableOpacity, Image, StyleSheet } from 'react-native'
import React, { Component } from 'react'
import * as ImagePicker from 'expo-image-picker'
import { storage } from '../firebase/config'

export default class MiImagePicker extends Component {
    constructor(props){
        super(props)
        this.state = {
            imgDeFototeca: ''
        }
    }

    activarPicker() {
        ImagePicker.launchImageLibraryAsync()
        .then(imgData => this.setState({imgDeFototeca: imgData.assets[0].uri}))
        .catch( err => console.log(err))
    }

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

    rechazarImagen(){
        this.setState({imgDeFototeca: ''})
    }

  render() {
    return (
      <View>
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
                        <Text>Aceptar imagen</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                    onPress={()=> this.rechazarImagen()}
                    >
                        <Text>Rechazar imagen</Text>
                    </TouchableOpacity>
                </>
            :
            <>
                <Text>Carga a una foto para tu perfil</Text>
                <TouchableOpacity
                onPress={()=> this.activarPicker()}
                >
                    <Text>
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
        height: 200
    }
})