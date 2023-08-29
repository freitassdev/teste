import mongoose from "mongoose";
const userSchema = new mongoose.Schema({
 	token: {
        type: String,
        required: true,
        default: null,
    },
	userEmail: {
		type: String,
		required: true,
	},
	userPassword: {
        type: String,
        required: true,
    },
}, { collection: 'user' }
);

var User = mongoose.model('User', userSchema);
export default User;