import { Text, View, TouchableOpacity, StyleSheet } from 'react-native'
import React, { Component } from 'react'
import { auth } from '../firebase/config'
import { getAuth, updatePassword } from "firebase/auth";


// const auth = getAuth();

// const user = auth.currentUser;
// const newPassword = getASecureRandomPassword();


class ProfileData extends Component {

  // DE FUNCIONALIDAD ELECTIVA PODEMOS HACER : Editar mi perfil: incorporar la funcionalidad para editar campos del perfíl del usuario. Los campos actualizables son: nombre de usuario, contraseña y mini bio. Deben tener en cuenta que la contraseña se modifica en Authentication y los demás datos en la colección 'users'. Puntaje: 1.

    //  updatePassword(user, newPassword)
    //  .then(() => {
        // Update successful.
    //  })
    //  .catch((error) => {
        // An error ocurred
        // ...
    //  });

    logout(){
        auth.signOut()
        .then(resp => this.props.navigation.navigate('Login'))
        .catch(err=> console.log(err))
    }

  render() {
    return (
      <View>
        <TouchableOpacity style={styles.btn} onPress={()=> this.logout()} >
            <Text style={styles.btnText}> Cerrar sesion</Text>
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
      width:200
  },
  btnText:{
      textAlign: 'center',
      fontWeight:'bold',
      color: 'white',
      backgroundColor: "rgb(165,103,205)",

  },
   img: {
          height:80
  }
})

export default ProfileData