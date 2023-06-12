// proceso de la creacion del posteo

import { Text, View, TouchableOpacity, StyleSheet } from 'react-native'
import React, { Component } from 'react'
import FormPost from '../components/FormPost'
import { db, auth } from '../firebase/config'
import CamaraPost from '../components/CamaraPost'

 class NewPost extends Component {
    constructor(props){
        super(props)
        this.state={
            descripcion: '',
            foto: '',
            likes: [],
            comments: [],
            loader: false
        }
    }

    actualizar(text){
            this.setState({
                descripcion: text
            })
        
    }   

    actualizarFoto(urlPic){
      this.setState({foto:urlPic})
    }

    nuevoPosteo({descripcion,foto,likes,comments}){
        db.collection('posts').add({
            owner: auth.currentUser.email ,
            descripcion: descripcion ,
            foto: foto,
            createdAt: Date.now() ,
            likes: likes ,
            comments: comments 
        })
        .then(res => this.props.navigation.navigate('Feed'))
        .catch(err=> console.log(err))
    }


  render() {
    return (
      <View style={style.container}>
        
        {
          this.state.foto == "" ?
          <CamaraPost
          actualizarFoto={(urlPic)=> this.actualizarFoto(urlPic)}
          />
          :
          <View>
        <FormPost subirDescripcion={this.state.descripcion} actualizar={(text)=> this.actualizar(text)} />
        <TouchableOpacity style={style.btn} onPress={()=> this.nuevoPosteo({
            descripcion: this.state.descripcion,
            foto: this.state.foto,
            likes: this.state.likes,
            comments:this.state.comments

        })}>
            <Text style={style.btnText}> Subir Posteo</Text>
        </TouchableOpacity>
          </View>
        }
       
      </View>
    )
  }
}

const style = StyleSheet.create({
  container: {
    flex: 1
  },
  btn:{
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: 'rgb(255,255,255)',
    backgroundColor: 'rgb(0,0,0)',
    margin: 10,
    padding: 10,
    textAlign: 'right',
    width: '100%'
},
btnText:{
    textAlign: 'center',
    fontWeight:'bold',
    color: 'white'

}
}) 

export default NewPost