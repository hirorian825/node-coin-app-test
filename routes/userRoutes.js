const express = require('express');
const app = express();
const cors = require('cors');

// Userモデルを取得
const userModel = require("../models/User");
app.use(express.json());
app.use(cors());

/* データ取得 */
app.get("/users", async(req, res) => {
    // DB.userのfindAll
    const user = await userModel.find({}); // findAllでもいい？⇒ダメみたい

    try {
        res.send(user);
    } catch (e) {
        res.status(500).send(e);
    }
});

/* ユーザ登録 */
app.post("/user", async (req, res) => {
    const user = new userModel(req.body);

    try {
        await user.save();
        res.send(user);
    } catch (e) {
        res.status(500).send(e);
    }
});

/* ユーザ更新(パッチ) */
app.patch("/user/:id", async (req, res) => {
    try {
        await userModel.findByIdAndUpdate(req.params.id, req.body);
        await userModel.save();
    } catch (e) {
        res.status(500).send(e);
    }
});

/* ユーザ削除(パッチ) */
app.delete("/user/:id", async (req, res) => {
    try {
        await userModel.findByIdAndDelete(req.params.id);
    } catch (e) {
        res.status(500).send(e);
    }
});

module.exports = app;