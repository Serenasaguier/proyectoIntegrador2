// proceso de la creacion del posteo

import { Text, View, TouchableOpacity } from 'react-native'
import React, { Component } from 'react'
import FormPost from '../components/FormPost'
import { db, auth } from '../firebase/config'

 class NewPost extends Component {
    constructor(props){
        super(props)
        this.state={
            descripcion: '',
            foto: '',
            likes: [],
            comments: []
        }
    }

    actualizar(text){
            this.setState({
                descripcion: text
            })
        
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
      <View>
        <FormPost subirDescripcion={this.state.descripcion} actualizar={(text)=> this.actualizar(text)} />
        <TouchableOpacity onPress={()=> this.nuevoPosteo({
            descripcion: this.state.descripcion,
            foto: this.state.foto,
            likes: this.state.likes,
            comments:this.state.comments

        })}>
            <Text> Subir Posteo</Text>
        </TouchableOpacity>
      </View>
    )
  }
}

export default NewPost