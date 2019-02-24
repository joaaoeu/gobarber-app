const { User } = require('../models')

class UserController {
  create (req, res) {
    return res.render('auth/signup')
  }

  async store (req, res) {
    if (!req.file || !req.body.name || !req.body.email || !req.body.password) {
      req.flash('error', 'Please, select a profile image and fill all fields!')
      return res.redirect('/signup')
    }

    const { filename: avatar } = req.file
    await User.create({ ...req.body, avatar })
    req.flash('success', 'Account created! Please, sign in.')
    return res.redirect('/')
  }
}

module.exports = new UserController()
