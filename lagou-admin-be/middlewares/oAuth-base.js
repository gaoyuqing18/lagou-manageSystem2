const jwt = require('jsonwebtoken')
const fs = require('fs')
const path = require('path')

const oAuthBase = (req, res, next) => {
  res.set('Content-Type', 'application/json; charset=utf-8')
  let token = req.header('X-Access-Token')

  //let cert = fs.readFileSync(path.resolve(__dirname, '../keys/rsa_public_key.pem'))
  let cert = 'i love u'
  jwt.verify(token, cert, (err, decoded) => {
    if (err) {
      res.render('fail', {
        data: JSON.stringify({
          isSignin: false
        })
      })
    } else {
      next()
    }
  })
}

module.exports = oAuthBase