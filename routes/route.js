const express = require('express')
const router = express.Router();
//controllers
const userController = require("../controllers/users");
const tagsController = require("../controllers/tags");


// define the home page route

/****************Users***/

router.post('/user/delete/', userController.userDelete);
router.post('/user/register', userController.userRegister);
router.get('/user/list', userController.userList);

/************Tags***************/

router.post('/tag/add', tagsController.addTags);
router.post('/tag/list', tagsController.listTags);

module.exports = router;