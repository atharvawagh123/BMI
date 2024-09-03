require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { GoogleGenerativeAI } = require('@google/generative-ai'); // Adjust if using a different library

const app = express();
app.use(express.json());
const cors = require('cors');
app.use(cors());

mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error('MongoDB connection error:', err));

const UserSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
});

const User = mongoose.model('User', UserSchema);

app.post('/api/register', async (req, res) => {
    const { email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    try {
        const newUser = await User.create({ email, password: hashedPassword });
        res.status(201).json(newUser);
    } catch (error) {
        res.status(500).json({ message: 'Error creating user' });
    }
});

app.post('/api/login', async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
        return res.status(400).json({ message: 'Invalid credentials' });
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
        return res.status(400).json({ message: 'Invalid credentials' });
    }
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET);
    res.json({ token });
});



// Initialize Google Generative AI with API key
const genAI = new GoogleGenerativeAI(process.env.API_KEY);
const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

app.post('/api/get-suggestion', async (req, res) => {
    const { category } = req.body;

    const prompts = {
        Underweight: 'Give advice for someone who is underweight.',
        'Normal weight': 'Give advice for someone who has a normal weight.',
        Overweight: 'Give advice for someone who is overweight.',
        Obese: 'Give advice for someone who is obese.',
    };

    const prompt = prompts[category] || 'Provide general health advice.';

    try {
        // Replace with actual model interaction code
        const result = await model.generateContent(prompt);
        res.json({ suggestion: result.response.text() });
    } catch (error) {
        console.error('Error communicating with the AI model:', error);
        res.status(500).json({ error: 'Error communicating with the AI model: ' + error.message });
    }
});


app.listen(5000, () => {
    console.log('Server running on http://localhost:5000');
});
