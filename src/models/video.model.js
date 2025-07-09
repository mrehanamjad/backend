import mongoose, { Schema } from "mongoose";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";

const videoSchema = new Schema(
  {
    title: {
      type: String,
      required: [true, "Title is required"],
    },
    description: {
      type: String,
      required: [true, "Description is required"],
    },
    duration: {
      type: Number, // Cloudinary 
      required: [true, "Duration is required"],
    },
    views: {
      type: Number,
      required: [true, "Views count is required"],
    },
    isPublished: {
      type: Boolean,
      required: [true, "Publish status is required"],
    },
    thumbnail: { // Cloudinary 
      type: String,
      required: [true, "Thumbnail URL is required"],
    },
    videoFile: { // Cloudinary 
      type: String,
      required: [true, "Video file URL is required"],
    },
    owner: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: [true, "Owner (user) is required"],
    },
  },
  { timestamps: true }
);

videoSchema.plugin(mongooseAggregatePaginate)

export const Video = mongoose.model("Video", videoSchema);
