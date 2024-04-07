const mongoose=require('mongoose');

const WebsiteSchema=mongoose.Schema({
    title:{
        type:String,
        required:true
    }, 
    photo:{
        type:String,
        default:"https://presentations.gov.in/wp-content/uploads/2020/01/NE_Preview1.png?x93559"
    },
    schools:{
        type:Array,
        default:[]
    },
    description:{
        type:String,
        default:"EMPTY"
    },
    publish:{
        type:Boolean,
        default:true,
    }
},{timestamps:true});

module.exports=mongoose.model("Website",WebsiteSchema);