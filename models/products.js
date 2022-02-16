import mongoose from "mongoose";
import { Schema } from "mongoose";
import Joi from "joi";

const productSchema = new Schema(
  {
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
      default: 0,
    },
    brand: {
      type: String,
      required: true,
    },
    rating: {
      type: String,
      required: true,
      default: 0,
    },
    numReviews: {
      type: Number,
      required: true,
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
      unique: true,
    },
  },
  { timestamps: true }
);

const validate = (product) => {
  return Joi.object({
    name: Joi.string().min(3).trim().required(),
    category: Joi.string().trim().required(),
    price: Joi.number().trim().required(),
    brand: Joi.string().trim().required(),
    rating: Joi.number().trim().required(),
    numReviews: Joi.number().trim().required(),
    countInStock: Joi.number().trim().required(),
    description: Joi.string().trim().required(),
  }).schema(product);
};

const Product =
  mongoose.models.Product || mongoose.model("Product", productSchema);

export const Validate = validate;
export default Product;
