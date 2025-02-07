const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    
    const token = req.header('Authorization');
    
  
    if (!token) {
        console.log("No token found");
        return res.status(401).json({ message: "Access denied" });
    }

   
    const actualToken = token.split(' ')[1]; 
    if (!actualToken) {
        console.log("Invalid token format");
        return res.status(401).json({ message: "Access denied" });
    }

    console.log("Token to verify:", actualToken);

    try {
       
        const decoded = jwt.verify(actualToken, process.env.JWT_SECRET);
        req.user = decoded;
        next(); 
    } catch (error) {
        console.error("Token verification error:", error);
        return res.status(400).json({ message: "Invalid token" });
    }
};
