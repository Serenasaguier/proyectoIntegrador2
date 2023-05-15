import { Text, View, TextInput, TouchableOpacity, StyleSheet, Image } from 'react-native'
import { auth } from '../firebase/config'
import React, { Component } from 'react'

export default class Login extends Component {

loguearUsuario(email, password){
    auth.signInWithEmailAndPassword(email,password)
    .then(data => console.log(data))
    .catch(err => console.log(err))
}

  render() {
    return (
      <View>

        <TextInput
        style={styles.input}
        placeholder='Email'
        keyboardType='email-address'
        onChangeText={(text)=> this.setState({inputMail: text}) }
        value={this.state.inputMail}
        />
        <TextInput
        style={styles.input}
        placeholder= 'Password'
        onChangeText={(text)=> this.setState({inputPassword:text})}
        value={this.state.inputPassword}
        secureTextEntry={true}
        />
        <TextInput
         style={styles.input}
         placeholder= 'User Name'
         onChangeText={(text)=> this.setState({userName:text})}
         value={this.state.userName}
        />
        <TextInput
         style={styles.input}
         placeholder= 'Mini Bio'
         onChangeText={(text)=> this.setState({miniBio:text})}
         value={this.state.miniBio}
        />
        <Image
      /* EL USUARIO TIENE QUE PONER SU IMAGEN */  source={{uri: 'https://thumbs.dreamstime.com/b/sentada-del-perrito-de-labrador-30817211.jpg'}}
        style={styles.img}
        resizeMode='contain'
        />
        <TouchableOpacity
        style={styles.btn}
        onPress={()=> this.loguearUsuario(this.state.inputMail, this.state.inputPassword)}>
            <Text style={styles.btnText}>Loguear mi usuario</Text>
        </TouchableOpacity>
      </View>
    )
  }
}

const styles = StyleSheet.create({
    input:{
        borderWidth:1,
        brderColor:'#3d3d3d',
        marginTop: 24,
        height:24,
        padding:5,
    },
    btn:{
        marginTop: 32, 
        backgroundColor:'black',
        padding:10,
        borderRadius:20,
    },
    btnText:{
        textAlign: 'center',
        fontWeight:'bold',
        color: 'white'

    },
     img: {
            height:80
    }
})

