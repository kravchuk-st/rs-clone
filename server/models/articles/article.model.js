const mongoose = require('mongoose');

const { Schema } = mongoose;

const ArticleSchema = new Schema({
  postedAt: Date,
  title: String,
  category: [String],
  summary: String,
  body: [String],
  image: String,
  relevantRecipes: [Number],
});

const Article = mongoose.model('articles', ArticleSchema);

module.exports = Article;
