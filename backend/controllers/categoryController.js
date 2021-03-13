import Category from '../models/Category.js';
import Product from '../models/Product.js';
import formidable from 'formidable';
import fs from 'fs';



//CREATE CATEGORY
//(body=formdata with 'name' string & 'image' file)
const createCategory = (req, res) => {
    //init formidable
    let form = new formidable.IncomingForm();
    form.keepExtension = true;

    //process request
    form.parse(req, (err, fields, files) => {
        //catch err
        if (err) {
            return res.status(400).json({error: 'Image could not be uploaded'});
        }

        //validate non-file fields
        const { name } = fields;
        if (!name) {
            res.status(400).json({error: 'Name is required'});
        }

        //populate Category with non-file fields
        let category = new Category(fields);
        
        //populate Category with file
        if (files.image) {
            if (files.image.size > 2000000) {
                return res.status(400).json({error: 'Max size 2Mb exceeded'});
            }

            category.image.data = fs.readFileSync(files.image.path);
            category.image.contentType = files.image.type;
        } else {
            return res.json({error: `Category needs an image upload`})
        }

        //save to db
        category.save((err, result) => {
            if (err) {
                return res.status(400).json({error: err});
            }

            res.json(result)
        })
    })
}



//GET ALL CATEGORIES
//(w/o images)
const getCategories = async (req, res) => {
    try {
        const categories = await Category.find({}).select('-image').sort([['name', 'asc']]).exec((error, categories) => {
            if (error || !categories) {
                res.status(404).json({error: `No categories found`})
            } else {
                res.json(categories)
            }
        })
    } catch (err) {
        console.log(`error: `, err);
        res.json({error: 'Server Error'});
    }
}



//GET CATEGORY IMAGE
const getImage = async (req, res) => {
    try {
        const category = await Category.findById(req.params.categoryId);

        if (category) {
            res.set('Content-Type', category.image.contentType);
            res.send(category.image.data)
        } else {
            res.status(404).json({error: `Category not found`})
        }
    } catch (err) {
        console.log(err);
        res.status(500).json({error: err});
    }
}



//GET CATEGORY BY ID
const getCategoryById = async (req, res) => {
    try {
        const category = await Category.findById(req.params.categoryId).select('-image');
        
        if (!category) {
            return res.status(404).json({ error: 'Category not found'})
        }

        res.json(category);

    } catch (err) {
        console.log(err);
        res.status(500).json({error: err});
    }
}



//UPDATE CATEGORY
const updateCategory = async (req, res) => {
    //save form data here:
    let updateData = {};

    //init formidable
    let form = new formidable.IncomingForm();
    form.keepExtension = true;

    //process form
    form.parse(req, (err, fields, files) => {
        //check if either files or name exist
        if (!fields.name && !files.image) {
            return res.status(400).json({error: `Update at least one parameter: name or image`})
        }
        //catch err
        if (err) {
            return res.status(400).json({error: 'Error parsing form data'});
        }

        //populate updateData with name
        if (fields.name) {
            updateData.name = fields.name;
        }

        //populate updateData with image
        if (files.image) {
            updateData.image = {};

            if (files.image.size > 2000000) {
                return res.status(400).json({error: 'Max size 2Mb exceeded'});
            }

            let imageData = fs.readFileSync(files.image.path);
            let imageContentType = files.image.type;

            updateData.image.data = imageData;
            updateData.image.contentType = imageContentType;
        }     
    })

    //update category
    try {
        const category = await Category.findById(req.params.categoryId);
        
        if (!category) {
            return res.status(404).json({error: `Category not found`})
        }

        const updatedCategory = await Category.findByIdAndUpdate(req.params.categoryId, {$set: updateData}, {new: true});
        res.json(updatedCategory);

    } catch (err) {
        console.log(err);
        res.status(500).json({error: `Server Error (updating category)`});
    }
}



//DELETE CATEGORY
const deleteCategory = async (req, res) => {
    try {
        const categoryId = req.params.categoryId;
        if (!categoryId) return res.status(400).json({error: `Category Id is required`})

        const deletedProducts = await Product.deleteMany({category: categoryId});
        await Category.findByIdAndRemove(categoryId);
        res.json({message: 'Category deleted'});      

    } catch (err) {
        console.log(err);
        res.status(500).json({error: 'Server Error'})
    }
}



export {createCategory, getCategories, getImage, getCategoryById, updateCategory, deleteCategory}