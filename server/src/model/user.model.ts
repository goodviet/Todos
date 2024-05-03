// models/User.ts

import mongoose, { Schema, Document } from 'mongoose';

export interface UserDocument extends Document {
    
    name: string;
    description: string;
}

const UserSchema: Schema = new Schema({
    name: { type: String, default: '' },
    description:{type:String, default:''},
});

const UserModel = mongoose.model<UserDocument>('User', UserSchema);

export default UserModel;
