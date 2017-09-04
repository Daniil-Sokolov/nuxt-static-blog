const { Nuxt, Builder } = require('nuxt')
const bodyParser = require('body-parser')
const app = require('express')()

const Datastore = require('nedb')
const categories = new Datastore({ filename: './server/data/categories', autoload: true })
const posts = new Datastore({ filename: './server/data/posts', autoload: true})

app.use(bodyParser.json())

const slugify = (s) => {
  if (!typeof s === 'string' || !s) return s
  return s.toLowerCase().replace(/[^\w\s]/gi, '').replace(/\s/g, '-')
}

app.get('/api/posts', (req, res) => {
  posts.find({}, (err, docs) => {
    if (err) return res.status(404).json({ success: false, error: err })
    return res.json(docs)
  })
})

app.post('/api/posts', (req, res) => {
  const data = {
    title: req.body.title,
    slug: slugify(req.body.title),
    created: new Date(),
    subtitle: req.body.subtitle,
    category: req.body.category,
    published: req.body.published,
    sections: req.body.sections
  }

  posts.insert(data, (err, newDoc) => {
    if (err) res.status(404).json({ success: false, error: err })
    res.json(newDoc)
  })
})

app.get('/api/routes', (req, res) => {
  posts.find({}, (err, response) => {
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

app.get('/api/categories', (req, res) => {
  categories.find({}, (err, docs) => {
    if (err) return res.status(404).json({ success: false, error: err })
    return res.json(docs)
  })
})

app.post('/api/categories', (req, res) => {
  const data = {
    name: req.body.name,
    slug: slugify(req.body.name),
    description: req.body.description,
    banner: req.body.banner
  }

  categories.insert(data, (err, newDoc) => {
    if (err) res.status(404).json({ success: false, error: err })
    res.json(newDoc)
  })
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
