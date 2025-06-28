import mongoose from "mongoose";
const { Schema } = mongoose;

const siteSchema = new mongoose.Schema({
  id: {
    type: String,
    required: [true, "Please provide an id for the site"],
  },
  name: String,
  amenity: String,
  tourism: String,
  address: {
    street: String,
    housenumber: String,
    city: String,
    country: String,
    postcode: Number,
  },
  ratingsAverage: {
    type: Number,
    default: 0,
    // min: 1,
    // max: 5,
    // we save the value with only one decimal value
    set: (val) => Math.round(val * 10) / 10,
  },
  ratingsQuantity: {
    type: Number,
    default: 0,
  },
  geometry: {
    type: {
      type: String,
      enum: ["Point"],
      required: [true, "Please provide geometry coordinates"],
    },
    coordinates: {
      type: [Number],
      required: [true, "Please provide coordinates"],
    },
  },
  metadata: {
    type: Schema.Types.Mixed,
    default: {},
  },
});

const siteModel = mongoose.model("site", siteSchema);
export default siteModel;
