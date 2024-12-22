import express from "express";
import { PrismaClient } from "@prisma/client";
import { authToken } from "../middleware/auth.js";

import {register, login, logout, getUserById, getAllUser, updateUser} from "../controllers/user.js"
import { createDoctor, getAllDoctor, getDoctorById } from "../controllers/doctor.js";
import { createSchedule, getAllSchedule } from "../controllers/schedule.js";


const prisma = new PrismaClient();
const router = express.Router();


// auth
router.post("/api/register", register)
router.post("/api/login", login)
router.post("/api/logout", logout)

// user
router.get("/api/users", authToken, getAllUser )
router.get("/api/user/:id", authToken, getUserById)
// update user that was login
router.put("/api/user", authToken, updateUser)


// doctor
router.get("/api/doctors", authToken, getAllDoctor)
router.get("/api/doctors/:id", authToken, getDoctorById)
router.post("/api/doctors", authToken, createDoctor)


// schedule
router.get("/api/schedules", authToken, getAllSchedule)
router.post("/api/schedule/:id", authToken, createSchedule)



export default router;

