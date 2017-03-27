import React, {Component} from 'react'
import style from './style.css'

export default class extends Component {
  render() {
    return (
      <div className={style.main}>
        {this.props.children}
      </div>
    )
  }
}
