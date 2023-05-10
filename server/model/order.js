const mongoose = require('mongoose');

const allOrder = new mongoose.Schema({
    order_id:{
        type: Number
    },
    item_name:{
        type: String
    },
    cost:{
        type: Number
    }, 
    order_date:{
        type: String,
    },
    delivery_date:{
        type: String,
    }
});

module.exports = mongoose.model('allorder', allOrder, 'allorder');