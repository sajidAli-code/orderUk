const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true,
    },
    sessionId: {
        type: String,
        required: true
    },
    productList: [
    ],
    shippingAddress: {
        type: Object,
        required: true
    },
    orderStatus: {
        type: String,
        required: true,
        default: 'Placed'
    },
    orderNumber: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('order', orderSchema);