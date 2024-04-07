const router = require('express').Router();
const News = require('../models/News');
const Awards = require('../models/Awards');
const Events = require('../models/Events');
const mongoose = require('mongoose');



//News

router.post('/news/create',async(req,res)=>{
    const newNews=new News(req.body);
    try{
        const saved=await newNews.save()
        res.status(200).json(saved)
    }catch(err){
        res.status(500).json(err.message)
    }

});
router.get('/news',async(req,res)=>{
    try{
        const news=await News.find()
        res.status(200).json(news)
    }catch(err){
        res.status(500).json(err.message)
    }
});

router.get('/news/:id',async(req,res)=>{
    try{
        const news=await News.findById(req.params.id)
        res.status(200).json(news)
    }catch(err){
        res.status(500).json(err.message)
    }
});
router.post('/news/update/:id',async(req,res)=>{
    try{
        const updated=await News.findByIdAndUpdate(req.params.id,{
            $set:req.body,
        },{new:true})
        res.status(200).json(updated)
    }catch(err){
        res.status(500).json(err.message)
    }
});
router.delete('/news/delete/:id',async(req,res)=>{
    try{
        await News.findByIdAndDelete(req.params.id)
        res.status(200).json("News Deleted")
    }catch(err){
        res.status(500).json(err.message)
    }
});

router.post('/news/:id/publish',async(req,res)=>{
    try{
        const published=await News.findByIdAndUpdate(req.params.id,{
            $set:{publish:true}
        },{new:true}) 
        res.status(200).json(published)
    }catch(err){
        res.status(500).json(err.message)
    }

});
router.post('/news/:id/draft',async(req,res)=>{
    try{
        const published=await News.findByIdAndUpdate(req.params.id,{
            $set:{publish:false}
        },{new:true}) 
        res.status(200).json(published)
    }catch(err){
        res.status(500).json(err.message)
    }

});

//Awards


router.post('/awards',async(req,res)=>{
    const newAwards=new Awards(req.body);
    try{
        const saved=await newAwards.save()
        res.status(200).json(saved)
    }catch(err){
        res.status(500).json(err.message)
    }

});
router.get('/awards',async(req,res)=>{
    try{
        const awards=await Awards.find()
        res.status(200).json(awards)
    }catch(err){
        res.status(500).json(err.message)
    }
});
router.get('/awards/:id',async(req,res)=>{
    try{
        const awards=await Awards.findById(req.params.id)
        res.status(200).json(awards)
    }catch(err){
        res.status(500).json(err.message)
    }
});
router.post('/awards/:id',async(req,res)=>{
    try{
        const updated=await Awards.findByIdAndUpdate(req.params.id,{
            $set:req.body,
        },{new:true})
        res.status(200).json(updated)
    }catch(err){
        res.status(500).json(err.message)
    }
});
router.delete('/awards/:id',async(req,res)=>{
    try{
        await Awards.findByIdAndDelete(req.params.id)
        res.status(200).json("Awards Deleted")
    }catch(err){
        res.status(500).json(err.message)
    }
});
router.post('awards/:id/publish',async(req,res)=>{
    try{
        const published=await findByIdAndUpdate(req.params.id,{
            $set:{publish:true}
        },{new:true}) 
    }catch(err){
        res.status(500).json(err.message)
    }

}); 







//Events

router.post('/events',async(req,res)=>{
    const newEvents=new Events(req.body);
    try{
        const saved=await newEvents.save()
        res.status(200).json(saved)
    }catch(err){
        res.status(500).json(err.message)
    }

});
router.get('/events',async(req,res)=>{
    try{
        const events=await Events.find()
        res.status(200).json(events)
    }catch(err){
        res.status(500).json(err.message)
    }
});
router.get('/events/:id',async(req,res)=>{
    try{
        const events=await Events.findById(req.params.id)
        res.status(200).json(events)
    }catch(err){
        res.status(500).json(err.message)
    }
});
router.post('/events/:id',async(req,res)=>{
    try{
        const updated=await Events.findByIdAndUpdate(req.params.id,{
            $set:req.body,
        },{new:true})
        res.status(200).json(updated)
    }catch(err){
        res.status(500).json(err.message)
    }
});
router.delete('/events/:id',async(req,res)=>{
    try{
        await Events.findByIdAndDelete(req.params.id)
        res.status(200).json("Events Deleted")
    }catch(err){
        res.status(500).json(err.message)
    }
});
router.post('events/:id/publish',async(req,res)=>{
    try{
        const published=await findByIdAndUpdate(req.params.id,{
            $set:{publish:true}
        },{new:true}) 
    }catch(err){
        res.status(500).json(err.message)
    }

});




module.exports=router;