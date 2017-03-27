import React, {Component} from 'react'
import style from './style.css'

export default class Header extends Component {
  static contextTypes = {
    router: React.PropTypes.object.isRequired
  }

  render() {
    if (!/#\/docs\//.test(location.hash)) {
      return null
    }

    return (
      <div className={style.header}>
      </div>
    )
  }
}
