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

  /* componentDidMount(){
    auth.onAuthStateChanged(user => {
      if(user){
        this.props.navigation.navigate('HomeNav')
      }
    })
  } */

  registrarUsuario(mail, password, userName, miniBio) {
    if (mail === "" || password === "" || userName === "") {
      this.setState({ alert: true });
    } else
      auth
        .createUserWithEmailAndPassword(mail, password)
        .then(data => {
          db.collection("users")
            .add({
                owner: auth.currentUser.email,
                createdAt: Date.now(),
                userName: this.state.userName,
                miniBio: this.state.miniBio,
                fotoPerfil: '',
              })
            .then(resp =>{ 
              console.log(resp)
            this.props.navigation.navigate("MasInfoUser", {docId: resp.id})
          })
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
        
        <TouchableOpacity style={styles.btn}
            onPress={() => this.props.navigation.navigate("Login")}>
        <Text style={styles.btnText}>
          Ya tenes cuenta?
            <Text style={styles.btnText}> Ir al Login</Text>
          
        </Text>
        </TouchableOpacity>
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
    padding: 2,
    margin: 10,
  },
  btn: {
    borderWidth: 4,
    backgroundColor: "rgb(0,0,0)",
    margin: 10,
    textAlign: "right",
    borderRadius: 10,
    borderColor: 'black'
    
  },
  btnText: {
    textAlign: "center",
    fontWeight: "bold",
    color: "white",
    backgroundColor: "rgb(165,103,205)",
    borderRadius: 10,
    
  },
  img: {
    height: 80,
  },
  container: {
    flex: 1,
    backgroundColor: "rgb(178,137,205)",
    color: 'rgb(255,87,51)',
    padding: 15,
    justifyContent: "center",

  },
});

export default FormularioRegistro;