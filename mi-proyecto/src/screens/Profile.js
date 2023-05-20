import { Text, View, FlatList } from 'react-native'
import React, { Component } from 'react'
import { auth, db } from '../firebase/config'
import ProfileData from '../components/ProfileData'

 class Profile extends Component {
  
    constructor(props){
        super(props)
        this.state={
            usuarios: [ ],
            loading: true
        }
    }

    componentDidMount(){
        db.collection('users').onSnapshot(
            docs => {
                let arrayUsuarios = []
                docs.forEach(doc => arrayUsuarios.push(
                    {id: doc.id,
                    data: doc.data()}
                ))

                this.setState({
                    usuarios: arrayUsuarios,
                    loading: false
                })

            }
        )
    }
  
  
  render() {
    return (
      <View>
        <Text>Profile</Text>
        <ProfileData navigation={this.props.navigation}/>
        <FlatList 
        data={this.state.usuarios}
        keyExtractor={(item)=> item.id.toString()}
        renderItem={({item}) => <Text>{item.data.owner}</Text> }/>
      </View>
    )
  }
}

export default Profile