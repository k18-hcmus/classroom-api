import createError from 'http-errors'
import express from 'express'
import cookieParser from 'cookie-parser'
import logger from 'morgan'
import swaggerJSDoc from 'swagger-jsdoc'
import swaggerUI from 'swagger-ui-express'
import usersRouter from './routes/users.route'
import classroomsRouter from './routes/classrooms.route'

require('dotenv').config()

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Classroom API',
      version: '1.0.0',
      description:
        'This is a simple CRUD API application made with Express and documented with Swagger'
    },
    servers: [
      {
        url: `${process.env.URL}:${process.env.PORT}`
      }
    ]
  },
  apis: ['src/routes/*.js']
}

const specs = swaggerJSDoc(options)

const app = express()

app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())

app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(specs))

app.use('/api/users', usersRouter)
app.use('/api/classrooms', classroomsRouter)

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404))
})

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}

  // render the error page
  res.status(err.status || 500)
  res.send(err.message)
})

export default app
