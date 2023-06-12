import { Text, View, StyleSheet} from 'react-native'
import React, { Component} from 'react'
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
      <View style={style.contengo}>
        <Posts data={this.state.posts} navigation={this.props.navigation}/>
      </View>
    )
  }
}
const style = StyleSheet.create({
  contengo: {
      margin: 'auto',
      width: '30%',
      overflow: 'auto'
  }
})