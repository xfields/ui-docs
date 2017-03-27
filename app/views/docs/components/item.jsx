import React, {Component, PropTypes} from 'react'
import style from './style'

export default class extends Component {
  static PropTypes = {
    onClick: PropTypes.func,
    data: PropTypes.object.isRequired
  }

  render() {
    const {name, description} = this.props.data
    return (
      <div className={style.item} onClick={::this.handleClick}>
        <p>{name}</p>
        <p>{description}</p>
      </div>
    )
  }

  handleClick() {
    //todo
  }
}
