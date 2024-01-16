const jwt = require('jsonwebtoken');
const NodeCache = require('node-cache');
const cache = new NodeCache();
const { serialize, parse } = require('cookie');


const secretKey = 'yourSecretKey';

const storeRefreshTokenAndCookie = (email, password, refreshToken, res) => {
    cache.set(`refreshToken_${email, password}`, refreshToken);

    // Set the refresh token as a cookie
    const cookieOptions = {
        httpOnly: true,
        maxAge: 7 * 24 * 60 * 60 * 1000,
    };
    const refreshTokenCookie = serialize('refreshToken', refreshToken, cookieOptions);
    res.setHeader('Set-Cookie', refreshTokenCookie);
};
const getRefreshToken = (email, password) => {
    return cache.get(`refreshToken_${email, password}`);
};


const generateAccessToken = (email, password) => {
    const payload = { email, password };
    const options = { expiresIn: '15m' }; // Adjust the expiration time as needed
    return jwt.sign(payload, secretKey, options);
};

const generateRefreshToken = (email, password) => {
    const payload = { email, password };
    const options = { expiresIn: '7d' }; // Adjust the expiration time as needed
    return jwt.sign(payload, secretKey, options);
};

const verifyAccessToken = (accessToken) => {
    try {
        const decoded = jwt.verify(accessToken, secretKey);
        return decoded;
    } catch (error) {
        return null;
    }
};

// Function to verify the refresh token
const verifyRefreshToken = (refreshToken) => {
    try {
        const decoded = jwt.verify(refreshToken, secretKey);
        return decoded;
    } catch (error) {
        return null;
    }
};

// Function to store refresh tokens in the cache
const storeRefreshToken = (email, password, refreshToken) => {
    cache.set(`refreshToken_${email, password}`, refreshToken);
};

// Function to retrieve refresh tokens from the cache


module.exports = {
    generateAccessToken,
    generateRefreshToken,
    verifyAccessToken,
    verifyRefreshToken,
    storeRefreshToken,
    getRefreshToken,
    generateAccessToken,
    generateRefreshToken,
    verifyAccessToken,
    verifyRefreshToken,
    storeRefreshTokenAndCookie,
    getRefreshToken,
};
