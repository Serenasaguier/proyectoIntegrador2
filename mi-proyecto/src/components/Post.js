import { Text, View, TouchableOpacity } from 'react-native'
import React, { Component } from 'react'
import { AntDesign } from '@expo/vector-icons'; 
import { db } from '../firebase/config';
import {FontAwesome} from '@expo/vector-icons'
import firebase from 'firebase';

export default class Post extends Component {

    constructor(props){
        super(props)
        this.state={
            likeado: true
        }
    }

    likeadoUnaVez(){
        this.setState({
            likeado:false
        })
    }

    liked(){
        db.collection('posts').doc(this.props.data.id)
        .update({
            likes: firebase.firestore.FieldValue.arrayUnion(auth.currentUser.email)
        })
        .then((resp)=> {
            this.setState({
                liked: true
            })
        })
        .catch(err => console.log(err))

        this.setState({
            likeado:true
        })
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
            name='heart-o'
            size={24}
            color='red'
            />
          </TouchableOpacity>
          :
          <TouchableOpacity
          onPress={()=> this.liked()}
          >
            <FontAwesome
            name='heart'
            size={24}
            color='red'
            />
          </TouchableOpacity>
        }
        
      </View>
    )
  }
}