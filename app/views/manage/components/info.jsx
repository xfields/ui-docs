import React, {Component, PropTypes} from 'react'
// import {Table} from 'antd'
// import style from './style'

export default class extends Component {
  static propTypes = {
    data: PropTypes.object
  }

  render() {
    let {data} = this.props

    if (!data) {
      return <h2>无数据</h2>
    }

    return (
      <div>
        <p>{`名称：${data.name}`}</p>
        <p>{`描述：${data.description}`}</p>
      </div>
    )
  }
}
