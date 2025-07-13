import User from "../Models/User.js";

export const changeRoleToOwner = async(req,res) => {
    try {
        const {_id} = req.user;
        await User.findByIdAndUpdate(_id, {role: "owner"})
        res.json({success: true, message: "You are an owner now u can list cars"})
    } catch (error) {
        console.log(error.message);
        res.json({success: false, message: error.message})
    }
}

export const addCar = async(req,res) => {
    try {
        const {_id} = req.user;
        let car = JSON.parse(req.body.carData);
        const imageFile = req.file;
        

    } catch (error) {
        console.log(error.message);
        res.json({success: false, message: error.message})
    }
}