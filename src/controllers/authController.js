const User = require('../models/UserModel'); 
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.register = async (req, res) => {
    const { name, email, password, role } = req.body;
    
    // Check if all fields are being sent
    console.log(req.body);  // Log request body

    if (!name || !email || !password) {
        return res.status(400).json({ message: "All fields are required" });
    }

    // Hash password before saving
    const hashPassword = bcrypt.hashSync(password, 10);
    const user = new User({
        name,
        email,
        password: hashPassword,
        role: role || "Sales", 
    });

    try {
        await user.save();
        res.status(201).json({ message: "User registered successfully" });
    } catch (error) {
        console.error(error);  
        res.status(500).json({ message: "Error registering user", error });
    }
};


exports.login = async (req, res) => {
    const { email, password } = req.body;
    console.log(req.body);  

    try {
        const user = await User.findOne({ email });

        // If no user is found or password doesn't match
        if (!user || !(await bcrypt.compare(password, user.password))) {
            return res.status(401).json({ message: "Invalid credentials" });
        }

        // Generate JWT token for the user
        const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, {
            expiresIn: '1h'
        });

        // Send back the token in the response
        res.status(200).json({ token });
    } catch (error) {
        console.error(error);  // Log error for debugging
        res.status(500).json({ message: "Internal server error", error });
    }
};
