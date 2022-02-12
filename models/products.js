import mongoose from "mongoose";
import { Schema } from "mongoose";
import Joi from "joi";

const productSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  image: {
    type: Object,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  brand: {
    type: String,
    required: true,
  },
  rating: {
    type: String,
    default: 0,
  },
  numReviews: {
    type: Number,
    default: 0,
  },
  countInStock: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  slug: {
    type: String,
    required: true,
  },
});

const validate = (product) => {
  return Joi.object({
    name: Joi.string().min(3).trim().required(),
    category: Joi.string().trim().required(),
    price: Joi.number().trim().required(),
    brand: Joi.string().trim().required(),
    rating: Joi.optional(),
    numReviews: Joi.optional(),
    countInStock: Joi.number().trim().required(),
    description: Joi.string().trim().required(),
  }).schema(product);
};

console.log("mongoose models", mongoose.models);
exports.Product =
  mongoose.models.Product || mongoose.model("Product", productSchema);

exports.Validate = validate;
