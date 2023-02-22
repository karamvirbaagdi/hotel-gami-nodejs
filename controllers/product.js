const Product = require("../models/product");
const Joi = require("joi");
const Tags = require("../models/tags");
const Category = require("../models/category");

function validateUser(tags) {
  const JoiSchema = Joi.object({
    Title: Joi.string().required(),
    Description: Joi.string(),
    Sku: Joi.number(),
    Categories: Joi.string(),
    Tags: Joi.string(),
    Image: Joi.string(),
    Price: Joi.number(),
  }).options({ abortEarly: false });

  return JoiSchema.validate(tags);
}

const addProduct = async (req, res) => {
  function slugName(tag) {
    const tagSmall = tag.toLowerCase().replace(/\s+/g, "-");

    return tagSmall;
  }

  const ProductData = req.body;
  response = validateUser(ProductData);

  if (response.error) {
    const valdateError = response.error.details;

    res.json({ message: valdateError, sucess: false, status: 400 });
  } else {
    const slug = ProductData.Title;
    const slugNameNew = await slugName(slug);
    const productDataSave = new Product({
      Title: ProductData.Title,
      Slug: slugNameNew,
      Description: ProductData.Description,
      Sku: ProductData.Sku,
      Categories: ProductData.Categories,
      Tags: ProductData.Tags,
      Image: ProductData.Image,
      Price: ProductData.Price,
    });

    const saveProduct = await productDataSave.save();
    if (saveProduct) {
      res.json({ message: "Product Saved", status: 200 });
    }
  }
};

const listProduct = async (req, res) => {
  const listProductData = await Product.find();
  if (listProductData) {
    res.json({ data: listProductData, status: 200 });
  }
};

const getProductBySlug = async (req, res) => {
  const slug = req.params.slug;
  const proId = req.params.id;

  try {
    const productData = await Product.find({ Slug: slug, _id: proId })
      .populate("Tags")
      .populate("Categories")
      .exec();
    if (productData.length == 0) {
      res.json({
        Message: "Product not found, Please check your url again.",
        status: 400,
      });
    } else {
      res.json({ data: productData, status: 200 });
    }
    ////const ujjjj = await Product.aggregate([  { $match: { Slug: slug } } ]);
  } catch (e) {
    console.log("Error", e);
  }
};
const productCount = async (req, res) => {
  try {
    const userData = await Product.count();
    if (userData) {
      res.json({ status: 200, data: userData });
    } else {
      res.json({ status: 400 });
    }
  } catch (e) {
    res.json({ status: 400 });
  }
};

const deleteProduct = async (req, res) => {};

module.exports = {
  addProduct,
  listProduct,
  deleteProduct,
  getProductBySlug,
  productCount,
};
