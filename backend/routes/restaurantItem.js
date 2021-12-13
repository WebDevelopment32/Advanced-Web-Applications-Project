const express = require('express');
const router = express.Router();

// Import item controller methods
const {
    newItem,
    getItems,
    getItem,
    uploadImage,
    updateItem,
    deleteItem
} = require('../controllers/restaurantItemController');

router.route('/items').get(getItems);
router.route('/item/:id').get(getItem);

router.route('/item/new').post(newItem);
router.route('/item/uploadimg/:id').put(uploadImage);
router.route('/item/update/:id').put(updateItem);

router.route('/item/delete/:id').delete(deleteItem);

module.exports = router;