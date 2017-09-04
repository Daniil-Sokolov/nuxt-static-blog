const { Nuxt, Builder } = require('nuxt')
const bodyParser = require('body-parser')
const app = require('express')()
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const superSecret = 'asfvnof13niasc'
const cookieParser = require('cookie-parser')

mongoose.connect('mongodb://localhost/blog', { useMongoClient: true })
mongoose.Promise = global.Promise

var db = mongoose.connection
db.on('error', console.error.bind(console, 'Mongoose connection error:'))
db.once('open', function() {
  console.log('Mongoose connected!')
})

const Post = require('./Post')
const Category = require('./Category')

app.use(bodyParser.json())
app.use(cookieParser())

const createToken = (content, expiresIn = '14d') => {
  return new Promise((resolve, reject) => {
    jwt.sign(content, superSecret, { expiresIn }, (err, token) => {
      if (err) reject(err)
      resolve(token)
    })
  })
}

const authRoute = (req, res, next) => {
  const { token } = req.cookies
  if (token) {
    jwt.verify(token, superSecret, function(err, decoded) {
      if (err) {
        return res.status(422).json({ success: false, error: 'Invalid authentication token.' })
      } else {
        next()
      }
    })
  } else {
    return res.status(550).send({
      success: false,
      error: 'No token provided.'
    })
  }
}

const slugify = (s) => {
  if (!typeof s === 'string' || !s) return s
  return s.toLowerCase().replace(/[^\w\s]/gi, '').replace(/\s/g, '-')
}

app.get('/api/posts', (req, res) => {
  Post.getPosts(function(err, response) {
    if (err) return res.status(404).json({ success: false, message: err })
    res.json(response)
  })
})

app.get('/api/routes', (req, res) => {
  Post.getPosts(function(err, response) {
    if (err) return res.json([])
    let routes = []
    for (let index in response) {
      if (routes.indexOf(response[index].category.slug === -1)){
        routes.push('/'+response[index].category.slug)
      }
      routes.push('/'+response[index].category.slug+'/'+response[index].slug)
    }
    res.json(routes)
  })
})

app.post('/api/posts', authRoute, (req, res) => {
  const data = new Post({
    title: req.body.title,
    slug: slugify(req.body.title),
    subtitle: req.body.subtitle,
    category: req.body.category,
    published: req.body.published,
    sections: req.body.sections
  })

  Post.createPost(data, (err, response) => {
    if (err) return res.status(404).json({ success: false, message: err })
    return res.json(response)
  })
})

app.get('/api/categories', (req, res) => {
  Category.getCategories((err, response) => {
    if (err) return res.status(404).json({ success: false, message: err })
    return res.json(response)
  })
})

app.post('/api/categories', (req, res) => {
  const data = new Category({
    name: req.body.name,
    slug: slugify(req.body.name),
    description: req.body.description,
    banner: req.body.banner
  })

  Category.createCategory(data, (err, response) => {
    if (err) return res.status(404).json({ success: false, message: err })
    return res.json(response)
  })
})

app.post('/api/verifytoken', function(req, res) {
  const { token } = req.body
  if (token) {
    jwt.verify(token, superSecret, function(err, decoded) {
      if (err) {
        return res.status(422).json({ success: false, error: 'Invalid authentication token.' })
      } else {
        req.token = decoded
        return res.json({ success: true })
      }
    })
  } else {
    return res.status(550).send({
      success: false,
      error: 'No token provided.'
    })
  }
})
// POST /api/login to log in the user and add him to the req.session.authUser
app.post('/api/login', function(req, res) {
  if (req.body.password === 'admin') {
    createToken({ user: 'admin' })
      .then(token => res.json({ success: true, token: token }))
      .catch(err => res.status(404).json({ success: false, error: err }))
  } else {
    return res.status(401).json({ success: false, error: 'Wrong password' })
  }
})

// We instantiate Nuxt.js with the options
let config = require('../nuxt.config.js')
config.production = process.env.NODE_ENV === 'production'

const nuxt = new Nuxt(config)

app.use(nuxt.render)

// No build in production
if (!config.production) {
  new Builder(nuxt)
    .build()
    .then()
    .catch((error) => {
      console.error(error)
      process.exit(1)
    })
}

app.listen(3000)
console.log('Server is listening on http://localhost:3000')
