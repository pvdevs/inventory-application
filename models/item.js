const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const ItemSchema = new Schema({
  name: { type: String, required: true, maxLength: 100 },
  description: { type: String, required: true, maxLength: 100 },
  category: { type: Schema.Types.ObjectId, ref: 'Category' },
  price: { type: Number, require: true },
  numberinstock: { type: Number, required: true },
});

// Virtual for item's URL
ItemSchema.virtual('url').get(function () {
  return `/catalog/product/${this._id}`;
});

// Export model
module.exports = mongoose.model('Item', ItemSchema);
