import { Text, View, TextInput, TouchableOpacity, StyleSheet } from 'react-native'
import { auth } from '../firebase/config'
import React, { Component } from 'react'

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
    .then(data => 
    this.props.navigation.navigate('HomeNav')
    )
    .catch(err => this.setState({
        alert:true
    }))
}

  render() {
    return (
      <View style={styles.container}>
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
        { this.state.alert ?
            <View>
                <Text style={styles.btnText} > Hay un error en tu logueo</Text>
            </View>
            :
            null
        }
        <TouchableOpacity
        style={styles.btn}
        onPress={()=> this.loguearUsuario(this.state.email, this.state.password)}>
            <Text style={styles.btnText}>Loguearme</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.btn}  onPress={()=> this.props.navigation.navigate('Registro')}>
        <Text style={styles.btnText} >No tenes cuenta? Ir al Registro </Text>
        </TouchableOpacity>
       
      </View>

    )
  }
}

const styles = StyleSheet.create({
    input:{
        color: 'rgb(0,0,0)',
        borderStyle: 'solid',
        borderWidth: 1,
        borderColor: 'rgb(0,0,0)',
        backgroundColor: 'rgb(255,255,255)',
        padding: 10,
        margin: 10,
        width: '100%'
    },
    btn: {
        borderWidth: 4,
        backgroundColor: "rgb(0,0,0)",
        margin: 10,
        textAlign: "right",
        borderRadius: 10
    },
    btnText: {
        textAlign: "center",
        fontWeight: "bold",
        color: "white",
        backgroundColor: "rgb(165,103,205)",
        borderRadius: 10
    },
     img: {
            height:80
    },
    container: {
        flex: 1,
        backgroundColor: "rgb(178,137,205)",
        color: 'rgb(255,87,51)',
        padding: 15,
        justifyContent: "center",
    
      }
})

