import REST from 'utils/rest'

const URL = {
  doc: 'http://119.29.98.219:3301'
}

let dp = new REST(URL.doc, 'api')

dp.docs = dp.endpoint('docs')
dp.docs.doc = dp.docs.endpoint('{docId}')
dp.docs.doc.color = dp.docs.doc.endpoint('color')
dp.docs.doc.font = dp.docs.doc.endpoint('font')
export default dp
