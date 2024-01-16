var jwt = require('jsonwebtoken');


const verifyJWT = async (req, res, next) => {
    try {
        const token = req.cookie?.accessToken || req.header("Authorization")?.replace("Bearer ", "");
        if(!token){
            throw new Error("Access token not found")
        }

        const decodedToken = jwt.verify(token,ACCESS_TOKEN_SECRET);
        const us
    } catch (error) {
        
    }
}