import express from 'express'
import routerApi from './routes/index'
import helmet from 'helmet'
import cors from 'cors'
import { errorHandler } from "./middleware/error.handler";
import { notFoundHandler } from "./middleware/not-found.handler";
import { boomErrorHandler } from './middleware/boom-error.handler';

const app = express()
const PORT = process.env.PORT || 3000 

const whitelist = ['http://localhost:8080', 'http://localhost:3000']
const options = {
  origin: (origin: any, callback: any) => {
    if (whitelist.includes(origin) || !origin) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed'))
    }
  }
}

app.use(helmet())
app.use(cors(options))
app.use(express.json())
routerApi(app)


app.use(notFoundHandler)
app.use(boomErrorHandler)
app.use(errorHandler)

app.listen(PORT, () => {
  console.log(`~ ~ ~ ~ Server running on port: ${PORT} ~ ~ ~ ~`)
})

