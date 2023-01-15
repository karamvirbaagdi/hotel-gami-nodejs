const Category = require("../models/category")
const Joi = require("joi");

function validateUser(tags)
{
	const JoiSchema = Joi.object({
		name: Joi.string()
				.required(),
					
	}).options({ abortEarly: false });

	return JoiSchema.validate(tags);
} 
function slugName ($tag){
    const tagSmall = $tag.toLowerCase().replace(" ", "-");
    //const checkSlug =  tagsData.find({"Slug" => tagSmall}); 
    return tagSmall;

}
const addCategory = async(req, res)=>{

    const categoryName= req.body.name;
    const validateTag = req.body;
    const slug = slugName(categoryName);
    response = validateUser(validateTag);
    
    if(response.error)
    {
        const valdateError = response.error.details;0
        
        res.json({ message: valdateError, sucess: false });

    }
    else
    { 

        const cateData = new Category({
            Name : categoryName,
            Slug: slug,
        });

        const saveCate = await cateData.save();    

        if(saveCate){
            res.json({"Message":"Category added scussfully", status:200, response:true})
        }
    }
}
/*****List category*****/

const listCategory = async(req, res)=>{

    const categoryData = await Category.find();
    if(categoryData){
        res.json({"CategoryData": categoryData, status:200});
    }
  
}
/*************delete category******* */
const deleteCategory = async(req, res)=>{

    res.send("delete Category");
}

module.exports = {addCategory, listCategory, deleteCategory}
