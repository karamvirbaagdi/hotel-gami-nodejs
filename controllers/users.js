const users = require("../models/users");
const Joi = require("joi");

function validateUser(user)
{
	const JoiSchema = Joi.object({
	
		name: Joi.string()
				.required(),
					
		email: Joi.string()
			.email()
			.required(),
				
		password: Joi.string()
					.optional(),
						
		phone: Joi.number()
						.optional(),
	}).options({ abortEarly: false });

	return JoiSchema.validate(user);
} 

//User Register fucntion
const userRegister = async(req,res,next)=>
{
    const user = req.body;
    
    response = validateUser(user);
    
    if(response.error)
    {
        const valdateError = response.error.details;
        
        res.json({ message: valdateError, sucess: false });

    }
    else
    {
        const userName = user.name;
        const userEmail = user.email;
        const userPassword = user.password;
        const userPhone = user.phone;

        const createUser = new users({

            Name: userName,
            Email: userEmail,
            password: userPassword,
            phoneNumber: userPhone,
        });

        const saveUser = await createUser.save();

        if (saveUser) {

            res.json({ message: "User Added sucessffully", sucess: true });
        }
    }
}

const userDelete = async(req,res)=> 
{
    res.send("userdelete");

}
const userList= async(req,res)=> 
{
    
 const userData = await users.find();
 res.json({"Message":"Get all users data","data": userData});
}


module.exports = {userRegister, userDelete, userList}