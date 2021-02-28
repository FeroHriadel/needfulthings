import Category from '../models/Category.js';
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



export {createCategory, getCategories, getImage};