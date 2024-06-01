import mongoose, { Schema, models } from "mongoose";

const postSchema = new Schema(
  {
    imgUrl: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    likes: [
      {
        type: Schema.Types.ObjectId,
        ref: 'User'
      }
    ],
    createdAt: {
      type: Date,
      default: Date.now,
    },
  }
);

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    profileImg: {
      type: String,
    },
    posts: [postSchema],
    saved: [
      {
        type: Schema.Types.ObjectId,
        ref: 'User'
      }
    ],
    no_of_posts: {
      type: Number,
      default: 0,
    },
    savedby: [
      {
        type: Schema.Types.ObjectId,
        ref: 'User'
      }
    ],
    following:[
      {
        type: Schema.Types.ObjectId,
        ref: 'User'
      }
    ],
    followedby: [
      {
        type: Schema.Types.ObjectId,
        ref: 'User'
      }
    ],
  },
  { timestamps: true }
);

const User = models.user || mongoose.model("user", userSchema);
export default User;
