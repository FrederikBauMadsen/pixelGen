const mongoose = require('mongoose');

const itemSchema = {
  name: String,
  category: String,
  content: Array
}

const Item = mongoose.model("Item", itemSchema);

module.exports = Item;
