import { Schema} from "mongoose";

export type CreateUserParams = {
  clerkId: string
  firstName: string
  lastName: string
  email: string
  photo: string
}

export interface User {
  _id: string
  clerkId: string
  email: string
  firstName: string
  lastName: string
  photo: string
  lastSignInAt: Date
  joinedAt: Date
}

export const UserSchema = new Schema({
  clerkId: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  firstName: { type: String, required: true },
  lastName: {type: String, required: true },
  photo: { type: String, required: true },
  lastSignedInAt: {type: Date, default: Date.now()},
  joinedAt: {type: Date, default: Date.now()}
})
