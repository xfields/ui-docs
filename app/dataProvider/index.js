import uidocs from './data'

let dp = {
  docs: {
    get: getDocs
  }
}

function getDocs(id) {
  let data
  if (!id) {
    data = Object.keys(uidocs).map(key => ({
      ...uidocs[key],
      id: key
    }))
  } else {
    data = {
      ...uidocs[id],
      id: id
    }
  }
  return {data}
}

export default dp
