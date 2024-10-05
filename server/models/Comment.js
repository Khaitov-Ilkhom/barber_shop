const mongoose = require("mongoose");

const Comment = mongoose.Schema({
  barber: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  client: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  message: { type: String},
  rating: {
    type: Number,
    required: true
  },
  date: {
    type: String,
    required: true
  }
})

module.exports = mongoose.model("Comment", Comment)