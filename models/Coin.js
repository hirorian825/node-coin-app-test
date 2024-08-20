const mongoose =  require('mongoose');
const { validate } = require('./User');

const CoinSchema = new mongoose.Schema({
    coin_name: {
        type: String,
        unique: true,
        validate(value) {
            if (value.length > 100) throw new Error("項目名は100文字以下で設定してください。");  
        }
    },
    amount: {
        type: Number,
        validate(value) {
            if (value > 500) throw new Error("コイン数は500以下で設定してください。");  
        }
    },
});

const Coin = mongoose.model('Coin', CoinSchema);
module.exports = Coin;