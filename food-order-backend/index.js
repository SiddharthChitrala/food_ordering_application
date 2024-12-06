const express = require('express');
const app = express();
const cors = require('cors');
const multer = require('multer');
const fs = require('fs');
const path = require('path');
const routes = require('./routes/routes');
const connectToDatabase = require('./db');
const Dish = require('./menu/dishModel');

app.use(cors());
app.use(express.json());
app.use(routes);
app.use('/uploads', express.static('uploads'));

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname);
    }
});

const upload = multer({ storage: storage });

connectToDatabase();

const port = process.env.PORT || 9000;

app.get('/dishes', async (req, res) => {
    try {
        const dishes = await Dish.find();
        res.status(200).json(dishes);
    } catch (error) {
        console.error('Error fetching dishes', error);
        res.status(400).json({ message: 'Error fetching dishes' });
    }
});

app.put('/dishes/:id', upload.single('image'), async (req, res) => {
    try {
        const { dishName, description, price } = req.body;
        const dishId = req.params.id;
        const existingDish = await Dish.findById(dishId);

        if (!existingDish) {
            return res.status(404).json({ message: 'Dish not found' });
        }

        const imagePath = req.file ? req.file.path : existingDish.imagePath;

        try {
            const updatedDish = await Dish.findByIdAndUpdate(
                dishId,
                { $set: { dishName, description, price, imagePath } },
                { new: true }
            );

            if (!updatedDish) {
                return res.status(404).json({ message: 'Dish not found' });
            }

            res.status(200).json(updatedDish);
        } catch (error) {
            console.error('Error updating dish in the database', error);
            res.status(500).json({ message: 'Error updating dish in the database' });
        }
    } catch (error) {
        console.error('Error updating dish', error);
        res.status(400).json({ message: 'Error updating dish' });
    }
});

app.delete('/dishes/:id', async (req, res) => {
    try {
        const dishId = req.params.id;
        const deletedDish = await Dish.findById(dishId);

        if (!deletedDish) {
            return res.status(404).json({ message: 'Dish not found' });
        }

        if (deletedDish.imagePath) {
            const imageFilePath = path.join(__dirname, deletedDish.imagePath);
            fs.unlinkSync(imageFilePath);
        }

        await Dish.findByIdAndDelete(dishId);

        res.status(200).json({ message: 'Dish deleted successfully' });
    } catch (error) {
        console.error('Error deleting dish', error);
        res.status(500).json({ message: 'Error deleting dish' });
    }
});

app.post('/upload-dish', upload.single('image'), async (req, res) => {
    try {
        const { dishName, description, price } = req.body;
        const imagePath = req.file.path;

        try {
            const newDish = new Dish({
                dishName,
                description,
                price,
                imagePath,
            });

            await newDish.save();

            res.status(200).json({ message: 'Dish uploaded successfully' });
        } catch (error) {
            console.error('Error saving new dish to the database', error);
            res.status(500).json({ message: 'Error saving new dish to the database' });
        }
    } catch (error) {
        console.error('Dish upload failed', error);
        res.status(400).json({ message: 'Error during dish upload' });
    }
});

app.listen(port, function (error) {
    if (error) {
        console.error('Error starting the server:', error);
    } else {
        console.log(`Server is running on port ${port}`);
    }
});
