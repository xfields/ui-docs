import React, {Component} from 'react'
import style from './style.css'
import {Spin} from 'antd'
import {connect} from 'react-redux'
import GlobalMessage from 'components/message/'
// import Header from './header'
// import Container from './container'

class Home extends Component {
  render() {
    const {isLoading, globalMessage} = this.props

    return (
      <div className={style.home}>
        <GlobalMessage msg={globalMessage} />
        <Spin spinning={isLoading === true} size="large">
          {this.props.children}
        </Spin>
      </div>
    )
  }
}

export default connect(state => ({
  isLoading: state.isLoading,
  globalMessage: state.globalMessage
}))(Home)
