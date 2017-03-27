import React, {Component, PropTypes} from 'react'
import {Table, Button, Modal} from 'antd'
import style from './style'
import FontForm from './fontForm'
import {connect} from 'react-redux'
import * as actions from 'store/actions'

@connect(null, actions)
export default class extends Component {
  constructor() {
    super()
    this.state = {
      addFormVisible: false,
      editFormVisible: false,
      editIndex: undefined
    }
  }

  static propTypes = {
    data: PropTypes.array
  }

  render() {
    let {data} = this.props
    const {editIndex, addFormVisible, editFormVisible} = this.state

    if (!data) {
      data = []
    }

    const fontColumns = [{
      title: '名称',
      dataIndex: 'key',
      key: 'name'
    }, {
      title: '字体尺寸',
      dataIndex: 'value',
      key: 'fontsize',
      render: text => (
        <span>{`${text}px`}</span>
      )
    }, {
      title: '是否加粗',
      dataIndex: 'bold',
      key: 'bold',
      render: text => (
        <span>{text ? '是' : '否'}</span>
      )
    }, {
      title: '操作',
      key: 'action',
      render: (text, record, index) => (
        <span>
          <a href="javascript:" onClick={this.handlePreview.bind(this, record)}>预览</a>
          <span className="ant-divider" />
          <a href="javascript:" onClick={this.handleEdit.bind(this, index)}>编辑</a>
          <span className="ant-divider" />
          <a href="javascript:" onClick={this.handleDelete.bind(this, index)}>删除</a>
        </span>
      )
    }]

    return (
      <div>
        <div className={style.operation}>
          <Button type="primary" onClick={::this.handleAdd}>新增</Button>
        </div>
        <Table
          pagination={{pageSize: 15}}
          columns={fontColumns}
          dataSource={data} />
        <FontForm
          title="新增"
          visible={addFormVisible}
          onSubmit={::this.handleAddSubmit}
          onOk={::this.handleFormCancel}
          onCancel={::this.handleFormCancel} />
        <FontForm
          title="编辑"
          data={data[editIndex]}
          visible={editFormVisible}
          onSubmit={::this.handleEditSubmit}
          onOk={::this.handleFormCancel}
          onCancel={::this.handleFormCancel} />
      </div>
    )
  }

  handlePreview(record) {
    const {value, bold} = record
    Modal.info({
      title: '预览',
      content: (
        <div>
          <span style={{fontSize: `${value}px`, fontWeight: bold ? 700 : 600}}>
            Aa中文
          </span>
        </div>
      ),
      onOk() {}
    })
  }

  handleDelete(index) {
    this.props.deleteFontItem({
      docId: this.props.docId,
      fontId: index
    })
  }

  handleEdit(index) {
    this.setState({
      editIndex: index,
      editFormVisible: true
    })
  }

  handleAdd() {
    this.setState({
      addFormVisible: true
    })
  }

  handleFormCancel() {
    this.setState({
      addFormVisible: false,
      editFormVisible: false
    })
  }

  handleAddSubmit(value) {
    const {formData, onSuccess} = value
    this.props.addFontItem({
      docId: this.props.docId,
      data: formData,
      onSuccess: () => {
        onSuccess()
        this.setState({
          addFormVisible: false
        })
      }
    })
  }

  handleEditSubmit(value) {
    const {formData, onSuccess} = value
    this.props.editFontItem({
      docId: this.props.docId,
      fontId: this.state.editIndex,
      data: formData,
      onSuccess: () => {
        onSuccess()
        this.setState({
          editFormVisible: false
        })
      }
    })
  }
}
