require("dotenv").config()
const express= require("express")
const mongoose=require("mongoose")
const session=require("express-session")
const route=require("./Routes/routes")
const app=express()
app.set("view engine","ejs")

const PORT=process.env.PORT||5000
app.use("/",route)
app.use(express.static("uploads"))
app.use(express.json)

app.use(
    session({
        mysecretkey:"sameer",
        resave:false,
        uninitialized:true
    })
)
mongoose.connect(process.env.DB_URI)
  .then(()=>
    console.log("mongoose Connected")
)
.catch((ew)=>
console.log(err)
)
app.use((err,req,res,next)=>{
    console.log(err)
    res.status(500).send("internal server error!")
})
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});