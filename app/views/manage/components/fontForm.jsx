import React, {Component, PropTypes} from 'react'
import {Form, Input, Button, Modal, Checkbox} from 'antd'
const FormItem = Form.Item

class Fields extends Component {
  static PropTypes = {
    onSubmit: PropTypes.func.isRequired
  }

  render() {
    const { getFieldDecorator } = this.props.form

    const formItemLayout = {
      labelCol: { span: 6 },
      wrapperCol: { span: 14 }
    }

    const tailFormItemLayout = {
      wrapperCol: {
        span: 14,
        offset: 6
      }
    }

    return (
      <Form horizontal onSubmit={::this.handleSubmit}>
        <FormItem
          {...formItemLayout}
          label="标识"
          hasFeedback
        >
          {getFieldDecorator('key', {
            rules: [{
              required: true, message: '请输入字体标识'
            }]
          })(
            <Input />
          )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="字体大小"
          hasFeedback
        >
          {getFieldDecorator('value', {
            rules: [{
              required: true, message: '请输入字体大小'
            }]
          })(
            <Input />
          )}
        </FormItem>
        <FormItem
          {...tailFormItemLayout}
          hasFeedback
        >
          {getFieldDecorator('bold', {valuePropName: 'checked'})(
            <Checkbox>加粗</Checkbox>
          )}
        </FormItem>
        <FormItem wrapperCol={{ span: 14, offset: 6 }}>
          <Button type="primary" htmlType="submit">
            提交
          </Button>
        </FormItem>
      </Form>
    )
  }

  handleSubmit(e) {
    e.preventDefault()
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        this.props.onSubmit({
          formData: values,
          onSuccess: () => {
            this.props.form.resetFields()
          }
        })
      }
    })
  }
}

export default class extends Component {
  static PropTypes = {
    title: PropTypes.string.isRequired,
    data: PropTypes.object,
    visible: PropTypes.bool,
    onSubmit: PropTypes.func.isRequired,
    onOk: PropTypes.func.isRequired,
    onCancel: PropTypes.func.isRequired
  }

  static defaultProps = {
    visible: false
  }

  render() {
    const {title, data} = this.props
    let options
    if (data) {
      console.log(data.bold)
      options = {
        mapPropsToFields: args => {
          return {
            key: {value: data.key},
            value: {value: data.value},
            bold: {value: Boolean(data.bold)}
          }
        }
      }
    }

    const Form = Form.create(options)(Fields)

    return (
      <Modal
        title={title}
        visible={this.props.visible}
        onOk={::this.handleOk}
        onCancel={::this.handleCancel}
        footer={null}>
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
