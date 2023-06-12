import { Text, View, FlatList, StyleSheet } from 'react-native'
import React, { Component } from 'react'
import Post from './Post'

export default class Posts extends Component {
  render() {
    return (
      <View>
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
  flatList: {
      width: '100%'
  }
})