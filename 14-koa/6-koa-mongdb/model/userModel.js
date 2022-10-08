import { model, Schema } from 'mongoose';
const UserType = {
    username:String,
    password:String,
    age:Number,
    avatar:String,
}
const userModel = model('user',new Schema(UserType))


//模型users将会对应users集合,默认加上s
export default userModel;