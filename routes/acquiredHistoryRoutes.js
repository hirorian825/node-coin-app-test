const express = require('express');
const app = express();

// acquiredモデルを取得
const acquiredHistoryModel = require("../models/AcquiredHistory");
app.use(express.json());

/* データ取得 */
app.get("/acquiredHistories", async(req, res) => {
    // DB.acquiredのfindAll
    const acquiredHistories = await acquiredHistoryModel.find({}); // findAllでもいい？⇒ダメみたい

    try {
        res.send(acquiredHistories);
    } catch (e) {
        res.status(500).send(e);
    }
});

/* 獲得申請 */
app.post("/acquired", async (req, res) => {
    const acquired = new acquiredHistoryModel(req.body);

    try {
        await acquired.save();
        res.send(acquired);
    } catch (e) {
        res.status(500).send(e);
    }
});

/* 獲得申請更新(パッチ) */
app.patch("/acquired/:id", async (req, res) => {
    try {
        await acquiredHistoryModel.findByIdAndUpdate(req.params.id, req.body);
        await acquiredHistoryModel.save();
    } catch (e) {
        res.status(500).send(e);
    }
});

/* 獲得申請削除(パッチ) */
app.delete("/acquired/:id", async (req, res) => {
    try {
        await acquiredHistoryModel.findByIdAndDelete(req.params.id);
    } catch (e) {
        res.status(500).send(e);
    }
});

/* 指定ユーザ累計獲得コイン数 */

module.exports = app;