const express = require('express');

const router = express.Router();

const blogController = require('../controller/blog-controller'); 

router.get("/", blogController.getAllBlogs);

module.exports = router;
