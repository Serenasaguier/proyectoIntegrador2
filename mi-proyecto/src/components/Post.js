import { Text, View, TouchableOpacity } from 'react-native'
import React, { Component } from 'react'
import { AntDesign } from '@expo/vector-icons'; 
import { db, auth } from '../firebase/config';
import {FontAwesome} from '@expo/vector-icons'
import firebase from 'firebase';

export default class Post extends Component {

    constructor(props){
        super(props)
        this.state={
            likeado: false
        }
    }

    componentDidMount(){
        let estaLikeado = this.props.data.data.likes.includes(auth.currentUser.email)
        if (estaLikeado === true) {
            this.setState({
                likeado:true
            })
        }
    }

    likeadoUnaVez(){

        db.collection('posts').doc(this.props.data.id)
        .update({
            likes: firebase.firestore.FieldValue.arrayRemove(auth.currentUser.email)
        })
        .then((resp)=> {
            this.setState({
                likeado:false
            })
        })
        .catch(err => console.log(err))
        
    }

    liked(){
        db.collection('posts').doc(this.props.data.id)
        .update({
            likes: firebase.firestore.FieldValue.arrayUnion(auth.currentUser.email)
        })
        .then((resp)=> {
            this.setState({
                likeado: true
            })
        })
        .catch(err => console.log(err))
    }

  render() {
    return (
      <View>
        <Text>{this.props.data.data.descripcion}</Text> 
        {
          this.state.likeado ?
          <TouchableOpacity
          onPress={()=> this.likeadoUnaVez()}
          >
            <FontAwesome
            name='heart'
            size={24}
            color='red'
            />
          </TouchableOpacity>
          :
          <TouchableOpacity
          onPress={()=> this.liked()}
          >
            <FontAwesome
            name='heart-o'
            size={24}
            color='red'
            />
          </TouchableOpacity>
        }
        
      </View>
    )
  }
}