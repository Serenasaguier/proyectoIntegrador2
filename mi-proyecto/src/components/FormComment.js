import { Text, View , TextInput, TouchableOpacity, StyleSheet, FlatList} from 'react-native'
import React, { Component } from 'react'
import { db , auth} from '../firebase/config'
import firebase from 'firebase'

export default class FormComment extends Component {
    constructor(props){
        super(props)
        this.state= {
            comentario: '',
            alert: false,
            data:[],
            comments:[]
        }
    }

    componentDidMount() {
        // no se pq no funciona .orderBy('createdAt', 'desc')
        console.log(this.props)
        db.collection('posts')
          .doc(this.props.idComments)
          .onSnapshot(doc => {
            this.setState({
              data: doc.data(),
              comments: doc.data().comments
            }, () => console.log(this.state.data))
          })
      }

    crearComment(comentario){
        if(comentario === ""){
            this.setState({alert:true})
        } else {
        db.collection('posts')
        .doc(this.props.idComments)
        .update({
            comments: firebase.firestore.FieldValue.arrayUnion({
                owner: auth.currentUser.email,
                createdAt: Date.now(),
                comentario: comentario
            })
        })
    }
    }

  render() {
    return (
      <View style={styles.container}>

        {
        this.state.comments.length < 1 ?
         <Text>Aún no hay comentarios.</Text>
          :
        <FlatList
          style={styles.comentarios}
          data={this.state.comments}
          keyExtractor={item => item.createdAt.toString}
          renderItem={({ item }) => <>
            <Text>{item.owner}</Text> 
             <Text>{item.comentario}</Text> 
            </>} />
            }    
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
        
  
        {this.state.alert && (
            <View>
              <Text style={styles.btnText}> El campo esta vacio</Text>
            </View>
          )}
      </View>
    )
  }
}

const styles = StyleSheet.create({
    input:{
        borderWidth: 1,
        backgroundColor: 'white',
        borderWidth: 1,
        borderColor: 'rgb(165,103,205)',
        borderRadius: 8,
        padding: 20,
        fontSize: 16,
        marginVertical: 15
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
        backgroundColor: 'rgb(165,103,205)',
        margin: 10,
        padding: 10,
        textAlign: 'center',
        color: 'white',
        borderRadius: 8,
    }
})