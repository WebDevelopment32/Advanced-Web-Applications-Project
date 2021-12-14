const express = require('express');
const router = express.Router();

const {
    isUserAuthenticated,
    isUserRoleAuthorized
} = require('../middlewares/authenticator');

const {
    newOrder,
    getOrders,
    getOrder,
    getOrderUser,
    getOrdersRestaurant,
    deleteOrder
} = require('../controllers/orderController');

router.route('/orders').get(getOrders);
router.route('/order/:id').get(getOrder);

router.route('/user/orders').get(isUserAuthenticated, getOrderUser);
router.route('/restaurant/orders/:id').get(isUserAuthenticated, getOrdersRestaurant);

router.route('/order/delete/:id').delete(isUserAuthenticated, deleteOrder)

router.route('/order/new').post(isUserAuthenticated, isUserRoleAuthorized('user'), newOrder);

module.exports = router;