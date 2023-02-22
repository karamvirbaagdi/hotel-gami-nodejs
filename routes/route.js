const express = require("express");
const router = express.Router();
const multer = require("multer");
let timesetup = Date.now();
let uploadFileName = "";
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    //const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);

    uploadFileName = timesetup + "_" + file.originalname;
    //console.log("uploadFileName", uploadFileName);

    cb(null, uploadFileName);
  },
});

const upload = multer({ storage: storage });

//controllers
const userController = require("../controllers/users");
const tagsController = require("../controllers/tags");
const cateController = require("../controllers/category");
const productController = require("../controllers/product");

// define the home page route

/****************Users***/

router.post("/(:id)/user/delete/", userController.userDelete);
router.post("/user/register", userController.userRegister);
router.post("/user/list", userController.userList);
router.post("/user/login", userController.userLogin);
router.post("/user/count", userController.userCount);

/************Tags***************/

router.post("/tag/add", tagsController.addTags);
router.post("/tag/list", tagsController.listTags);
router.get("/tag/delete/(:id)", tagsController.deleteTag);
router.get("/tag/(:id)/(:slug)", tagsController.getTagsByProducts);
router.post("/tag/count", tagsController.tagsCount);

/**************Catgory**************/
router.post(
  "/category/add",
  upload.single("image"),
  cateController.addCategory
);
router.post("/category/list", cateController.listCategory);
router.post("/category/delete", cateController.deleteCategory);
router.get("/category/(:id)/(:slug)", cateController.getProductByCategory);
router.post("/category/count", cateController.categoryCount);

/**************Product**************/

router.post("/product/add", productController.addProduct);
router.post("/product/list", productController.listProduct);
router.get("/product/(:id)/(:slug)", productController.getProductBySlug);

router.post("/product/delete", productController.deleteProduct);
router.post("/product/count", productController.productCount);

module.exports = router;
