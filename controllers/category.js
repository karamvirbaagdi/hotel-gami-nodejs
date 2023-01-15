const Category = require("../models/category")

const addCategory = async(req, res)=>{

    res.send("Add category");
}
/*****List category*****/

const listCategory = async(req, res)=>{

    res.send("List of all category");
}
/*************delete category******* */
const deleteCategory = async(req, res)=>{

    res.send("delete Category");
}

module.exports = {addCategory, listCategory, deleteCategory}
