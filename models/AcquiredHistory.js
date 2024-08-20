const mongoose = require('mongoose');

const AcquiredHistorySchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        match: /^[a-zA-Z0-9_.+-]+@([a-zA-Z0-9][a-zA-Z0-9-]*[a-zA-Z0-9]*\.)+[a-zA-Z]{2,}$/,
    },
    coin_id: {
        type: String,
        required: true,
    },
    acquired_amount: {
        type: Number,
        required: true,
        min: 1,
        max: 500,
    },
    status: {
        type: String,
        required: true,
        enum: ['Draft', 'Pending', 'Approved', 'Rejected', 'Reapply'],
    },
});

const AcquiredHistory = mongoose.model('AcquiredHistory', AcquiredHistorySchema);
module.exports = AcquiredHistory;