const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema.Types;

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  pic: {
    type: String,
    default: "https://res.cloudinary.com/dngusdtwg/image/upload/v1593597762/noImage_lqvamb.png"
  },
  followers: [{ type: ObjectId, ref: "User" }],
  following: [{ type: ObjectId, ref: "user" }]
});

mongoose.model("User", userSchema);
