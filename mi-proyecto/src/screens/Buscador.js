import { Text, View, TextInput, FlatList, StyleSheet, TouchableOpacity } from 'react-native'
import React, { Component } from 'react'
import { db } from '../firebase/config'

export default class Buscador extends Component {
    constructor(props){
        super(props)
        this.state={
            users:[],
            usuariosFijos: []
        }
    }

    componentDidMount(){
        db
        .collection('users')
        .onSnapshot(
            docs => {
                let arrUsers = []
                docs.forEach(doc => {
                  arrUsers.push({
                    id: doc.id,
                    data: doc.data()
                  })
                })
                this.setState({
                    users:arrUsers,
                  usuariosFijos:arrUsers
                })
            }
        )
    }

    filrarBusqueda(buscadorFiltrado){
      let filtro = this.state.usuariosFijos
      .filter(usuario =>
        usuario.data.owner.toLowerCase().includes(buscadorFiltrado.toLowerCase()))
        this.setState({users:filtro})
    }


  render() {
    return (
      <View style={style.container}>
        
        <TextInput style={style.input}
            keyboardType='search'
            placeholder='Buscar amigos...'
            onChangeText={(text)=> this.filrarBusqueda(text)}
        />
        {this.state.users.length  > 0 ?
        <FlatList
                data={this.state.users}
                keyExtractor={item => item.id.toString()}

                renderItem={({ item }) => (
                    <View style={style.container}>
                     
                      <TouchableOpacity
                        style={style}
                        onPress={() =>
                          this.props.navigation.navigate("ProfileAmigo", {
                            email: item.data.owner,
                          })
                        }
                      >
                      
                        <Text style={style.text}>
                          {item.data.owner} 
                        </Text>
                      </TouchableOpacity>
                    </View>
                  )}
        
                     
      />
        
        :
        <Text style={style.notFound}>No se encontraron resultados</Text>
    }
        
      </View>
    )
  }
}


const style = StyleSheet.create({
    
    input: {
        color: 'rgb(0,0,0)',
        borderStyle: 'solid',
        borderWidth: 1,
        borderColor: 'grey',
        backgroundColor: 'white',
        padding: 10,
        margin: 10
    },
    container: {
        backgroundColor: 'rgb(165,103,205)',
        color: 'rgb(255,255,255)',
        padding: 15,
        justifyContent: 'center',
    },
    notFound: {
        fontSize: 12,
        color: 'rgb(255,0,0)'
    },
    text:{
        color: 'white',
        borderWidth: 1,
        borderColor: 'white',
        width: 200,
        textAlign: 'center',
        padding: 3,
    }
})
