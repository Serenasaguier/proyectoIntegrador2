import { Text, View, TextInput, TouchableOpacity, StyleSheet, Image } from 'react-native'
import { auth } from '../firebase/config'
import React, { Component } from 'react'
import Profile from '../screens/Profile'

export default class FormularioLogin extends Component {

    constructor(props){
        super(props)
        this.state={
            email:'',
            password:'',
            alert: false,
        }
    }

loguearUsuario(mail, password){
    auth.signInWithEmailAndPassword(mail,password)
    .then(data => this.props.navigation.navigate('Feed'))
    .catch(err => console.log(err))
}

  render() {
    return (
      <View style={styles.box}>
        <TextInput
        style={styles.input}
        placeholder='Email'
        keyboardType='email-address'
        onChangeText={(text)=> this.setState({email: text}) }
        value={this.state.email}
        />
        <TextInput
        style={styles.input}
        placeholder= 'Password'
        onChangeText={(text)=> this.setState({password:text})}
        value={this.state.password}
        secureTextEntry={true}
        />
        <TouchableOpacity
        style={styles.btn}
        onPress={()=> this.loguearUsuario(this.state.email, this.state.password)}>
            <Text style={styles.btnText}>Loguearme</Text>
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

