import React, { Component } from 'react'
import { View, Text, TouchableOpacity, ActivityIndicator, StyleSheet, Image, FlatList } from 'react-native'
import Card from '../components/Card'

class Home extends Component {

    constructor(props){
        super(props)
        this.state={
            data:[],
            cargando: true,
        }
    }

    


  render() {
    return (
      <View>
        <TouchableOpacity onPress={()=>this.props.navigation.navigate('Register')}>
          <Text>Mandame a registro</Text>
        </TouchableOpacity>
            {this.state.cargando ? <ActivityIndicator size="large" color="blue" />  : 
          <FlatList
            data={this.state.data}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <TouchableOpacity>
                <Card nombre={item.name} image={item.image} />
              </TouchableOpacity>
            )}
          />
        }</View>
    )
  }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
    img:{
      width: 200,
      height: 200
    }
  });


export default Home