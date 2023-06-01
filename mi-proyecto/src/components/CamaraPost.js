import { Text, View, TouchableOpacity, Image } from 'react-native'
import React, { Component } from 'react'
import { Camera } from 'expo-camera'
import { StyleSheet } from 'react-native'
import { storage } from '../firebase/config'

export default class CamaraPost extends Component {
    constructor(props){
        super(props)
        this.state = {
            mostrarCamara:false,
            tomoFoto: ''
        }

        this.metodoCam = null
    }

    tomarFoto(){
        this.metodoCam.takePictureAsync()
        .then(memoriaFoto => this.setState(
            {tomoFoto:memoriaFoto.uri,
                mostrarCamara:false
            }
            ))
        .catch(err => console.log(err))
    }

    componentDidMount(){
        Camera.getCameraPermissionsAsync()
        .then(resp => this.setState({mostrarCamara: true}))
        .catch(err => console.log(err))
    }

    rechazarTodo(){
        this.setState({
            tomoFoto: false,
            mostrarCamara: true
        })
    }
    aceptarTodo(){
        fetch(this.state.tomoFoto)
        .then(resp => resp.blob()) //binary large object
        .then(imag => {
            const ref = storage.ref(`fotos/${Date.now()}.jpg`)
            ref.put(imag)
            .then(()=> {
                ref.getDownloadURL()
                .then((url)=> this.props.actualizarFoto(url))
            })
        })
        .catch(err => console.log(err))

    }

  render() {
    return (
      <View style={style.conteiner}>
          {this.state.mostrarCamara && this.state.tomoFoto === "" ?
          <>
          <Camera
          style ={style.camara}
          type={Camera.Constants.Type.back}
          ref={(metodoComp)=> this.metodoCam = metodoComp}
          />
          <TouchableOpacity onPress={()=> this.tomarFoto()}>
              <Text>
                  Tomar foto
              </Text>
          </TouchableOpacity>
          </>
          : this.state.mostrarCamara === false && this.state.tomoFoto !== "" ?
          <>
          <Image
          source={{uri: this.state.tomoFoto}}
          style
          />
          <View>
              <TouchableOpacity onPress={()=> this.aceptarTodo()} >
                  <Text>
                      Aceptar foto
                  </Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={()=> this.rechazarTodo()}>
                  <Text>
                      Rechazar foto
                  </Text>
              </TouchableOpacity>
          </View>
          </>
          :
          <Text>No tienes permisos para usar la camara</Text>
          }
        
      </View>
    )
  }
}

const style = StyleSheet.create({
    camara: {
        height: 250
    },
    conteiner:{
        flex:1
    }
})