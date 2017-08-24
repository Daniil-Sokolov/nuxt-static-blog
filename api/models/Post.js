const mongoose = require('mongoose')
mongoose.Promise = global.Promise
const db = mongoose.connection
const Schema = mongoose.Schema

const PostSchema = new Schema({
  title: String,
  slug: String,
  subtitle: String,
  created: { type: Date, default: Date.now },
  category: { type: Schema.ObjectId, ref: 'Category' },
  published: Boolean,
  sections: [{ width: String, content: String }],
  stars: { type: Number, default: 0 }
})

const Post = module.exports = mongoose.model('Post', PostSchema)

module.exports.createPost = function(data, callback){
  data.save(callback)
}

module.exports.removePost = function(id, callback){
  Post.remove({ _id: id }, callback)
}

module.exports.starPostById = function(id, callback){
  Post.findOneAndUpdate({ _id: id }, { $inc: { stars:1 } }, callback);
}

module.exports.getPostBySlug = function(slug, callback){
  Post.findOne({ slug: slug, published: true })
    .populate("category")
    .exec(callback)
}

module.exports.getPosts = function(callback){
  Post.find({  })
    .populate("category")
    .exec(callback)
}