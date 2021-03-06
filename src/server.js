const express = require('express')
const session = require('express-session')
const FileStore = require('session-file-store')(session)
const nunjucks = require('nunjucks')
const flash = require('connect-flash')
const path = require('path')
const routes = require('./routes')

class App {
  constructor () {
    this.express = express()
    this.isDev = process.env.NODE_ENV !== 'production'

    this.middlewares()
    this.views()
    this.routes()
  }

  middlewares () {
    this.express.use(express.urlencoded({ extended: false }))
    this.express.use(flash())
    this.express.use(
      session({
        name: 'root',
        secret: 'PoniesAreBeautiful',
        resave: true,
        store: new FileStore({
          path: path.resolve(__dirname, '..', 'tmp', 'sessions')
        }),
        saveUninitialized: true
      })
    )
  }

  views () {
    nunjucks.configure(path.resolve(__dirname, 'app', 'views'), {
      express: this.express,
      autoescape: true,
      watch: this.isDev
    })

    this.express.set('view engine', 'njk')
    this.express.use(express.static(path.resolve(__dirname, 'public')))
  }

  routes () {
    this.express.use(routes)
  }
}

module.exports = new App().express
