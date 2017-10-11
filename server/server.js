const { Nuxt, Builder } = require('nuxt')
const bodyParser = require('body-parser')
const app = require('express')()

const Datastore = require('nedb')
let db = {}
db.categories = new Datastore({ filename: './server/data/categories', autoload: true })
db.posts = new Datastore({ filename: './server/data/posts', autoload: true })

app.use(bodyParser.json())

app.get('/api/posts', (req, res) => {
  db.posts.find({}).sort({ created: 1 }).exec((err, docs) => {
    if (err) return res.status(404).json({ success: false, error: err })
    return res.json(docs)
  })
})

app.post('/api/posts', (req, res) => {
  const data = {
    title: req.body.title,
    slug: req.body.slug,
    created: new Date(),
    subtitle: req.body.subtitle,
    category: req.body.category,
    published: req.body.published,
    sections: req.body.sections
  }

  db.posts.insert(data, (err, newDoc) => {
    if (err) res.status(404).json({ success: false, error: err })
    res.json(newDoc)
  })
})

const getter = (db, query) => {
  return new Promise((resolve, reject) => {
    db.find(query, (err, res) => {
      if (err) return reject(err)
      return resolve(res)
    })
  })
}

app.get('/api/routes', async(req, res) => {
  try {
    const posts = await getter(db.posts, {})
    let routes = []
    for (let index in posts) {
      let category = await getter(db.categories, { _id: posts[index].category })
      category = category[0] // should use findOne instead ?
      if (routes.indexOf(category.slug === -1)) {
        routes.push('/blog/' + category.slug)
      }
      routes.push(`/blog/${category.slug}/${posts[index].slug}`)
    }
    res.json(routes)
  } catch (e) {
    console.log('failed to get routes:', e)
    res.status(404).json([])
  }
})

app.get('/api/categories', (req, res) => {
  db.categories.find({}, (err, docs) => {
    if (err) return res.status(404).json({ success: false, error: err })
    return res.json(docs)
  })
})

app.post('/api/categories', (req, res) => {
  const data = {
    name: req.body.name,
    slug: req.body.slug,
    description: req.body.description,
    banner: req.body.banner
  }

  db.categories.insert(data, (err, newDoc) => {
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
