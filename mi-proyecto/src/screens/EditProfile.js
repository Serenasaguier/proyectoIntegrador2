import React, { Component } from 'react';
import { AntDesign } from '@expo/vector-icons';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { auth, db } from '../firebase/config';
import "firebase/firestore";
import { getAuth,  } from "firebase/auth";






export default class EditProfile extends Component {
    constructor(props) {
        super(props)
        this.state = {
          users: [],
          password: '',
          infoUser: '',
          userInfo: [],
          nuevoError: false,
          
        }
      }
      componentDidMount() {
        db.collection('users').where('owner', '==', auth.currentUser.email).onSnapshot(
          (docs) => {
            let user = []
            docs.forEach((doc) => {
              user.push({
                id: doc.id,
                data: doc.data(),
              })
            })
            this.setState({
                users: user,
              nombre: user[0].data.nombreDeUsuario,
              biografia: user[0].data.bio
            })
          }
        )
      }
    
      actualizar(password, nombre, biografia) {
        if (password == '') {
          db.collection('users').doc(this.state.users[0].id).update({
            nombreDeUsuario: nombre,
            bio: biografia
          }).then(() => {
            this.props.navigation.navigate("Profile")
          })
        } else {
          firebase.auth().currentUser.updatePassword(password)
            .then(() => {
              db.collection('users').doc(this.state.users[0].id).update({
                nombreDeUsuario: nombre,
                bio: biografia
              }).then(() => {
                this.props.navigation.navigate("Login")
              })
                .catch((error) => {
                  console.log(error);
                  this.setState({
                    nuevoError: true
                  })
                })
            })
        }
      }
    
  render() {
    return (
      <View style={styles.container}>

   <TouchableOpacity
          style={styles.flecha}
          onPress={() => this.props.navigation.navigate('Profile')}
        >
          <Text>
            <AntDesign name='arrowleft' size={24} color='black' />
            BACK
          </Text>
        </TouchableOpacity>

        
        <Text style={styles.titulo} > Editar Perfil </Text>

        <TextInput style={styles.input}
          placeholder='User name ...'
          keyboardType='default'
          onChangeText={texto => this.setState({ nombre: texto })}
          value={this.state?.nombre}
        />


        <TextInput style={styles.input}
          placeholder='password...'
          keyboardType='Password'
          onChangeText={texto => this.setState({ password: texto })}
          value={this.state.password}
        />

        <TextInput style={styles.input}
          placeholder='Biografia'
          keyboardType='default'
          onChangeText={texto => this.setState({ biografia: texto })}
          value={this.state?.biografia}
        />


        <  TouchableOpacity style={styles.btn} onPress={() => this.actualizar(this.state.password, this.state.nombre, this.state.biografia)}>
          <Text style={styles.btnText}> Editar Perfil </Text>
        </TouchableOpacity>

       
      </View>

    )
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
    titulo: {
      fontWeight: 100,
      color: 'white',
      textAlign: 'center',
      fontSize: 30,
      fontWeight: 'bold',
      marginBottom: 40,
      marginTop: 40,
    },
  });