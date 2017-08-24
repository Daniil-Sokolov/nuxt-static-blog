const express = require('express'),
    bodyParser = require('body-parser'),
    mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/blog', { useMongoClient: true })
const db = mongoose.connection
mongoose.Promise = global.Promise

const multer = require('multer')
const upload = multer({ dest: './public/uploads/' })


const Post = require('./models/Post')
const Category = require('./models/Category')

const app = express()

const path = require('path')

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use(express.static(path.join(__dirname, 'public')));

app.post('/api/posts', (req, res) => {

  const data = new Post({
    title: req.body.title,
    slug: slugify(req.body.title),
    subtitle: req.body.subtitle,
    category: req.body.category,
    published: req.body.published,
    sections: req.body.sections,
  })

  Post.createPost(data, (err, response) => {
    if(err) return res.status(404).json({ success: false, message: err})
    return res.json(response)
  })
})

app.get('/api/categories', (req, res) => {

  Category.getCategories((err, response) => {
    if(err) return res.status(404).json({ success: false, message: err})
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
    if(err) return res.status(404).json({ success: false, message: err})
    return res.json(response)
  })

})

app.get('/api/posts', (req, res) => {
  Post.getPosts(function(err, response){
    if(err) return res.status(404).json({ success: false, message: err})
    res.json(response)
  })
})

app.get('/api/posts/:slug', (req, res) => {
  Post.getPostBySlug(req.params.slug, function(err, response){
    if(err) throw err;
    res.json(response)
  })
})

app.post('/api/image', upload.array('image'), (req, res) => {
  res.json({ filename: req.files[0].filename })
})

function slugify(s){
  if(!typeof s === "string") return s
  return s.toLowerCase().replace(/[^\w\s]/gi, '').replace(/\s/g, "-")
}

app.listen(3001)
console.log('Listening on port 3001...')
