import { Text, View, FlatList, StyleSheet } from 'react-native'
import React, { Component } from 'react'
import { auth, db } from '../firebase/config'
import ProfileData from '../components/ProfileData'
import Posts from '../components/Posts'
import Post from '../components/Post'


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
  render() {
    return (
        <View style={styles.contenedor}>

        <View style={styles.perfilInfo}>
          <Text>{this.state.usuarios.owner}</Text>
          <Text>User: {this.state.usuarios.userName}</Text>
          <Text>Bio: {this.state.usuarios.miniBio}</Text>
          <Text>Cantidad de posteos: {this.state.posteos.length}</Text>   
        </View>
        <Posts/>
        <View style={styles.feedfotos}>
        
        <Posts data={this.state.post} navigation={this.props.navigation} />
        

        </View>
        
       
        <FlatList 
          style={styles.flatList}
          data={this.state.posteos}
          keyExtractor={(item)=> item.id.toString()}
          renderItem={({item})=> <Post data={item} navigation={this.props.navigation}/> }
        />
        
        
    
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
  flatList:{
    
  }

})