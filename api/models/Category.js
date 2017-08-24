const mongoose = require('mongoose')
mongoose.Promise = global.Promise
const db = mongoose.connection
const Schema = mongoose.Schema

const CategorySchema = new Schema({
  name: String,
  slug: String,
  description: String,
  banner: String
})

const Category = module.exports = mongoose.model('Category', CategorySchema)

module.exports.createCategory = function(data, callback){
  data.save(callback)
}

module.exports.removeCategory = function(id, callback){
  Category.remove({ _id: id }, callback)
}

module.exports.getCategory = function(id, callback){
  Category.findOne({ _id: id }, callback)
}

module.exports.getCategories = function(callback){
  Category.find(callback)
}