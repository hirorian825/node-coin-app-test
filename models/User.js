const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    // name: {
    //     type: String,
    //     default: "名無しさん",
    //     validate(value) {
    //         if (value.length > 20) throw new Error("ユーザ名は２０文字以下で設定してください。");  
    //     },
    // },
    email: {
        type: String,
        required: true,
        unique: true,
        match: /^[a-zA-Z0-9_.+-]+@([a-zA-Z0-9][a-zA-Z0-9-]*[a-zA-Z0-9]*\.)+[a-zA-Z]{2,}$/,
    }
});

const User = mongoose.model('User', UserSchema);
module.exports = User; // ほかのファイルからも呼び出せるようにエクスポート