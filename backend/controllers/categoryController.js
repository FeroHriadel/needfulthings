import Category from '../models/Category.js';



//create category
const createCategory = async (req, res) => {
    try {
        const category = new Category({name: req.body.name});
        const savedCategory = await category.save();
        res.status(201).json(savedCategory);
    } catch (err) {
        console.log(`error: `, err);
        res.status(400).json({error: err});
    }
}



//get all categories
const getCategories = async (req, res) => {
    try {
        const categories = await Category.find({});
        res.json(categories);
    } catch (err) {
        console.log(`error: `, err);
        res.json({error: err});
    }
}



export {createCategory, getCategories};