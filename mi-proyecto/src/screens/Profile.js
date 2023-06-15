import { Text, View, FlatList, StyleSheet } from 'react-native'
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
    console.log(this.state.usuarios)
    return (
      <View style={styles.contenedor}>
       
        <Text>Profile</Text>
          
          <ProfileData navigation={this.props.navigation}/>

          <View style={styles.perfilInfo}>
            <Text>{this.state.usuarios.owner}</Text>
            <Text>{this.state.usuarios.userName}</Text>
            <Text>{this.state.usuarios.miniBio}</Text>   
          </View>

          {/*<View style={styles.feedfotos}> 
            <FlatList 
            data={this.state.usuarios}
            keyExtractor={(item)=> item.id.toString()}
            renderItem={({item}) => 

            <Post data={item} homeProps={this.props}/> }
            </View>
    /> */}
          
          
      
      </View>
    )
  }
}

export default Profile
const styles= StyleSheet.create({
  
  contenedor: {
    
  },
  perfilInfo:{

  },
  feedfotos:{

  },

})