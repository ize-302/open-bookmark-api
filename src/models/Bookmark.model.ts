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
  is_private: boolean;
  description: string;
  is_trashed: boolean;
  author: string;
  category: string;
}

// create schema and Model
const BookmarkSchema: Schema = new Schema({
  title: { type: String, required: true },
  url: { type: String, required: true },
  created_at: { type: String, required: true },
  is_private: { type: Boolean, required: true, default: false },
  description: { type: String, required: false },
  is_trashed: { type: Boolean, required: false, default: false },
  author: { type: String, required: true },
  category: { type: String, required: false },
});

BookmarkSchema.plugin(mongoosePaginate);
const Bookmark = model<IBookmark, PaginateModel<IBookmark>>(
  "Bookmark",
  BookmarkSchema
);

export default Bookmark;
