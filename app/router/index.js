import React, { Component } from 'react'
import { hashHistory, Router, Route, IndexRedirect } from 'react-router'
import Home from 'views/home'
import Docs from 'views/docs'
import Doc from 'views/doc'
import Management from 'views/manage'

const routes = (
  <Route path="/" component={Home}>
    <IndexRedirect to="/docs" />
    <Route path="docs" component={Docs} />
    <Route path="docs/:id" component={Doc} />
    <Route path="manage/:id" component={Management} />
  </Route>
)

export default class extends Component {
  render() {
    return (
      <Router history={hashHistory} routes={routes} />
    )
  }
}
