import { Text, View, TouchableOpacity, StyleSheet, Image } from "react-native";
import React, { Component } from "react";
import { AntDesign } from "@expo/vector-icons";
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
    console.log(this.props, this.props.data.data.foto, 'asd')
    let estaLikeado = this.props.data.data.likes.includes(
      auth.currentUser.email
    );
    if (estaLikeado === true) {
      this.setState({
        likeado: true,
      });
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
    console.log(this.props)
    return (
      <View style={style.cardContainer} >
        <TouchableOpacity onPress={() => this.props.navigation.navigate('Profile', { email: this.props.data.data.owner })}>
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
        <Text style={style.contenido}>{this.state.cantidadDeLikes} likes</Text>


        <TouchableOpacity onPress={()=> this.props.navigation.navigate('Comment', {id: this.props.data.id})}>
          <FontAwesome5 style={style.btnComment} name="comment" size={24} color="black" />
          <Text>Agregar comentario</Text>
          </TouchableOpacity>
         


        <Text> Pie de foto : {this.props.data.data.descripcion}</Text>
        {this.state.owner === true ? 
        <TouchableOpacity onPress={() => this.deletePost()}>
        <FontAwesome name="trash-o" size={24} color="black" />
        </TouchableOpacity>
        : null }
        
      </View>
    );
  }
}

const style = StyleSheet.create({
  contenido: {
    fontSize: 16,
    color: "black",
    marginTop: 3,
  },
  image: {
    width: '100%',
    height: 300
},
cardContainer: {
  padding: 15,
  borderBottomWidth: 1,
  borderColor: 'rgb(180,180,180)',
  borderStyle: 'solid',
  width: '100vw'
},
});