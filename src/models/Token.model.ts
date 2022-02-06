import { Document, model, ObjectId, Schema } from "mongoose";
import { config } from "dotenv";

config();

export interface IToken extends Document {
  id: ObjectId;
  user: string;
  created_at: Date;
  expires_at: Date;
  token: string;
}

// create schema and Model
const TokenSchema: Schema = new Schema({
  user: { type: String, required: true },
  expires_at: { type: String, required: true },
  created_at: { type: String, required: true },
  token: { type: String, required: false },
});

const Token = model<IToken>("Token", TokenSchema);

export default Token;
