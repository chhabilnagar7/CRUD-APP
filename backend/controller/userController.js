import User from "../model/userModel.js";

// Creating APIs

export const create = async(req,res)=>{
    try{

        const userData = new User(req.body);

        if(!userData){
            return res.status(404).json({msg: "User data not found"});
        }

        // if user found then save it

        const savedData = await userData.save();

        res.status(200).json({msg: "User created successfully"});
    }catch (error) {
        res.status(500).json({error: error});
    }
}

export const getAll = async(req,res) =>{
    try{

        // fetching all data from user

        const userData = await User.find();
        if(!userData){
            return res.status(404).json({msg:"User data not found"});
        }

        res.status(200).json({userData});

    }catch(error){
        res.status(500).json({error: error});
    }
}


// if we've to fetch single data by using specific name or by id 

export const getOne = async(req,res) => {
    try{

        const id = req.params.id;
        const userExist = await User.findById(id);
        if(!userExist){
            return res.status(404).json({msg: "User not found"});
        }
        res.status(200).json(userExist);

    }catch (error){
        res.status(500).json({error:error});
    }
}


export const update = async(req,res)=>{
    try{
        // here we get the id 
        const id = req.params.id;

        const userExist = await User.findById(id);
        if(!userExist){
            return res.status(401).json({msg:"User not found"});
        }
        // this will going to return the update dataa
        const updatedData = await User.findByIdAndUpdate(id, req.body, {new:true});
       
        res.status(200).json({msg:"User updated successfully"});
        
    } catch (error) {
        res.status(500).json({error: error});
    }
}


export const deleteUser = async(req,res)=>{

    try {
        
        const id = req.params.id;
        const userExist = await User.findById(id);
        if(!userExist){
            return res.status(404).json({msg: "User not exist"});
        }
        // delete data by using id
        await User.findByIdAndDelete(id);

        res.status(200).json({msg: "User deleted successfully"});
    } catch (error) {
        res.status(500).json({error: error});
    }

}