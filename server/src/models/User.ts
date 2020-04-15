import { Schema, model, Document, Model } from "mongoose";

export enum AuthMethods {
  google = "google",
}

export interface IUser extends Document {
  method: AuthMethods;
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  google?: {
    googleId: string;
    email: string;
  };
}

export interface UserModel extends Model<IUser> {}

export class User {
  private _model: Model<IUser>;

  constructor() {
    const UserSchema: Schema = new Schema({
      method: {
        type: String,
        enum: ["google"],
        required: true,
      },
      google: {
        googleId: {
          type: String,
        },
        email: {
          type: String,
          required: true,
          unique: true,
          lowercase: true,
        },
      },
      firstName: { type: String, required: true },
      lastName: { type: String, required: true },
    });

    this._model = model<IUser>("User", UserSchema);
  }

  public get model(): Model<IUser> {
    return this._model;
  }
}
