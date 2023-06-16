import { Text, View, FlatList, StyleSheet, TouchableOpacity } from 'react-native'
import React, { Component } from 'react'
import { auth, db } from '../firebase/config'
import ProfileData from '../components/ProfileData'
import Post from '../components/Post'

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
  
  
  render() {
    console.log(this.state.posteos);
    console.log(this.state.usuarios)
    return (
      
      <View style={styles.contenedor}>
                  
          <View style={styles.perfilInfo}>

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
          </View>

          
          <FlatList 
          style={styles.flatList}
          data={this.state.posteos}
          keyExtractor={(item)=> item.id.toString()}
          renderItem={({item})=> <Post data={item} navigation={this.props.navigation}/> }
        />
        
          <ProfileData navigation={this.props.navigation}/>
          
          
      
      </View>
    )
  }
}

export default Profile
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
  flatList:{
    
  }

})