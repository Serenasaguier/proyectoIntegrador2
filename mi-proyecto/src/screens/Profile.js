import { Text, View, FlatList, StyleSheet, Image, TouchableOpacity } from 'react-native'
import React, { Component } from 'react'
import { auth, db } from '../firebase/config'
import Post from '../components/Post'
import { FontAwesome, FontAwesome5 } from "@expo/vector-icons";

import fotoPerfilVacia from '../../assets/fotoPerfilVacia.png';


 class Profile extends Component {
  
    constructor(props){
        super(props)
        this.state={
            usuarios: {},
            loading: true,
            posteos: [],
            props: props
        }
    }

    componentDidMount(){
        db.collection('users').where('owner', '==', auth.currentUser.email).onSnapshot(
            docs => {
              docs.forEach(doc => {
                  this.setState({
                      usuarios: doc.data()
                  })
              })
          }
        )
        db.collection('posts').where('owner', '==', auth.currentUser.email).onSnapshot(
          docs =>{
            let post=[];
            docs.forEach(doc => {
              post.push({
                id: doc.id,
                data: doc.data(),
              
              })
              
              this.setState({
                  posteos: post,
              }) 
            })
          }
        )
      }

      logout(){
        auth.signOut()
        .then(resp => this.props.navigation.navigate('Login'))
        .catch(err=> console.log(err))
    }
  
  
  render() {
    return (
      
      <View style={styles.contenido}>
        
                  
          <View style={styles.cardContainer}>

            <Text>{this.state.usuarios.owner}</Text>
            
            {this.state.usuarios.miniBio !=  '' 
              ?
              <Text>Bio: {this.state.usuarios.miniBio}</Text>
              :
               null} 
          {this.state.usuarios.userName !==  '' 
         ?
         <Text>User: {this.state.usuarios.userName}</Text>
         :
         null
         }   
            <Text>Cantidad de posteos: {this.state.posteos.length}</Text> 
            
        <TouchableOpacity
                    onPress={() => this.props.navigation.navigate("EditProfile")}>
                    <Text style={styles}>
                        <FontAwesome name="gear" size={22} />
                        Editar Perfil
                    </Text>
                </TouchableOpacity>

            <Image
            style={styles.image}
            source={this.state.usuarios.fotoPerfil === '' ? fotoPerfilVacia : this.state.usuarios.fotoPerfil}
             />
            
          </View>

          {
            this.state.posteos.length === 0 ?
            <Text style={styles.cardContainer} >No publicaste ningun posteo todavia</Text>
            :

            <FlatList 
          style={styles.flatList}
          data={this.state.posteos}
          keyExtractor={(item)=> item.id.toString()}
          renderItem={({item})=> <Post data={item} navigation={this.props.navigation}/> }
        /> 
          }

        <TouchableOpacity style={styles.btn} onPress={()=> this.logout()} >
            <Text style={styles.btnText}> Cerrar sesion</Text>
        </TouchableOpacity>


      
      </View>
    )
  }
}

export default Profile
const styles= StyleSheet.create({
  
  contenido: {
    marginVertical: 15,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    
  },
  perfilInfo:{
    flex: 1,
  },
  feedfotos:{
    flex: 1, 
  },
  cardContainer: {
    margin: 7,
    padding: 50,
    borderWidth: 3,
    borderRadius: 5,
    borderColor: 'rgb(177,141,201)',
    backgroundColor: 'rgb(165,103,205)'},
    
    image: {
     
      borderRadius: 30,
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

  }

})