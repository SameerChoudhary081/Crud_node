const express=require("express")
const app=express.Router()
const fs=require("fs")
const multer=require("multer")
const mongoose=require("mongoose")
const User=require('../Models/users')
const { type } = require("os")
const { title } = require("process")
//add
app.post("/add",Uploads,async(req,res)=>{
    const user=new User({
        name:req.body.name,
        emil:req.body.email,
        phone:req.body.phone,
        image:req.file.filename
    })
    try{ await user.save()
    req.session.message={
        type:"sucess",
        message:"user added succesfully!"
    }
    res.redirect("/")
}
 catch(err){
  console.log(err)
  req.session.message={
        type:"danger",
        message:"Failed Error!"
 }
 res.status(500).redirect("/")
}
})
//listing
app.get("/",async(req,res)=>{
    try{
        const user=await User.find().exec();
        const message=req.session.message
        delete req.session.message
        res.render("index",{
            title:"Home page",
            user:user,
            message:message
        })
    }
    catch(err){
        console.log(err)
        req.session.message={
            type:"danger",
            message:"Faild !"
        }
        res.status(500).redirect("/")
    }
})
// Delete    
    app.get("delete/:id",(req,res)=>{
        const id=req.params.id
        User.findOneAndDelete({_id:id})
        exec()
        .then((result)=>{
            if(result&&result.image!=="")
            {
                fs.unlinkSync("uploads/"+result.image)
                console.log("Image Remove")
            }
        })
        req.session.message={
            type:"danger",
            message:"Recode Deleted Successfully"
        }
        res.status(500).redirect("/");
    })
// Edit
    app.get("/edit/:id",async(req,res)=>{
        try{
            const id=req.params.id
            const user=await User.findById(id)
            exec()
            if(!user){
                console.log("try later")
                res.redirect("/")
            }
            res.render("edit_user",{
                title:"edit_user",
                user:user
            })
        }
        catch(err){
            console.log(err)
            req.session.message={
                type:"danger",
                message:"failed edit !"
            }
            res.status(500).redirect("/")
        }
    }) 
    //uploads 
    const storage=multer.diskStorage({
        destination:"/uploads",
        filename:function(req,res,cb){
            cb(null,Date.now()+"_"+fileorignalname)
            const uploads=multer({storage}).single("image") 
        }
    }) 


