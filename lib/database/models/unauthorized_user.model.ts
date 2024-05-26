import { Schema, model, models } from "mongoose";
import { User, UserSchema } from "./user.model";

export interface UnauthorizedUser extends User {}

const UnauthorizedUserSchema = new Schema({
    ...UserSchema.obj,
})

const UnauthorizedUser = models.UnauthorizedUser || model('UnauthorizedUser', UnauthorizedUserSchema);

export default UnauthorizedUser;