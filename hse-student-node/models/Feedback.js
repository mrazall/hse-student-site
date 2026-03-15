const mongoose = require("mongoose");

const feedbackSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true
    },
    email: {
      type: String,
      required: true,
      trim: true
    },
    phone: {
      type: String,
      default: ""
    },
    date: {
      type: String,
      default: ""
    },
    topic: {
      type: String,
      required: true,
      trim: true
    },
    channel: {
      type: String,
      required: true,
      trim: true
    },
    time: {
      type: String,
      default: ""
    },
    message: {
      type: String,
      required: true,
      trim: true
    },
    agree: {
      type: Boolean,
      default: false
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("Feedback", feedbackSchema);