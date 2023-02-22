const Tags = require("../models/tags");
const Joi = require("joi");
const ProductsData = require("../models/product");

function validateTag(tags) {
  const JoiSchema = Joi.object({
    name: Joi.string().required(),
  }).options({ abortEarly: false });

  return JoiSchema.validate(tags);
}
function slugName(tag) {
  const tagSmall = tag.toLocaleLowerCase().replace(/\s+/g, "-");
  //const withSpace = $tag.replace(/\s+/g, "-");
  //console.log("withSpace", withSpace);
  return tagSmall;
}

const addTags = async (req, res) => {
  const tags = req.body.name;
  response = validateTag(req.body);
  const slug = slugName(tags);
  if (response.error) {
    const valdateError = response.error.details;

    res.json({ message: valdateError, sucess: false });
  } else {
    const tagsData = new Tags({
      Name: tags,
      Slug: slug,
    });

    const saveTag = await tagsData.save();

    if (saveTag) {
      res.json({
        Message: "Tags added scussfully",
        status: 200,
        response: true,
      });
    }
  }
};

const listTags = async (req, res) => {
  const tagData = await Tags.find();
  res.json({ data: tagData, message: "data" });
};
const getTagsByProducts = async (req, res) => {
  const tagId = req.params.id;
  const tagSlug = req.params.slug;

  if (tagId != "" && tagSlug != "") {
    const allProducts = await ProductsData.find({ Tags: tagId });
    res.json({
      Data: allProducts,
      status: 200,
    });
  } else {
    res.json({
      Message: "Please check the tag slug and tag id again.",
      status: 400,
    });
  }
};
const deleteTag = async (req, res) => {
  const removeTagId = req.params.id;
  try {
    const checkTagId = await Tags.find({ _id: removeTagId });

    if (checkTagId !== "undefined") {
      const deleteTagCheck = await Tags.remove({ _id: removeTagId });
      if (deleteTagCheck) {
        res.json({ Message: "Recorde Delete Sucessfully.", status: 200 });
      } else {
        res.json({ Message: "Recorde not Deleted.", status: 400 });
      }
    } else {
      res.json({
        Message: "Tag not found please check your id again.",
        status: 400,
      });
    }
  } catch (e) {
    console.log(e);
  }
};

const tagsCount = async (req, res) => {
  const userData = await Tags.count();

  res.json({ status: 200, data: userData });
};

module.exports = { addTags, listTags, deleteTag, getTagsByProducts, tagsCount };
