import React, { PropTypes } from 'react'
import { message } from 'antd'

const MSG = message

export default class GlobalMessage extends React.Component {
  static propTypes = {
    msg: PropTypes.object
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.msg === nextProps.msg) {
      return
    }
    let {type, message: content} = nextProps.msg
    if (content) {
      if (typeof content === 'object') {
        content = content.message
      }
      if (content) {
        MSG[type](content)
      }
    }
  }

  render() {
    return null
  }
}
