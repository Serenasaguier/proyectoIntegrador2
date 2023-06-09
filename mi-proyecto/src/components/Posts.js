import { View, FlatList, StyleSheet } from 'react-native'
import React, { Component } from 'react'
import Post from './Post'

export default class Posts extends Component {
  render() {
    return (
      <View style={style.container}>
        <FlatList
        style={style.flatList}
        data={this.props.data}
        keyExtractor={(item)=> item.id.toString()}
        renderItem={({item})=> <Post data={item} navigation={this.props.navigation}/> }
        />
      </View>
    )
  }
}

const style = StyleSheet.create({
  container:{
    flex:1
  },
  flatList: {
      width: '100%'
  }
})