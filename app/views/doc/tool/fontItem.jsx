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
    const {key: name, value: size, bold} = this.props.data
    let fontWeight = bold ? 700 : 'normal'
    return (
      <div className={style['c-item-wrap']} onClick={::this.handleClick}>
        <div className={cx(style['c-item'], style['c-item-font'])}>
          <p>{name}</p>
          <p style={{ fontSize: size, fontWeight: fontWeight }}>{size}</p>
        </div>
      </div>
    )
  }

  handleClick() {
    const {onClick, data, idx} = this.props
    onClick && onClick(idx, data)
  }
}
