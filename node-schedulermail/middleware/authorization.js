const jwt = require('jsonwebtoken');
const SecretKey = '77680dbd03cc456a831f929deebb8c48a732fc7f5481241331cfe31cda012150';

const authorize = (req, res, next) => {
    let token;
    
    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith("Bearer")
    ) {
       
        token = req.headers.authorization.split(" ")[1];
    }
   

    
    if (!token) {
        return res.status(401).json({
            msg: 'Authorization denied. No token provided.'
        });
    }

    try {
        // Verify the token using the secret key
        const decoded = jwt.verify(token, SecretKey);
        req.user = decoded;
       // console.log(decoded.id);
        next(); // Proceed to the next middleware or route handler
    } catch (err) {
        res.status(401).json({ msg: 'Token is not valid' });
    }
};

module.exports = authorize;
