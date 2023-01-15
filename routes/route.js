const express = require('express')
const router = express.Router();
//controllers
const userController = require("../controllers/users");
const tagsController = require("../controllers/tags");
const cateController = require("../controllers/category");
const productController = require("../controllers/product");


// define the home page route

/****************Users***/

router.post('/user/delete/', userController.userDelete);
router.post('/user/register', userController.userRegister);
router.get('/user/list', userController.userList);

/************Tags***************/

router.post('/tag/add', tagsController.addTags);
router.post('/tag/list', tagsController.listTags);
router.get('/tag/delete/(:id)', tagsController.deleteTag);

/**************Catgory**************/
router.post('/category/add', cateController.addCategory);
router.get('/category/list', cateController.listCategory);
router.post("/category/delete", cateController.deleteCategory);

/**************Product**************/

router.post('/product/add', productController.addProduct);
router.get('/product/list', productController.listProduct);
router.post("/product/delete", productController.deleteProduct);


module.exports = router;