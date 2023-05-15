import { Text, View, TextInput, TouchableOpacity, StyleSheet, Image } from 'react-native'
import { auth } from '../firebase/config'
import React, { Component } from 'react'
import FormularioRegistro from './FormularioRegistro'
import Registro from '../screens/Registro'

export default class Login extends Component {

    constructor(props){
        super(props)
        this.state={
            inputMail:'',
            inputPassword:'',
            userName:'',
            miniBio:'',
            alert: false,
        }
    }

loguearUsuario(email, password){
    auth.signInWithEmailAndPassword(email,password)
    .then(data => console.log(data))
    .catch(err => console.log(err))
}

  render() {
    return (
      <View style={styles.box}>
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
        <TouchableOpacity
        style={styles.btn}
        onPress={()=> (this.loguearUsuario(this.state.inputMail, this.state.inputPassword), 'HomeNav')}>
            <Text style={styles.btnText}>Loguearme</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={()=> this.props.navigation.navigate('Register')} style={styles.btn}>
            <Text style={styles.btnText}> Volver al registro</Text>
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
        height:20,
        padding:5,
        marginLeft:440,
        width: 300,
        color:'white'
    },
    btn:{
        marginTop: 32, 
        backgroundColor:'black',
        padding:10,
        borderRadius:20,
        width:170,
        marginLeft:520,
    },
    btnText:{
        textAlign: 'center',
        fontWeight:'bold',
        color: 'white'

    },
     img: {
            height:80
    },
    box:{
        backgroundColor:'pink'
    }
})

