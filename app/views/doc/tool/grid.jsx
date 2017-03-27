import React, {Component, PropTypes} from 'react'
import { Row, Col } from 'antd'
import style from './style'
import {Link} from 'react-router'

export default class extends Component {
  static PropTypes = {
    docId: PropTypes.oneOf([PropTypes.string, PropTypes.number]).isRequired,
    data: PropTypes.array.isRequired
  }

  static defaultProps = {
    data: []
  }

  render() {
    let list = this.props.data.slice(0)
    const colPerRow = 6
    let rows = []

    while (list.length) {
      let col = list.splice(0, colPerRow).map((item, idx) => (
        <Col span={24 / colPerRow} key={idx}>
          {item}
        </Col>
      ))

      rows.push(
        <div key={list.length} className={style['c-row']}>
          <Row gutter={16}>{col}</Row>
        </div>
      )
    }

    if (rows.length === 0) {
      rows = (
        <div className={style.none}>
          <span>暂无数据，</span>
          <Link to={`/manage/${this.props.docId}`}>去添加</Link>
        </div>
      )
    }

    return (
      <div>
        {rows}
      </div>
    )
  }
}
