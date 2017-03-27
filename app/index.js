import React from 'react'
import ReactDOM from 'react-dom'
import Router from 'router'
import style from 'theme/default/app.css'
import { Provider } from 'react-redux'
import store from 'store'

let appEle = document.getElementById('app')
appEle.classList.add(style.app)

ReactDOM.render(
  <Provider store={store}>
    <Router />
  </Provider>,
  appEle
)
