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


const addTags = async(req,res) =>{

    const tags = req.body;

    response = validateUser(tags);
    
    if(response.error)
    {
        const valdateError = response.error.details;0
        
        res.json({ message: valdateError, sucess: false });

    }
    else
    { 

        const tagsData = new Tags({
            Name : "car",
            Slug: "carhere"
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

    module.exports = {addTags, listTags}