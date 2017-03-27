import React, {Component, PropTypes} from 'react'
import {Form, Input, Button} from 'antd'
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

    return (
      <Form horizontal onSubmit={::this.handleSubmit}>
        <FormItem
          {...formItemLayout}
          label="名称"
          hasFeedback
        >
          {getFieldDecorator('name', {
            rules: [{
              required: true, message: '请输入UI规范名称'
            }]
          })(
            <Input />
          )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="描述"
          hasFeedback
        >
          {getFieldDecorator('description', {
            rules: [{
              required: true, message: '请输入规范的基本描述'
            }]
          })(
            <Input type="textarea" />
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
        console.log('Received values of form: ', values)
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

export default Form.create()(Fields)
