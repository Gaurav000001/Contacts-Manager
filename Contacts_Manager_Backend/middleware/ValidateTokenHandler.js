const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");

const validateToken = asyncHandler(
    async (request, response, next) => {
        let token;
        const authorization = request.headers.authorization || request.headers.Authorization;
        if (authorization && authorization.startsWith("Bearer")) {
            token = authorization.split(" ")[1];
            jwt.verify(
                token, 
                process.env.JWT_SECRET, 
                (error, decoded) => {
                    if (error) {
                        response.status(401);
                        throw new Error("User not Authorized");
                    }
                    
                    request.user = decoded.user
                    next();
                }
            );

            if(!token){
                response.status(401);
                throw new Error("User is not Authorized OR token is missing");
            }
        }
    }
)

module.exports = validateToken;