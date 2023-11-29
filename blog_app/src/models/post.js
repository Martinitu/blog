const mongoose = require('mongoose');
const Schema = mongoose.Schema

const Post = new Schema({
    title: { type: String, required: true },
    text: { type: String, required: true },
    timestamp: { type : Date, default: Date.now  },
    visible: { type: Boolean, default: true },
    user: { type: Schema.Types.ObjectId, ref: "User"},
});

Post.virtual('date').get(function() {
    return this.timestamp.toLocaleString();
  });

  // Virtual for message's URL
Post.virtual("url").get(function () {
    // We don't use an arrow function as we'll need the this object
    return `/blog/post/${this._id}`;
  });
  
  // Export model
  module.exports = mongoose.model("Post", Post);