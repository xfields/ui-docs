let uidocs = {}
const request = require.context('./', true, /^((?!index).)*\.json$/)

request.keys().forEach(path => {
  const module = request(path)

  path = path.replace(/(\.\/|\.json)/gi, '').split('/')
  const fileName = path[0]

  uidocs[fileName] = module
})

export default uidocs
