import REST from 'utils/rest'

const URL = {
  // doc: 'http://192.168.254.27:3401'
  doc: __SERVER_HOST__
}

let dp = new REST(URL.doc, 'api')

dp.docs = dp.endpoint('docs')
dp.docs.doc = dp.docs.endpoint('{docId}')
dp.docs.doc.color = dp.docs.doc.endpoint('color')
dp.docs.doc.font = dp.docs.doc.endpoint('font')
export default dp
