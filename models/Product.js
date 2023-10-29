const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
  vendorId: { type: String, required: true },
  title: { type: String, required: true },
  units: { type: Number, required: true, default: 1 },
  description: { type: String },
  status: { type: Boolean, default: false },
  category: { type: String, required: true },
  tags: { type: Array },
  images: { type: Array },
  featureImage: { type: String },
});

module.exports = mongoose.model('Product', ProductSchema);
