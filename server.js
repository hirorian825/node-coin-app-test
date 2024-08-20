const express = require('express');
const app = express();
const mongoose = require('mongoose');
const path = require('path');
require('dotenv').config();

const userRouter = require("./routes/userRoutes");
const coinRouter = require("./routes/coinRoutes");
const acquiredHistoryRouter = require("./routes/acquiredHistoryRoutes");
app.use(userRouter);
app.use(coinRouter);
app.use(acquiredHistoryRouter);

// 静的ファイル（HTML、CSS、JSなど）の提供
app.use(express.static(path.join(__dirname, '/')));

// ルートURLにアクセスがあった場合、index.htmlを返す
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// ルートURLにアクセスがあった場合、index.htmlを返す
app.get('/approve', (req, res) => {
    res.sendFile(path.join(__dirname, 'approve.html'));
});

/**
 * データベース接続
 */
mongoose.connect(
    "mongodb+srv://hirorian825:" + process.env.MONGDBPW + "@cluster0.remio.mongodb.net/testMGDB?retryWrites=true&w=majority&appName=Cluster0"
).then(() => console.log("DB接続=成功="))
.catch((e) => console.log(e));


// port=3000でサーバ構築
app.listen(process.env.PORT || 3000, () => {
    console.log("サーバが起動しました");
});