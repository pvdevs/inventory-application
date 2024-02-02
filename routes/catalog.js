const express = require('express');
const router = express.Router();

// Require controller modules.
const item_controller = require('../controllers/itemController');
const category_controller = require('../controllers/categoryController');

/// ITEM ROUTES ///

// GET catalog home page.
router.get('/', item_controller.index);

// GET request for creating an Item.
router.get('/item/create', item_controller.item_create_get);

// POST request for creating Book.
router.post('/item/create', item_controller.item_create_post);

// GET request to delete an Item.
router.get('/item/:id/delete', item_controller.item_delete_get);

// POST request to delete an Item.
router.post('/item/:id/delete', item_controller.item_delete_post);

// GET request to update an Item.
router.get('/item/:id/update', item_controller.item_update_get);

// POST request to update an Item.
router.post('/item/:id/update', item_controller.item_update_post);

// GET request for one Item.
router.get('/item/:id', item_controller.item_detail);

// GET request for list of all Items.
router.get('/items', item_controller.items_list);
