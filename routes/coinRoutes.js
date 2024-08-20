const express = require('express');
const app = express();

// coinモデルを取得
const coinModel = require("../models/Coin");
app.use(express.json());

/* データ取得 */
app.get("/coins", async(req, res) => {
    const coins = await coinModel.find({}); // findAllでもいい？⇒ダメみたい

    try {
        res.send(coins);
    } catch (e) {
        res.status(500).send(e);
    }
});

/* ユーザ登録 */
app.post("/coin", async (req, res) => {
    const coin = new coinModel(req.body);

    try {
        await coin.save();
        res.send(coin);
    } catch (e) {
        res.status(500).send(e);
    }
});

/* ユーザ更新(パッチ) */
app.patch("/coin/:id", async (req, res) => {
    try {
        await coinModel.findByIdAndUpdate(req.params.id, req.body);
        await coinModel.save();
    } catch (e) {
        res.status(500).send(e);
    }
});

/* ユーザ削除(パッチ) */
app.delete("/coin/:id", async (req, res) => {
    try {
        await coinModel.findByIdAndDelete(req.params.id);
    } catch (e) {
        res.status(500).send(e);
    }
});

module.exports = app;