const Blog = require('../model/blog');  

exports.getAllBlogs = async(req,res) => {
    try{
        let blogs = await Blog.find();
        if(!blogs)
        {
            return res.status(404).json({message: "No Blog found"});
        }
        return res.status(200).json({blogs});
    }
    catch(err){
        console.log(err);
        return res.status(500).json({message: "Something went wrong"});
    }
}

exports.postBlog = async (req,res) => {
    try{
        const {title, description, image, user} = req.body;
        const blog = new Blog({
            title,
            description,
            image,
            user
        });
        await blog.save();
        return res.status(200).json({blog}); 
    }
    catch(err) {
        console.log(err);
        return res.status(500).json({message: "Something went Wrong"});
    }
}

exports.updateBlog = async(req,res) => {
    try{
        const {title, description} = req.body;
        const blogId = req.params.id;
        const blog = await Blog.findByIdAndUpdate(blogId, {
            title,
            description
        });
        if(!blog)
        {
            return res.status(400).json({message: "Blog Not found and Unable to update"})
        }
        return res.status(200).json({blog});
    }
    catch(err) 
    {
        console.log(err);
        return res.status(500).json({message: "Something went wrong"});
    }
}

exports.getBlogById = async(req,res) => {
    try{
        const blogId = req.params.id;
        let blog = await Blog.findById(blogId);
        if(!blog)
        {
            return res.status(404).json({message: "Blog Not found"});
        }
        return res.status(200).json({blog});
    }
    catch(err)
    {
        console.log(err);
        return res.status(500).json({message: "Something went wrong"});
    }
}

exports.deleteBlogById = async (req,res) => {
    try{
        const BlogId  = req.params.id;
        let blog = await Blog.findByIdAndRemove(BlogId);
        if(!blog)
        {
            return res.status(404).json({message: "No Blog Found with this ID"});
        }
        return res.status(200).json({message: "Blog Successfully Deleted"});
    }
    catch(err)
    {
        console.log(err);
        return res.status(500).json({message: "Something went wrong"});
    }
}