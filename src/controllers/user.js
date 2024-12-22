// import { PrismaClient } from "@prisma/client";
// const prisma = new PrismaClient();
// import bcrypt from "bcrypt";
// import cookieParser from "cookie-parser";
// import { response } from "express";
// import jwt from "jsonwebtoken";

import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

import bcrypt from "bcrypt";
import cookieParser from "cookie-parser";
import { response } from "express";
import jwt from "jsonwebtoken";


export const register = async(req, res) => {
    try {
        const {username,email,password, } = req.body;

        // cek email
        const existingEmail = await prisma.user.findUnique({
            where: {email: req.body.email},
        });

        if(existingEmail) {
            return res.status(409).json({message:"Email is already use" });
        }

        // hash password
        const hashPassword = await bcrypt.hash(password, 10);

        // create new user
        const userData = await prisma.user.create({
            data:{
                
                username,
                email,
                password: hashPassword,
               
            },
        });
        res.status(200).json({message: "register successfull", userData});
    } catch (error) {
        console.log("error during registration: ", error);
        res.status(500).json({error: "Internal server error"});
    }
};


// login

const jwtSecret = process.env.JWT_SECRET;

export const login = async (req, res) => {
    const {email, password} = req.body;

    try {
        const user = await prisma.user.findUnique({
            where: {email},
        });

        if(!user || !bcrypt.compareSync(password, user.password)) {
            return res.status(401).json({ message: "Invalid credentials"});
        }

        const token = jwt.sign({ id: user.id }, jwtSecret, {expiresIn: "1d"});
        res.cookie("token" , token, { httpOnly: true });

        console.log(token);
        return res.status(200).json({ message: "Login susccessfull", token});
        
    } catch (error) {
        console.log(error);
        return res.status(500).json({message: "Internal Server Error"});
        
    }
};


// Logout

export const logout = async (req, res) => {
    try {
        res.clearCookie("token");
        console.log("Token cookie cleared successfully.");
        return res.status(200).json({ message: "You are Logout!" });
    } catch (error) {
        console.error("Error in logout:", error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};


// Fetch all users
export const getAllUser = async (req, res) => {
    try {
        const users = await prisma.user.findMany();
    
        if (!users || users.length === 0) {
            return res.status(404).json({ message: "No users found" });
        }
    
        return res.status(200).json({ message: "Users fetched successfully", users });
    
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal server error", error });
    }
};


export const getUserById = async (req, res) => {
    const userId = req.params.id;  
    
    try {
        const user = await prisma.user.findUnique({
            where: { id: Number(userId) }
        });
    
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
    
        return res.status(200).json({ message: "User fetched successfully", user });
    
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal server error", error });
    }
};



export const updateUser = async (req, res) => {
    const user_id = req.user.id;
    const { username, email,password  } = req.body;

    // Check for all required fields
    if (!username || !email ) { 
        return res.status(400).json({ message: 'Missing required fields' });
    }

    try {
        let hashedPassword = password;
        if (password) {
            hashedPassword = await bcrypt.hash(password, 10); 
        }

        // Update user data in the database
        const updatedUser = await prisma.user.update({
            where: { id: Number(user_id) },
            data: {
                username,
                email,
                password: hashedPassword, 
                
            },
        });

        return res.status(200).json({
            message: "User updated successfully",
            updatedUser,
        });
    } catch (error) {
        console.error("Update error:", error);
        return res.status(500).json({
            message: "Failed to update user",
            error: error.message,
        });
    }
};
