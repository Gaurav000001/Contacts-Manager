const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

/*
    @desc register user
    @route POST api/users/register
    @access Public
*/
const registerUser = asyncHandler(
    async (request, response) => {
        const { username, email, password } = request.body;
        if(!username || !email || !password){
            response.status(400);
            throw new Error("Please include all fields");
        }

        const existingUser = await User.findOne({email});
        if(existingUser){
            response.status(400);
            throw new Error("User already exists");
        }

        const hashedPassword = await bcrypt.hash(password, 12);
        const user = await User.create({
            username,
            email,
            password: hashedPassword,
        });

        if(user){
            response.status(201).json({ _id: user.id, username: user.username, email: user.email });
        }
        else{
            response.status(400);
            throw new Error("User data not valid");
        }
    }
);

/*
    @desc user login
    @route POST api/users/login
    @access Public
*/
const loginUser = asyncHandler(
    async (request, response) => {
        const { email, password } = request.body;
        if(!email || !password){
            response.status(400);
            throw new Error("All fields are mandatory!");
        }

        const user = await User.findOne({ email });
        if(user && ( await bcrypt.compare(password, user.password))){
            const accessToken = jwt.sign(
                {
                    user: {
                        id: user.id,
                        username: user.username,
                        email: user.email
                    }
                },
                process.env.JWT_SECRET, 
                { expiresIn: "1h" }
            );

            response.status(200).json({ accessToken });
        }
        else{
            response.status(401);
            throw new Error("Invalid credentials");
        }
    }
);

/*
    @desc Current User information
    @route GET api/users/current
    @access Private
*/
const currentUser = asyncHandler(
    async (request, response) => {
        response.status(200).json(request.user);
    }
);


module.exports = {
    registerUser,
    loginUser,
    currentUser
}