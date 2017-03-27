import React, {Component} from 'react'
import style from './style'

export default class Container extends Component {
  render() {
    return (
      <div className={style.container}>
        {this.prop.children}
      </div>
    )
  }
}
