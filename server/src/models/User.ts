import mongoose, { Schema } from "mongoose";
import { IUser } from "./interfaces";

const UserSchema: Schema = new Schema({
  email: { type: String, required: true, unique: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
});

export default mongoose.model<IUser>("User", UserSchema);
