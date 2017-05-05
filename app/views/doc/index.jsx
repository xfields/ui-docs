import React, {Component} from 'react'
import {connect} from 'react-redux'
import * as actions from 'store/actions'
import Tool from './tool'
import {Header, Main} from 'views/shared/layout'

class Doc extends Component {
  componentDidMount() {
    this.props.getDoc({
      id: this.props.routeParams.id
    })
  }

  render() {
    const {doc} = this.props
    if (!doc) return null

    let headerTitle = {
      name: doc.name,
      link: `/docs/${doc.id}`
    }

    return (
      <div>
        <Header title={headerTitle} />
        <Main>
          <Tool doc={doc} />
        </Main>
      </div>
    )
  }
}

export default connect(state => ({
  doc: state.doc
}), actions)(Doc)
