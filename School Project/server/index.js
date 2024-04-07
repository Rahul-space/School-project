const express=require('express');
const app=express();
const mongoose=require('mongoose');
const websiteRoute=require('./routes/website')
const cors=require('cors');
app.use(express.json());


app.use(cors());
// allow all orgin in cors
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, POST");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

//Conect to DB


mongoose.set("strictQuery", false);
mongoose
  .connect("mongodb+srv://rahul:21022003@cluster0.d4jj3zl.mongodb.net/?retryWrites=true&w=majority", {
  })
  .then(() => console.log("DB Connection Successfull"))
  .catch((err) => {
    console.error(err);
  });




app.get("/",(req,res)=>{
    res.send("SERVICE BLOCKED => AUTHORIZED PERSONNEL ONLY \n your IP = ");
  }); 



app.use('/website',websiteRoute);



  app.listen(8800, () => {
    console.log("Backend is live");
  });