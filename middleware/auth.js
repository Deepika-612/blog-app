require('dotenv').config();

const jwt = require('jsonwebtoken');

module.exports = function(req, res, next) {

    const token = req.header('Authorization');

    if (!token) {
        return res.status(401).json({
            success: false,
            error: 'Access denied. No token provided.'
        });
    }

    try {

        const verified = jwt.verify(
            token,
            process.env.JWT_SECRET
        );

        req.user = verified;

        next();

    } catch (err) {

        res.status(400).json({
            success: false,
            error: 'Invalid token'
        });

    }
};