const express = require('express');
const { route } = require('express/lib/application');
const router = express.Router();
const allController = require('../controller/allcontroller');

router.get('/', allController.OrderList); // HOMEPAGE
router.post('/orders/create', allController.InsertOrder);
router.get('/orders/update', allController.UpdateOrder);
router.get('/orders/search', allController.SearchOrder);
router.get('/orders/delete', allController.DeleteOrder);
router.get('/orders/list', allController.OrderList);


module.exports = router;
