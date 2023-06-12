import {
    Text,
    View,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    Image,
  } from "react-native";
  import { auth, db } from "../firebase/config";
  import React, { Component } from "react";
  import Login from "../screens/Login";
  
  class FormularioRegistro extends Component {
    constructor(props) {
      super(props);
      this.state = {
        inputMail: "",
        inputPassword: "",
        userName: "",
        miniBio: "",
        alert: false,
        fotoPerfil: "",
      };
    }

    componentDidMount(){
      auth.onAuthStateChanged(user => {
        if(user){
          this.props.navigation.navigate('HomeNav')
        }
      })
    }
  
    registrarUsuario(mail, password, userName, miniBio) {
      if (mail === "" || password === "" || userName === "") {
        this.setState({ alert: true });
      } else
        auth
          .createUserWithEmailAndPassword(mail, password)
          .then((data) => {
            db.collection("users")
              .add(
                {
                  owner: auth.currentUser.email,
                  createdAt: Date.now(),
                  userName: this.state.userName,
                  miniBio: this.state.miniBio,
                  fotoPerfil: this.state.fotoPerfil,
                },
                this.props.navigation.navigate("Login")
              )
              .then((resp) => console.log(resp))
              .catch((err) => console.log(err));
          })
          .catch((err) => console.log(err));
    }
  
    loguearUsuario(email, password) {
      auth
        .signInWithEmailAndPassword(email, password)
        .then((data) => console.log(data))
        .catch((err) => console.log(err));
    }
  
    render() {
      return (
        <View style={styles.container}>
          {this.state.alert && (
            <View>
              <Text style={styles.btnText}> El campo debe completarse</Text>
            </View>
          )}
  
          <TextInput
            style={styles.input}
            placeholder="Email"
            keyboardType="email-address"
            onChangeText={(text) => this.setState({ inputMail: text })}
            value={this.state.inputMail}
          />
  
          <TextInput
            style={styles.input}
            placeholder="Password"
            onChangeText={(text) => this.setState({ inputPassword: text })}
            value={this.state.inputPassword}
            secureTextEntry={true}
          />
  
          <TextInput
            style={styles.input}
            placeholder="User Name"
            onChangeText={(text) => this.setState({ userName: text })}
            value={this.state.userName}
          />
          <TextInput
            style={styles.input}
            placeholder="Mini Bio"
            onChangeText={(text) => this.setState({ miniBio: text })}
            value={this.state.miniBio}
          />
          <Image
            /* EL USUARIO TIENE QUE PONER SU IMAGEN */ source={{
              uri: "https://thumbs.dreamstime.com/b/sentada-del-perrito-de-labrador-30817211.jpg",
            }}
            style={styles.img}
            resizeMode="contain"
          />
          <TouchableOpacity
            style={styles.btn}
            onPress={() =>
              this.registrarUsuario(
                this.state.inputMail,
                this.state.inputPassword,
                this.state.userName
              )
            }
          >
            <Text style={styles.btnText}>Registrar mi usuario</Text>
          </TouchableOpacity>
          <Text style={styles.btnText}>
            Ya tenes cuenta?
            <TouchableOpacity
              onPress={() => this.props.navigation.navigate("Login")}
            >
              <Text style={styles.btnText}> Ir al Login</Text>
            </TouchableOpacity>
          </Text>
        </View>
      );
    }
  }
  
  const styles = StyleSheet.create({
    input: {
      color: "rgb(0,0,0)",
      borderStyle: "solid",
      borderWidth: 1,
      borderColor: "rgb(0,0,0)",
      backgroundColor: "rgb(255,255,255)",
      padding: 10,
      margin: 10,
    },
    btn: {
      borderStyle: "solid",
      borderWidth: 1,
      borderColor: "rgb(255,255,255)",
      backgroundColor: "rgb(0,0,0)",
      margin: 10,
      padding: 10,
      textAlign: "right",
    },
    btnText: {
      textAlign: "center",
      fontWeight: "bold",
      color: "white",
    },
    img: {
      height: 80,
    },
    container: {
      flex: 1,
      backgroundColor: "rgb(0,0,0)",
      color: "rgb(255,255,255)",
      padding: 15,
      justifyContent: "center",
    },
  });
  
  export default FormularioRegistro;