import { Document, model, ObjectId, Schema } from "mongoose";
import { config } from "dotenv";

config();

export interface ICategory extends Document {
  id: ObjectId;
  name: string;
  created_at: Date;
  author: string;
}

// create schema and Model
const CategorySchema: Schema = new Schema({
  name: { type: String, required: true },
  created_at: { type: String, required: true },
  author: { type: String, required: true },
});

const Category = model<ICategory>("Category", CategorySchema);

export default Category;
