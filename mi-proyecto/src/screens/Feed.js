import { Text, View } from 'react-native'
import React, { Component } from 'react'
import { db } from '../firebase/config'
import Posts from '../components/Posts'

export default class Feed extends Component {

    constructor(props){
        super(props)
        this.state={
            posts:[]
        }
    }

    componentDidMount(){
        db.collection('posts').onSnapshot(docs => {
            let arrayDocs = []
            docs.forEach(doc => arrayDocs.push({
                id: doc.id,
                data:doc.data()
            }))

            console.log(arrayDocs)

            this.setState({
                posts: arrayDocs
            })

        })
    }

  render() {
    return (
      <View>
        <Text>Feed</Text>
        <Posts data={this.state.posts} />
      </View>
    )
  }
}