import React, {Component} from 'react'
// import style from './style'
import {Tabs} from 'antd'
import {connect} from 'react-redux'
import Color from './components/color'
import Font from './components/font'
import Info from './components/info'
import {Header, Main} from 'views/shared/layout'
import * as actions from 'store/actions'

const TabPane = Tabs.TabPane

class Management extends Component {
  componentDidMount() {
    this.props.getDoc({
      id: this.props.routeParams.id
    })
  }

  render() {
    const {doc} = this.props
    if (!doc) {
      return null
    }

    let info = {
      name: doc.name,
      description: doc.description
    }

    let headerTitle = {
      name: doc.name,
      link: `/docs/${doc.id}`
    }

    return (
      <div>
        <Header title={headerTitle} />
        <Main>
          <Tabs>
            <TabPane tab="颜色" key="color">
              <Color data={doc.colors} docId={doc.id} />
            </TabPane>
            <TabPane tab="字体" key="font">
              <Font data={doc['font-size']} docId={doc.id} />
            </TabPane>
            <TabPane tab="基本信息" key="info">
              <Info data={info} />
            </TabPane>
          </Tabs>
        </Main>
      </div>
    )
  }
}

export default connect(state => ({
  doc: state.doc
}), actions)(Management)
