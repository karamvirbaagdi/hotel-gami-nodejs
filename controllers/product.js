const Product = require("../models/product");

const addProduct = async(req, res)=>{

    res.send("Add Product");
}

const listProduct = async(req, res)=>{

    res.send("List Products");
}

const deleteProduct = async(req, res)=>{

    res.send("delete the Product");
}

module.exports = {addProduct, listProduct, deleteProduct} ;