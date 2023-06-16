import React, { Component } from "react";
import {View, Text, StyleSheet} from "react-native";
import { db } from "../firebase/config";
import Posts from '../components/Posts'

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      posteos: [],
      loader: true,
    };
  }

  componentDidMount() {
    console.log(db);
    db.collection("posts")
      .orderBy("createdAt", "desc")
      .onSnapshot((docs) => {
        let posts = [];
        docs.forEach((doc) => {
          console.log(doc.data(), "nashe");
          posts.push({
            id: doc.id,
            data: doc.data(),
          });
        });
        this.setState({
          posteos: posts,
          loader: false,
        });
      });
  }

  render() {
    return (
      <View style={style.container}>
        <Posts data={this.state.posteos} />
      </View>
    );
  }
}
const style = StyleSheet.create({
  container: {
    flex: 1,
    color: "rgb(255,255,255)",
    alignItems: "center",
  },
  image: {
    textAlign: "center",
    width: "40%",
    height: undefined,
    aspectRatio: 20 / 10,
    margin: 10,
  },
  title: {
    fontWeight: 600,
    color: "rgb(255,255,255)",
    fontSize: 24,
    textAlign: "center",
  },
  flatList: {
    width: "100%",
    height: "100%"
  },
});

export default Home;