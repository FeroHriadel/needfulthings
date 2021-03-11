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
            res.status(400).json({error: 'Please fill in all required fields'});
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
        if (products.length === 0) {
            res.status(404).json({error: 'No products found'});
        } else {
            res.json(products);
        }

    } catch (err) {
        console.log(err);
        res.status(500).json({error: 'Error - category id bad format or server error'});
    }
}



//GET ALL PRODUCTS
const getProducts = async (req, res) => {
    try {
        const products = await Product.find().select('-image').sort({category: 1});
        if (!products) {
            return res.status(404).json({error: 'No products found'});
        }

        res.json(products);

    } catch (err) {
        console.log(err);
        res.json({error: `Server Error (get products)`})
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
    try {
        const product = await Product.findById(req.params.productId).select('-image').exec((error, product) => {
            if (error || !product) {
                return res.status(400).json({error: 'Product does not exist or wrong productId'})
            } else {
                res.json(product);
            }
        })
    } catch (err) {
        res.status(500).res.json({error: 'Server Error'})
    }
}



//UPDATE PRODUCT
const updateProduct = async (req, res) => {
    //save form data here:
    let updateData = {};

    //init formidable
    let form = new formidable.IncomingForm();
    form.keepExtension = true;

    //process form
    form.parse(req, (err, fields, files) => {
        //check if either files or name exist
        if (!fields.name && !fields.sold && !fields.inStock && !fields.price && !fields.description && !files.image) {
            return res.status(400).json({error: `Error. You need to update at least one parameter`})
        }
        //catch err
        if (err) {
            return res.status(400).json({error: 'Error parsing form data'});
        }

        //populate updateData with fields keys & values
        if (fields.name) updateData.name = fields.name;
        if (fields.sold) updateData.sold = fields.sold;
        if (fields.inStock) updateData.inStock = fields.inStock;
        if (fields.price) updateData.price = fields.price;
        if (fields.description) updateData.description = fields.description;

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

    //update product
    try {
        const product = await Product.findById(req.params.productId);
        
        if (!product) {
            return res.status(404).json({error: `Product not found`})
        }

        const updatedProduct = await Product.findByIdAndUpdate(req.params.productId, {$set: updateData}, {new: true});
        res.json(updatedProduct);

    } catch (err) {
        console.log(err);
        res.status(500).json({error: `Server Error (updating product)`});
    }
}



export {createProduct, getProductsByCategory, getImage, getProductById, getProducts, updateProduct}

