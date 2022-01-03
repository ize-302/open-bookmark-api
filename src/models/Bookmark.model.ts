import mongoose, {
  Document,
  model,
  ObjectId,
  Schema,
  PaginateModel,
} from "mongoose";
import { config } from "dotenv";
import mongoosePaginate from "mongoose-paginate-v2";
let mongooseHidden = require("mongoose-hidden")();

config();

export interface IBookmark extends Document {
  id: ObjectId;
  title: string;
  url: string;
  created_at: Date;
  isPrivate: boolean;
  description: string;
}

// create schema and Model
const BookmarkSchema: Schema = new Schema({
  title: { type: String, required: true },
  url: { type: String, required: true },
  created_at: { type: String, required: true, default: new Date() },
  isPrivate: { type: Boolean, required: true },
  description: { type: String, required: false },
});

BookmarkSchema.plugin(mongoosePaginate);
BookmarkSchema.plugin(mongooseHidden, { hidden: { __v: true, _id: false } });
const Bookmark = model<IBookmark, PaginateModel<IBookmark>>(
  "Bookmark",
  BookmarkSchema
);

export default Bookmark;
