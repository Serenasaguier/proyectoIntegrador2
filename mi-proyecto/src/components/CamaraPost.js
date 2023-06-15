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
            tomoFoto: '',
            loader: false
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
            tomoFoto: '',
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
          {
            this.state.mostrarCamara && this.state.tomoFoto === "" 
            ?
                <>
                <Camera
                style ={style.camara}
                type={Camera.Constants.Type.back}
                ref={(metodoComp)=> this.metodoCam = metodoComp}
                />
                <TouchableOpacity onPress={()=> this.tomarFoto()} style={style.btn}>
                    <Text style={style.btnText} >
                        Tomar foto
                    </Text>
                </TouchableOpacity>
                </>
            : 
                this.state.mostrarCamara === false && this.state.tomoFoto !== "" 
            ?
                <>
                    <Image
                    source={{uri: this.state.tomoFoto}}
                    style={style.imagen}
                    />
                    <View>
                        <TouchableOpacity onPress={()=> this.aceptarTodo()} style={style.btn} >
                            <Text style={style.btnText}>
                                Aceptar foto
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={()=> this.rechazarTodo()} style={style.btn}>
                            <Text style={style.btnText}>
                                Rechazar foto
                            </Text>
                        </TouchableOpacity>
                    </View>
                </> 
            : 
            <Text>No tenes permisos para usar la camara</Text>
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
    },
    imagen:{
        flex: 1
    },
    btn:{
        borderStyle: 'solid',
        borderWidth: 1,
        borderColor: 'rgb(255,255,255)',
        backgroundColor: 'rgb(0,0,0)',
        margin: 10,
        padding: 2,
        textAlign: 'right',
        width: '100%'
    },
    btnText:{
        textAlign: 'center',
        fontWeight:'bold',
        color: 'white',
        backgroundColor: 'rgb(165,103,205)'

    }
})