import Koa from 'koa'
import convert from 'koa-convert'
import cors from 'koa-cors'
import * as dao from './dao'
import router from './middleware/router'
import bodyParser from './middleware/body'

const app = new Koa()
const port = 3301

dao.initiate()
app.use(bodyParser)
app.use(router.routes())

app.use(convert(cors({
  origin: '*', // TODO
  methods: ['GET', 'HEAD', 'PUT', 'POST', 'DELETE', 'PATCH']
})))

console.log(`Server run on port ${port}`)
app.listen(port)
