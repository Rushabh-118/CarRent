import imagekit from "../config/imageKit.js";
import Car from "../Models/Car.js";
import User from "../Models/User.js";
import fs from "fs";

export const changeRoleToOwner = async (req, res) => {
  try {
    const { _id } = req.user;
    await User.findByIdAndUpdate(_id, { role: "owner" });
    res.json({
      success: true,
      message: "You are an owner now u can list cars",
    });
  } catch (error) {
    console.log(error.message);
    res.json({ success: false, message: error.message });
  }
};

export const addCar = async (req, res) => {
  try {
    const { _id } = req.user;
    let car = JSON.parse(req.body.carData);
    const imageFile = req.file;
    const fileBuffer = fs.readFileSync(imageFile.path);
    const responce = await imagekit.upload({
      file: fileBuffer,
      fileName: imageFile.originalname,
      folder: "/cars",
    });

    var imageURL = imagekit.url({
      path: responce.filePath,
      transformation: [
        {width: '1280'},
        {quality: 'auto'},
        {format: 'webp'}
      ]
    });

    const image = imageURL;
    await Car.create({...car, owner: _id, image})
    res.json({success: true, message: "Car Added"})

  } catch (error) {
    console.log(error.message);
    res.json({ success: false, message: error.message });
  }
};
