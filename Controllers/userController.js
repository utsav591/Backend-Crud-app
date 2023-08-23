
import User from "../models/useModel.js"
import asyncHandler from "express-async-handler";

const getUsers = asyncHandler(async (req, res) => {
  try {
    
    const users = await User.find(
      req.query.name
        ? {
            name: {
              $regex: req.query.name,
              $options: "i",
            },
          }
        : {}
    );
    res.status(200).json({ code: 200, remark: "success", data: users });
  } catch (error) {
    res.status(500).json({ code: 500, remark: "fail", error: error });
  }
});

const createUser = asyncHandler(async (req, res) => {
  try {
    const { name, email } = req.body;

    if (name && email) {
      const user = new User({
        name,
        email,
      });

      await user.save();
      res.status(200).json({ code: 200, remark: "user created" });
    } else {
      res.status(404).json({ code: 404, remark: "please send valid data" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ code: 500, remark: "fail", error: error });
  }
});

const updateUser = asyncHandler(async (req, res) => {
  try {
    const { name, email, id } = req.body;

    if (!id) {
      res.status(404).json({ code: 404, remark: "please send user id" });
      return;
    }

    const user = await User.findById(id);

    if (!user) {
      res.status(404).json({ code: 404, remark: "user does not exist" });
      return;
    }

    user.name = name || user.name;
    user.email = email || user.email;

    await user.save();

    res.status(200).json({ code: 200, remark: "user updated" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ code: 500, remark: "fail", error: error });
  }
});

const deleteUser = asyncHandler(async(req,res)=>{
  try {
    if(req.query.id){
      const user = await User.findByIdAndDelete({_id:req.query.id});
      
      if(!user){
        res.status(404).json({ code: 400, remark: "user does not exist" });
        return;
      }

      res.status(200).json({ code: 200, remark: "user deleted" });

    } else{
      res.status(404).json({ code: 400, remark: "please send user id" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ code: 500, remark: "fail", error });
  }
})

export { getUsers, createUser, updateUser, deleteUser };