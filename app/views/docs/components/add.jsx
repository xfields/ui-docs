import React, {Component, PropTypes} from 'react'
import {Modal} from 'antd'
import Form from './form'
// import style from './style'

export default class extends Component {
  static PropTypes = {
    visible: PropTypes.bool,
    onSubmit: PropTypes.func.isRequired,
    onOk: PropTypes.func.isRequired,
    onCancel: PropTypes.func.isRequired
  }

  static defaultProps = {
    visible: false
  }

  render() {
    return (
      <Modal
        title="新增"
        visible={this.props.visible}
        onOk={::this.handleOk}
        onCancel={::this.handleCancel}
        footer={null}
      >
        <Form onSubmit={::this.handleSubmit} />
      </Modal>
    )
  }

  handleOk() {
    this.props.onOk()
  }

  handleCancel() {
    this.props.onCancel()
  }

  handleSubmit(value) {
    return this.props.onSubmit(value)
  }
}
