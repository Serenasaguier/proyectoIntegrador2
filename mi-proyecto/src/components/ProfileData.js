import { Text, View, TouchableOpacity, StyleSheet } from 'react-native'
import React, { Component } from 'react'
import { auth } from '../firebase/config'

class ProfileData extends Component {

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
      color: 'white'

  },
   img: {
          height:80
  }
})

export default ProfileData