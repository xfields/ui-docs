import { handleActions } from 'redux-actions'
import * as T from './actionTypes'

export const isLoading = handleActions({
  [T.RECEIVE_LOADING_STATE]: (state, action) => action.payload
}, false)

export const globalMessage = handleActions({
  [T.RECEIVE_GLOBAL_MESSAGE]: (state, action) => action.payload
}, {})

export const docs = handleActions({
  [T.GET_DOC_LIST]: (state, actions) => {
    return actions.payload.data
  },
  [T.ADD_DOC]: (state, actions) => {
    return actions.payload.data
  }
}, null)

export const doc = handleActions({
  [T.GET_DOC]: (state, actions) => {
    return actions.payload.data
  },
  [T.ADD_COLOR_ITEM]: (state, actions) => {
    return actions.payload.data
  },
  [T.EDIT_COLOR_ITEM]: (state, actions) => {
    return actions.payload.data
  },
  [T.DELETE_COLOR_ITEM]: (state, actions) => {
    return actions.payload.data
  },
  [T.ADD_FONT_ITEM]: (state, actions) => {
    return actions.payload.data
  },
  [T.EDIT_FONT_ITEM]: (state, actions) => {
    return actions.payload.data
  },
  [T.DELETE_FONT_ITEM]: (state, actions) => {
    return actions.payload.data
  }
}, null)
