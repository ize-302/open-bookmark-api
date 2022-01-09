import mongoose, {
  Document,
  model,
  ObjectId,
  Schema,
  PaginateModel,
} from "mongoose";
import { config } from "dotenv";
import mongoosePaginate from "mongoose-paginate-v2";

config();

export interface IBookmark extends Document {
  id: ObjectId;
  title: string;
  url: string;
  created_at: Date;
  isPrivate: boolean;
  comment: string;
  isTrashed: boolean;
  author: string;
}

// create schema and Model
const BookmarkSchema: Schema = new Schema({
  title: { type: String, required: true },
  url: { type: String, required: true },
  created_at: { type: String, required: true },
  isPrivate: { type: Boolean, required: true, default: false },
  comment: { type: String, required: false },
  isTrashed: { type: Boolean, required: false, default: false },
  author: { type: String, required: true },
});

BookmarkSchema.plugin(mongoosePaginate);
const Bookmark = model<IBookmark, PaginateModel<IBookmark>>(
  "Bookmark",
  BookmarkSchema
);

export default Bookmark;
