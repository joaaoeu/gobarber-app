const express = require('express')
const multerConfig = require('./config/multer')
const upload = require('multer')(multerConfig)

const routes = express.Router()

const authMiddleware = require('./app/middlewares/auth')
const guestMiddleware = require('./app/middlewares/guest')
const flashMiddleware = require('./app/middlewares/flash')

const FileController = require('./app/controllers/FileController')
const SessionController = require('./app/controllers/SessionController')
const UserController = require('./app/controllers/UserController')

routes.use(flashMiddleware)

routes.get('/file/:file', FileController.show)

routes.get('/', guestMiddleware, SessionController.create)
routes.post('/signin', SessionController.store)

routes.get('/signup', guestMiddleware, UserController.create)
routes.post('/signup', upload.single('avatar'), UserController.store)

routes.use('/app', authMiddleware)
routes.get('/app/logout', SessionController.destroy)
routes.get('/app/dashboard', (req, res) => res.render('dashboard'))

module.exports = routes
