import { View, StyleSheet, ActivityIndicator} from 'react-native'
import React, { Component} from 'react'
import { db } from '../firebase/config'
import Posts from '../components/Posts'

export default class Feed extends Component {

    constructor(props){
        super(props)
        this.state={
            posts:[],
            loader: true
        }
    }

    componentDidMount(){
      db.collection('posts')
      .orderBy('createdAt', 'desc')
      .onSnapshot(docs => {
            let arrayDocs = []
            docs.forEach(doc => arrayDocs.push({
                id: doc.id,
                data:doc.data()
            }))
            this.setState({
                posts: arrayDocs,
                loader: false
            })

        })
    }

  render() {
    return (
      <View style={style.container}>

      {this.state.loader === true ?
      <ActivityIndicator size='large' color='green' />
      :
          <Posts data={this.state.posts} navigation={this.props.navigation} />
    }
      </View>
    )
  }
}
const style = StyleSheet.create({ 
  container: {
    flex: 1,
    color: 'rgb(255,255,255)',
    justifyContent: 'center',
    alignItems: 'center'

}
})