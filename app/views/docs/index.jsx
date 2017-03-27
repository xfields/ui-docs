import React, {Component} from 'react'
import Item from './components/item'
import style from './style'
import {Icon} from 'antd'
import Link from 'react-router/lib/Link'
import cx from 'classnames'
import Add from './components/add'
import { connect } from 'react-redux'
import * as actions from 'store/actions'
import {Main} from 'views/shared/layout'

class Docs extends Component {
  constructor() {
    super()
    this.state = {
      visible: false
    }
  }

  componentDidMount() {
    this.props.getDocList()
  }

  render() {
    let {docs} = this.props
    const {visible} = this.state

    if (!docs) {
      docs = []
    }

    const slogan = 'UI规范库是一个可定制化的UI规范集合，帮助各项目组同学快速的检索/生成所需要的样式。'

    return (
      <Main>
        <div className={style.docs}>
          <h1>UI规范库</h1>
          <p className={style.slogan}>{slogan}</p>
          <ul className={style['doc-list']}>
            {
              docs.map((item, idx) => (
                <li key={idx}>
                  <Link to={`/docs/${item.id}`}>
                    <div className={cx(style.item, style[`color-${this.randomIdx(idx)}`])}>
                      <Item data={item} />
                    </div>
                  </Link>
                </li>
              ))
            }
            <li className={style.add}>
              <div className={style.item} onClick={::this.handleAddUIDoc}>
                <Icon type="plus" />
              </div>
            </li>
          </ul>
          <Add
            visible={visible}
            onSubmit={::this.handleAddSubmit}
            onOk={::this.handleAddCancel}
            onCancel={::this.handleAddCancel}
          />
        </div>
      </Main>
    )
  }

  randomIdx(idx) {
    return (Math.floor(idx / 4) + idx % 4) % 4
  }

  handleAddUIDoc() {
    this.setState({
      visible: true
    })
  }

  handleAddSubmit(data) {
    const {formData, onSuccess} = data
    this.props.addDoc({
      data: formData,
      onSuccess: () => {
        onSuccess()
        this.setState({
          visible: false
        })
      }
    })
  }

  handleAddCancel() {
    this.setState({
      visible: false
    })
  }
}

export default connect(state => ({
  docs: state.docs
}), actions)(Docs)
