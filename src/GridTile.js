import React, { Component } from 'react';

class GridTile extends Component {
  render(){
    return(
      <td className = {this.props.className} onClick = {this.props.handleClick}>
      </td>
    )
  }
}

export default GridTile
