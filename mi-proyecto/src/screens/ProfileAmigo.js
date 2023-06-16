import { Text, View, FlatList, StyleSheet, TouchableOpacity } from 'react-native'
import React, { Component } from 'react'
import { db } from '../firebase/config'
import Posts from '../components/Posts'
import Post from '../components/Post'

import { AntDesign } from '@expo/vector-icons';


export default class ProfileAmigo extends Component {
    constructor(props){
        super(props)
        this.state={
            usuarios: [],
            loading: true,
            posteos: [],
            props: props,
            infoUsuario: '',
        }
    }
    componentDidMount(){
        db.collection('users').where('owner', '==', this.state.props.route.params.email).onSnapshot(
            docs => {
              docs.forEach(doc => {
                  this.setState({
                      usuarios: doc.data()
                  })
              })
          }
        )
        db.collection('posts').where('owner', '==',  this.state.props.route.params.email).onSnapshot(
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

        <TouchableOpacity
          style={styles.flecha}
          onPress={() => this.props.navigation.navigate('Feed')}
        >
          <Text>
            <AntDesign name='arrowleft' size={24} color='black' />
            BACK
          </Text>
        </TouchableOpacity>

        <View style={styles.cardContainer}>
          <Text>{this.state.usuarios.owner}</Text>
          <Text>User: {this.state.usuarios.userName}</Text>
          <Text>Bio: {this.state.usuarios.miniBio}</Text>
          <Text>Cantidad de posteos: {this.state.posteos.length}</Text>   
        </View>
        <Posts/>
        <View style={styles.feedfotos}>
        
        <Posts data={this.state.post} navigation={this.props.navigation} />
        

        </View>
        
       
        {
            this.state.posteos.length === 0 ?
            <Text style={styles.cardContainer} >El usuario no publico posteos</Text>
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
const styles= StyleSheet.create({
  
  contenedor: {
    flex: 1,
  },
  perfilInfo:{
    flex: 1,
  },
  feedfotos:{
    flex: 1, 
  },
  contenido: {
    marginVertical: 15,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    
  },cardContainer: {
    margin: 7,
    padding: 50,
    borderWidth: 3,
    borderRadius: 5,
    borderColor: 'rgb(177,141,201)',
    backgroundColor: 'rgb(165,103,205)'
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

})