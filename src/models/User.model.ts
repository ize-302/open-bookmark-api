import { Document, model, ObjectId, Schema, PaginateModel } from "mongoose";
import { config } from "dotenv";
import mongoosePaginate from "mongoose-paginate-v2";

config();

export interface IUser extends Document {
  id: ObjectId;
  avatar_url: string;
  full_name: string;
  email: string;
  sub: string;
  joined: Date;
  following: Array<string>;
  followers: Array<string>;
}

// create schema and Model
const UserSchema: Schema = new Schema({
  avatar_url: { type: String, required: true },
  full_name: { type: String, required: true },
  email: { type: String, required: true },
  sub: { type: String, required: true },
  joined: { type: String, required: true },
  following: { type: Array, required: false },
  followers: { type: Array, required: true },
});

UserSchema.plugin(mongoosePaginate);
const User = model<IUser, PaginateModel<IUser>>(
  "User",
  UserSchema
);

// const User = model<IUser>("User", UserSchema);

export default User;
