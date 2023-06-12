import { Text, View , TextInput, TouchableOpacity, StyleSheet} from 'react-native'
import React, { Component } from 'react'
import { db , auth} from '../firebase/config'
import firebase from 'firebase'

export default class FormComment extends Component {
    constructor(props){
        super(props)
        this.state= {
            comentario: ''
        }
    }

    crearComment(comentario){
        db.collection('posts')
        .doc(this.props.idPosteo)
        .update({
            comments: firebase.firestore.FieldValue.arrayUnion({
                owner: auth.currentUser.email,
                createdAt: Date.now(),
                comentario: comentario
            })
        })
    }

  render() {
    return (
      <View style={styles.container}>

           <TouchableOpacity onPress={() => this.props.navigation.navigate('Profile', { email: this.props.data.data.owner })}>
        <Text >{this.props.data.data.owner}</Text>
          </TouchableOpacity>
          <Text>{this.props.props.comentario}</Text>
        <TextInput
        keyboardType='default'
        style={styles.input}
        onChangeText={text => this.setState({comentario: text})}
        value= {this.state.comentario}
        placeholder='Envia tu comentario'
        />
        <TouchableOpacity 
        onPress={()=> this.crearComment(this.state.comentario)}>
            <Text style={styles.btnSend}>Enviar comentario</Text>
        </TouchableOpacity>
      </View>
    )
  }
}

const styles = StyleSheet.create({
    input:{
        color: 'rgb(0,0,0)',
        borderStyle: 'solid',
        borderWidth: 1,
        borderColor: 'rgb(0,0,0)',
        backgroundColor: 'rgb(255,255,255)',
        padding: 10,
        margin: 10
    },
    container: {
        flex: 1,
        backgroundColor: 'white',
        color: 'rgb(255,255,255)',
        padding: 15,
        justifyContent: 'center',
        textAlign: 'center',
    },
    btnSend:{
        borderStyle: 'solid',
        borderWidth: 1,
        backgroundColor: 'rgb(0,0,0)',
        margin: 10,
        padding: 10,
        textAlign: 'center',
        color: 'white',
        borderRadius: 8,
    }
})