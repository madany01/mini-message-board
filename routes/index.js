const express = require('express')

const router = express.Router()

const messages = [
  {
    user: 'Amando',
    date: new Date(),
    text: 'Hi there!',
  },
  {
    user: 'Charles',
    date: new Date(),
    text: 'Hello World!',
  },
]

router.get('/', (req, res) => {
  res.render('index', { title: 'Messages', messages })
})

router.get('/new', (req, res) => {
  res.render('form', { title: 'New Message' })
})

router.post('/new', (req, res) => {
  const msg = {
    user: req.body.user.trim(),
    text: req.body.text.trim(),
    date: new Date(),
  }

  if (!msg.user || !msg.text) {
    res.status(400).sendStatus('Bad Request')
    return
  }

  messages.push(msg)

  res.redirect('/')
})

module.exports = router
