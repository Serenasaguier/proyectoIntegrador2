import { Text, View, FlatList } from 'react-native'
import React, { Component } from 'react'
import Post from './Post'

export default class Posts extends Component {
  render() {
    return (
      <View>
        <FlatList
        data={this.props.data}
        keyExtractor={(item)=> item.id.toString()}
        renderItem={({item})=> <Post data={item} navigation={this.props.navigation}/> }
        />
      </View>
    )
  }
}