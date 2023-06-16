import { Text, View, TouchableOpacity, StyleSheet, Image } from "react-native";
import React, { Component } from "react";
import { db, auth } from "../firebase/config";
import { FontAwesome, FontAwesome5 } from "@expo/vector-icons";
import firebase from "firebase";

export default class Post extends Component {
  constructor(props) {
    super(props);
    this.state = {
      likeado: false,
      cantidadDeLikes: this.props.data.data.likes.length,
      owner: false
    };
  }

  //mandar like a firebase
  componentDidMount() {
    let estaLikeado = this.props.data.data.likes.includes(
      auth.currentUser.email
    );
    if (estaLikeado === true) {
      this.setState({
        likeado: true,
      });
    }

    if (auth.currentUser.email === this.props.data.data.owner){
      this.setState({
          owner: true
      })
  }

  }

  //sacar like
  likeadoUnaVez() {
    db.collection("posts")
      .doc(this.props.data.id)
      .update({
        likes: firebase.firestore.FieldValue.arrayRemove(
          auth.currentUser.email
        ),
      })
      .then((resp) => {
        this.setState({
          likeado: false,
          cantidadDeLikes: this.state.cantidadDeLikes - 1,
        });
      })
      .catch((err) => console.log(err));
  }

  // poner like
  likes() {
    db.collection("posts")
      .doc(this.props.data.id)
      .update({
        likes: firebase.firestore.FieldValue.arrayUnion(
          auth.currentUser.email
        ),
      })
      .then((resp) => {
        this.setState({
          likeado: true,
          cantidadDeLikes: this.state.cantidadDeLikes + 1,
        });
      })
      .catch((err) => console.log(err));
  }

  // borrar posteo
  deletePost(){
    db.collection("posts")
    .doc(this.props.data.id)
    .delete()
    .then(() => {
        console.log('Post eliminado');
    }).catch((e) => {
        console.log(e);
    });
}

  render() {  
    
    return (
      <View style={style.contenido}>
      <View style={style.cardContainer} >
        <TouchableOpacity onPress={() => this.props.navigation.navigate('ProfileAmigo', { email: this.props.data.data.owner })}>
        <Text style={style.creador}>{this.props.data.data.owner}</Text>
          </TouchableOpacity>
        
        <Image
          style={style.image}
          source={{ uri: this.props.data.data.foto }}
        />
        {this.state.likeado ? (
          <TouchableOpacity onPress={() => this.likeadoUnaVez()}>
            <FontAwesome name="heart" size={24} color="red" />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity onPress={() => this.likes()}>
            <FontAwesome name="heart-o" size={24} color="red" />
          </TouchableOpacity>
        )}
        <Text style={style.like}>{this.state.cantidadDeLikes} likes</Text>


        <TouchableOpacity onPress={()=> this.props.navigation.navigate('Comment', {id: this.props.data.id})}>
          
        <FontAwesome5 style={style.btnComment} name="comment" size={24} color="black" /> <Text style={style.comment} >{this.props.data.data.comments.length} comentarios</Text>
          </TouchableOpacity>
         
        <Text style={style.descripcion} > Pie de foto : {this.props.data.data.descripcion}</Text>
        
        {this.state.owner === true ? 
        <TouchableOpacity onPress={() => this.deletePost()}>
        <FontAwesome name="trash-o" size={24} color="black" />
        </TouchableOpacity>
        : null }
        
      </View>
      </View>
    );
  }
}

const style = StyleSheet.create({
  contenido: {
    marginVertical: 15,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  image: {
    height: 300,
    width: 300,
    borderRadius: 5, 
    borderColor:'rgb(177,141,201)'
},
cardContainer: {
    margin: 7,
    padding: 50,
    borderWidth: 3,
    borderRadius: 5,
    borderColor: 'rgb(177,141,201)',
    backgroundColor: 'rgb(182,157,198)'
},title: {
    fontWeight: 600,
    color: 'rgb(255,255,255)',
    fontSize: 24,
    textAlign: 'center'

},flatList: {
    width: '100%'
},
like: {
  color: 'red'
},
creador:{
  padding: 10,
    margin: 10,
    fontWeight: 'bold', 
    fontSize: 15,
    backgroundColor: 'rgb(165,103,205)',
    borderRadius:10,
    color: '#10254E'
},
descripcion:{
  padding: 10,
  fontSize: 18,
  margin: 10,
  backgroundColor: 'rgb(209,181,227)',
  borderColor: '#C2C2C3'
},
comment:{
  color:'black'
}
});