import $dp from 'dataProvider'
import { createAction } from 'redux-actions'
import * as T from './actionTypes'

export const getDocList = createAction(T.GET_DOC_LIST,
  options => $dp.docs.get(),
  options => ({
    showLoading: true,
    error: {
      text: '获取规范列表错误'
    }
  })
)

export const addDoc = createAction(T.ADD_DOC,
  options => $dp.docs.post({data: options.data}),
  options => ({
    success: {
      text: '新增规范成功',
      handler: options.onSuccess
    },
    error: {
      text: '新增规范失败',
      handler: options.onError
    }
  })
)

export const getDoc = createAction(T.GET_DOC,
  options => $dp.docs.get(options.id)
)

export const addColorItem = createAction(T.ADD_COLOR_ITEM,
  options => {
    return $dp.docs.doc.color.replace({
      docId: options.docId
    }).post({
      data: options.data
    })
  },
  options => ({
    success: {
      text: '添加成功',
      handler: options.onSuccess
    },
    error: {
      text: '添加失败',
      handler: options.onError
    }
  })
)

export const editColorItem = createAction(T.EDIT_COLOR_ITEM,
  options => {
    return $dp.docs.doc.color.replace({
      docId: options.docId
    }).patch({
      uri: options.colorId,
      data: options.data
    })
  },
  options => ({
    success: {
      text: '修改成功',
      handler: options.onSuccess
    },
    error: {
      text: '修改失败',
      handler: options.onError
    }
  })
)

export const deleteColorItem = createAction(T.DELETE_COLOR_ITEM,
  options => {
    return $dp.docs.doc.color.replace({
      docId: options.docId
    }).delete(options.colorId)
  },
  options => ({
    success: {
      text: '已删除'
    }
  })
)

export const addFontItem = createAction(T.ADD_FONT_ITEM,
  options => {
    return $dp.docs.doc.font.replace({
      docId: options.docId
    }).post({
      data: options.data
    })
  },
  options => ({
    success: {
      text: '添加成功',
      handler: options.onSuccess
    },
    error: {
      text: '添加失败',
      handler: options.onError
    }
  })
)

export const editFontItem = createAction(T.EDIT_FONT_ITEM,
  options => {
    return $dp.docs.doc.font.replace({
      docId: options.docId
    }).patch({
      uri: options.fontId,
      data: options.data
    })
  },
  options => ({
    success: {
      text: '修改成功',
      handler: options.onSuccess
    },
    error: {
      text: '修改失败',
      handler: options.onError
    }
  })
)

export const deleteFontItem = createAction(T.DELETE_FONT_ITEM,
  options => {
    return $dp.docs.doc.font.replace({
      docId: options.docId
    }).delete(options.fontId)
  },
  options => ({
    success: {
      text: '已删除'
    }
  })
)
