import React, {Component, PropTypes} from 'react'
import style from './style'
import cx from 'classnames'

export default class extends Component {
  static PropTypes = {
    onClick: PropTypes.func,
    idx: PropTypes.number.isRequired,
    data: PropTypes.object.isRequired
  }

  render() {
    const {key: name, value: color} = this.props.data
    return (
      <div className={style['c-item-wrap']} onClick={::this.handleClick}>
        <div
          style={{backgroundColor: color}}
          className={cx(style['c-item'], style['c-item-color'])}>
          <p>{name}</p>
          <p>{color}</p>
        </div>
      </div>
    )
  }

  handleClick() {
    const {onClick, data, idx} = this.props
    onClick && onClick(idx, data)
  }
}
