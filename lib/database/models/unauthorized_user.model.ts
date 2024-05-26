import { Schema, model, models } from "mongoose";
import { UserSchema } from "./user.model";

const UnauthorizedUserSchema = new Schema({
    ...UserSchema.obj,
})

const UnauthorizedUser = models.UnauthorizedUser || model('UnauthorizedUser', UnauthorizedUserSchema);

export default UnauthorizedUser;