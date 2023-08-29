import crypto from "crypto";
import User from "../schemas/User";
class Service {
    constructor(email, senha, token) {
        this.email = email,
            this.token = token,
            this.senha = senha
    }
    getUserInfo(usertoken) {
        User.findOne({ token: usertoken }).then((result) => {
            return result;
        })
    }
    verifyPassword(usertoken, userpass) {
        const psswhash = crypto.createHash('md5').update(userpass).digest('hex');
        User.findOne({ token: usertoken }).then((result) => {
            if (psswhash == result.userPassword) {
                return true;
            } else {
                return false;
            }
        })
    }
    verifyIfExists(useremail) {
        User.exists({ userEmail: useremail }).then(exists => {
            if (exists) {
                return true
            } else {
                return false
            }
        });
    }
}