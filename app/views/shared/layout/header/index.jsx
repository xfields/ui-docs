import React, {Component, PropTypes} from 'react'
import style from './style.css'
import {Link} from 'react-router'

class Header extends Component {
  static propTypes = {
    title: PropTypes.object.isRequired,
    operation: PropTypes.array
  }

  static defaultProps = {
    operation: []
  }

  render() {
    const {title, operation} = this.props

    return (
      <div className={style.header}>
        <span className={style.home}>
          <Link to="/">规范库首页</Link>
        </span>
        <span className={style.divider}></span>
        <span className={style.name}>
          <Link to={title.link}>{title.name}</Link>
        </span>
        <span className={style.operation}>
        {
          operation.map((op, idx) => (
            <Link to={op.link} key={idx}>{op.name}</Link>
          ))
        }
        </span>
      </div>
    )
  }
}

export default Header
