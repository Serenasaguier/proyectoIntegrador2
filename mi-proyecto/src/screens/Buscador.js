import React, { Component } from 'react'
import { Text, View, TouchableOpacity, TextInput, StyleSheet, FlatList  } from 'react-native'
import {db} from '../firebase/config'

export default class Buscador extends Component {
    constructor(props){
        super(props)
        this.state={
            busqueda: '',
            buscados: [],
            usuariosFijos:[],
        }
    }
  
    componentDidMount(){
        db.collection('users').onSnapshot(
            docs => {
                let arrBusq= []
                
                docs.forEach( doc =>{
                    arrBusq.push({
                        id: doc.id,
                        data: doc.data()
                    })
                    this.setState({
                        buscados: arrBusq,
                        usuariosFijos: arrBusq,
                    })
                })
            }
        )
    }

    filtrar(userBuscado){
        let filtro= this.state.usuariosFijos
            .filter(usuario => {
            usuario.data.owner.toLowerCase().includes(userBuscado.toLowerCase())
            this.setState({buscados: filtro})
        })
    }



    render() { 
    return (
      <View>
        <Text> Buscador </Text>
        <TextInput
        placeholder='mail...'
        onChangeText={(text) => this.filtrar({text})}
        /> 
         <FlatList
         data={this.state.buscados}
         keyExtractor={item  => item.id.toString()}
         renderItem={({item}) =>  <Text> {item.data.owner} </Text>}
         />
      </View>
    )
  }
}
