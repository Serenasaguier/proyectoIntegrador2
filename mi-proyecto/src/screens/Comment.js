import React, { Component } from 'react'
import FormComment from '../components/FormComment'

export default class Comment extends Component {
  render() {
    return (
      <FormComment navigation={this.props.navigation} />
    )
  }
}
