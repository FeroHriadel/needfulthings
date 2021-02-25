import Category from '../models/Category.js';
import Product from '../models/Product.js';
import formidable from 'formidable';
import fs from 'fs';



//CRETE PRODUCT
//(body=formdata with 'form field' strings & number & 'image' file)
const createProduct = (req, res) => {
    //init formidable
    let form = new formidable.IncomingForm();
    form.keepExtension = true;

    //process request
    form.parse(req, (err, fields, files) => {
        //catch err
        if (err) {
            return res.status(400).json({error: 'Product could not be created'});
        }

        //validate non-file fields
        const { name, inStock, price, description, category } = fields;
        if (!name || !inStock || !price || !description || !category) {
            res.status(400).json({error: 'All fields are required'});
        }

        //populate Product with non-file fields
        let product = new Product(fields);
        
        //populate Product with file
        if (files.image) {
            if (files.image.size > 2000000) {
                return res.status(400).json({error: 'Max size 2Mb exceeded'});
            }

            product.image.data = fs.readFileSync(files.image.path);
            product.image.contentType = files.image.type;
        } else {
            return res.json({error: `Product needs an image upload`})
        }

        //save to db
        product.save((err, result) => {
            if (err) {
                return res.status(400).json({error: err});
            }

            res.json(result)
        })
    })
}



//GET PRODUCTS BY CATEGORY ID
const getProductsByCategory = async (req, res) => {
    try {
        const products = await Product.find({category: req.params.categoryId}).select('-image');

        if (!products) {
            res.status(404).json({error: `No products found`});
        } else {
            res.json(products)
        }
    } catch (err) {
        console.log(err);
        res.status(500).json({error: err});
    }
}



//GET PRODUCT IMAGE
const getImage = async (req, res) => {
    try {
        const product = await Product.findById(req.params.productId);

        if (product) {
            res.set('Content-Type', product.image.contentType);
            res.send(product.image.data)
        } else {
            res.status(404).json({error: `Product not found`})
        }
    } catch (err) {
        console.log(err);
        res.status(500).json({error: err});
    }
}



//GET PRODUCT BY ID
const getProductById = async (req, res) => {
    const product = await Product.findById(req.params.productId).select('-image');

    if (product) {
        res.json(product);
    } else {
        res.status(404).json({error: `Product not found`});
    }
}



export {createProduct, getProductsByCategory, getImage, getProductById}

