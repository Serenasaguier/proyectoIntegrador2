import { Text, View, TextInput, TouchableOpacity, StyleSheet, Image } from 'react-native'
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
        <Text style={styles.btnText} >
          No tenes cuenta?
          <TouchableOpacity  onPress={()=> this.props.navigation.navigate('Registro')}>
            <Text> Ir al Registro</Text>
        </TouchableOpacity>
        </Text>
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
    btn:{
        borderStyle: 'solid',
        borderWidth: 1,
        borderColor: 'rgb(255,255,255)',
        backgroundColor: 'rgb(0,0,0)',
        margin: 10,
        padding: 10,
        textAlign: 'right',
        width: '100%'
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
        flex: 1,
        backgroundColor: 'rgb(0,0,0)',
        color: 'rgb(255,255,255)',
        padding: 15,
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%'
    }
})

