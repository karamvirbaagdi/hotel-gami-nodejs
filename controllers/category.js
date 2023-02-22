const Category = require("../models/category");
const Joi = require("joi");
const ProductsData = require("../models/product");

function validateUser(tags) {
  const JoiSchema = Joi.object({
    name: Joi.string().required(),
  }).options({ abortEarly: false });

  return JoiSchema.validate(tags);
}
function slugName($tag) {
  const tagSmall = $tag.toLowerCase().replace(" ", "-");
  //const checkSlug =  tagsData.find({"Slug" => tagSmall});
  return tagSmall;
}
const addCategory = async (req, res) => {
  const categoryName = req.body.name;
  const validateTag = req.body;
  const imageName = req.file.filename;
  const slug = slugName(categoryName);
  response = validateUser(validateTag);

  if (response.error) {
    const valdateError = response.error.details;
    0;

    res.json({ message: valdateError, sucess: false });
  } else {
    const cateData = new Category({
      Name: categoryName,
      Slug: slug,
      Image: imageName,
    });

    const saveCate = await cateData.save();

    if (saveCate) {
      res.json({
        Message: "Category added scussfully",
        status: 200,
        response: true,
      });
    }
  }
};
/*****List category*****/

const listCategory = async (req, res) => {
  const categoryData = await Category.find();
  if (categoryData) {
    res.json({ data: categoryData, status: 200 });
  }
};
/*************delete category******* */
const getProductByCategory = async (req, res) => {
  const cateId = req.params.id;
  const cateSlug = req.params.slug;

  if (cateId != "" && cateSlug != "") {
    try {
      const category = await Category.find({ Slug: cateSlug, _id: cateId });

      if (category != "") {
        const allProducts = await ProductsData.find({ Categories: cateId });
        if (allProducts !== "") {
          res.json({
            Data: allProducts,
            status: 200,
          });
        } else {
          res.json({ Message: "No products found", status: 400 });
        }
      } else {
        res.json({
          Message: "Please check the category Id and slug again.",
          status: 400,
        });
      }
    } catch (e) {
      console.log(e);
    }
  } else {
    res.json({
      Message: "Please check the tag slug and tag id again.",
      status: 400,
    });
  }
};
const categoryCount = async (req, res) => {
  try {
    const userData = await Category.count();
    if (userData) {
      res.json({ status: 200, data: userData });
    } else {
      res.json({ status: 400 });
    }
  } catch (e) {
    res.json({ status: 400 });
  }
};

const deleteCategory = async (req, res) => {
  res.send("delete Category");
};
module.exports = {
  addCategory,
  listCategory,
  deleteCategory,
  getProductByCategory,
  categoryCount,
};
