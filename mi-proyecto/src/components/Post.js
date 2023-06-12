import { Text, View, TouchableOpacity, StyleSheet, Image } from "react-native";
import React, { Component } from "react";
import { AntDesign } from "@expo/vector-icons";
import { db, auth } from "../firebase/config";
import { FontAwesome } from "@expo/vector-icons";
import firebase from "firebase";

export default class Post extends Component {
  constructor(props) {
    super(props);
    this.state = {
      likeado: false,
      cantidadDeLikes: this.props.data.data.likes.length,
    };
  }

  //mandar like a firebase
  componentDidMount() {
    console.log(this.props, this.props.data.data.foto, "asd nico");
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
        likes: firebase.firestore.FieldValue.arrayUnion(auth.currentUser.email),
      })
      .then((resp) => {
        this.setState({
          likeado: true,
          cantidadDeLikes: this.state.cantidadDeLikes + 1,
        });
      })
      .catch((err) => console.log(err));
  }

  //
  botonLike() {
    if (this.state.likeado === true) {
      this.setState({
        likeado: false,
      });
    } else {
      this.setState({
        likeado: true,
      });
      this.likes();
    }
  }

  render() {
    return (
      <View style={{paddingTop: 25, paddingRight: 25, paddingBottom: 25}}>
        <Text>{this.props.data.data.owner}</Text>
        <Text>{this.props.data.data.descripcion}</Text>
        <Image
          style={style.image}
          source={{ uri: this.props.data.data.foto }}
        />
        <TouchableOpacity
          onPress={() =>
            this.props.navigation.navigate("Comment", {
              id: this.props.data.id,
            })
          }
        ><FontAwesome
        style={style.btnComment}
        name="comment"
        size={24}
        color="white"
      /></TouchableOpacity>
        
        {console.log("posts vieja escuela", this.props)}
        <Text>
          {" "}
          {this.props.data.data.comments &&
            this.props.data.data.comments.length}{" "}
          {this.props.data.data.comments &&
          this.props.data.data.comments.length === 1
            ? "comentario"
            : "comentarios"}
        </Text>
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
    width: "100%",
    height: 300,
  },
});