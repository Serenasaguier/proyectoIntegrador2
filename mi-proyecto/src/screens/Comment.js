import { Text, View, FlatList, StyleSheet, TouchableOpacity } from 'react-native'
import React, { Component } from 'react'
import FormComment from '../components/FormComment'
import { db } from '../firebase/config'
import { AntDesign } from '@expo/vector-icons';

class Comment extends Component {
  constructor(props) {
    super(props)
    this.state = {
      data: {}
    }
  }

  componentDidMount() {
    db.collection('posts')
      .doc(this.props.route.params.id)
      .onSnapshot(doc => {
        this.setState({
          data: doc.data()
        }, () => console.log(this.state.data))
      })
  }

  render() {

    return (
      <View style={styles.container}>
        <TouchableOpacity
          style={styles.flecha}
          onPress={() => this.props.navigation.navigate('Feed')}
        >
          <Text>
            <AntDesign name='arrowleft' size={24} color='black' />
            back
          </Text>
        </TouchableOpacity>
        
        <FlatList
          style={styles.comentarios}
          data={this.state.data.comments}
          keyExtractor={item => item.createdAt.toString}
          renderItem={({ item }) => <View>
            <Text>{item.owner}</Text>  <Text>{item.comentario}</Text> 
            </View>
        } 
        />
        <FormComment navigation={this.props.route.params.id} />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  comentarios: {
    padding: 10,
    flexDirection: 'column',
    flex: 10,
  },
  boton: {
    textAlign: 'center',
    fontWeight: 'bold',
    color: 'white'
  },
  btn: {
    marginTop: 32,
    backgroundColor: '#54d0e0',
    padding: 10,
    borderRadius: 20
  },
  flecha: {
    alignItems: 'start'
  },    
  container: {
    flex: 1,
    backgroundColor: 'white',
    color: 'rgb(255,255,255)',
    padding: 15,
    justifyContent: 'center',
    textAlign: 'center',
}
})

export default Comment