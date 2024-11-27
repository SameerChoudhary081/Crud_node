const { name } = require('ejs')
const mongoose=require('mongoose')
const { type } = require('os')
    new mongoose.Schema({
        name:{
            type:String,
            required:true
        },
        email:{
            type:String,
            required:true,
            unique:true
        },
        phone:{
            type:String,
            required:true
        },
        image:{
            type:String,
            required:true
        }
    })