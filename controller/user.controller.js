
const jwt = require('jsonwebtoken');
const auth = require("../auth/auth.js")


exports.logIn = async (req, res) => {
    const {email,password} = req.body;
    const accessToken = auth.generateAccessToken(email,password);
    const refreshToken = auth.generateRefreshToken(email,password);
    auth.storeRefreshTokenAndCookie(email,password, refreshToken, res);

    res.json({ accessToken });
};

exports.refresh = async (req, res) => {
    const {email,password} = req.body;

    const refreshToken = req.cookies.refreshToken;

    const isValidRefreshToken = auth.verifyRefreshToken(refreshToken);

    if (isValidRefreshToken && auth.getRefreshToken(email,password) === refreshToken) {
        const newAccessToken = auth.generateAccessToken(email,password);
        res.json({ accessToken: newAccessToken });
    } else {
        res.status(401).json({ error: 'Invalid refresh token' });
    }
};


exports.authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) return res.status(401).send('Token required');

    jwt.verify(token, secretKey, (err, user) => {
        if (err) return res.status(403).send('Invalid or expired token');
        req.user = user;
        next();
    });
};


