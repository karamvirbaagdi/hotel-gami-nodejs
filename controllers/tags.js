const Tags = require("../models/tags");
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


const addTags = async(req,res) =>{

    const tags = req.body.name;
    const validateTag = req.body;
    const slug = slugName(tags);
    response = validateUser(validateTag);
    
    if(response.error)
    {
        const valdateError = response.error.details;0
        
        res.json({ message: valdateError, sucess: false });

    }
    else
    { 

        const tagsData = new Tags({
            Name : tags,
            Slug: slug,
        });

        const saveTag = await tagsData.save();    

        if(saveTag){
            res.json({"Message":"Tags added scussfully", status:200, response:true})
        }
    }

}

const listTags = async(req,res) =>{

    const tagData = await Tags.find();
     res.json({"data":tagData,"message":"data"});
}
    
const deleteTag = async(req,res) =>{

    const removeTagId = req.params.id;
    try{
        const checkTagId = await Tags.find({_id: removeTagId});    


        if(checkTagId !== "undefined"){
            const deleteTagCheck = await Tags.remove({_id:removeTagId});
            if(deleteTagCheck){
                    res.json({"Message": "Recorde Delete Sucessfully.", status:200});
            }else{
    
                res.json({"Message": "Recorde not Deleted.", status:400 })
            }
    
        }else{
    
            res.json({"Message": "Tag not found please check your id again.", status:400});
        }
       

    }
    catch(e){
        console.log(e)
    }


}

    module.exports = {addTags, listTags, deleteTag}