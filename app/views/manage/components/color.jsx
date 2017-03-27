import React, {Component, PropTypes} from 'react'
import {Table, Button} from 'antd'
import style from './style'
import ColorForm from './colorForm'
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

    const colorColumns = [{
      title: '名称',
      dataIndex: 'key',
      key: 'name'
    }, {
      title: '色值',
      dataIndex: 'value',
      key: 'color',
      render: (text, record) => (
        <span>
          <span className={style.indicator} style={{backgroundColor: text}}></span>
          <span>{text}</span>
        </span>
      )
    }, {
      title: '操作',
      key: 'action',
      render: (text, record, index) => (
        <span>
          <a href="javascript:" onClick={::this.handleEdit.bind(this, index)}>编辑</a>
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
          columns={colorColumns}
          dataSource={data} />
        <ColorForm
          title="新增"
          visible={addFormVisible}
          onSubmit={::this.handleAddSubmit}
          onOk={::this.handleFormCancel}
          onCancel={::this.handleFormCancel} />
        <ColorForm
          title="编辑"
          data={data[editIndex]}
          visible={editFormVisible}
          onSubmit={::this.handleEditSubmit}
          onOk={::this.handleFormCancel}
          onCancel={::this.handleFormCancel} />
      </div>
    )
  }

  handleDelete(index) {
    this.props.deleteColorItem({
      docId: this.props.docId,
      colorId: index
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
    this.props.addColorItem({
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
    this.props.editColorItem({
      docId: this.props.docId,
      colorId: this.state.editIndex,
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
