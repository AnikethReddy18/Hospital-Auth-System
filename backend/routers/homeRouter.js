import { Router } from "express";
import { verifyToken } from "../authMiddleware.js";
import { createEmployee, createRoom, logMovement, getLogMovements, getLogMovementsByEmployee, getLogMovementsByRoom } from "../controllers/homeController.js"

const router = Router()

router.post("/employee", verifyToken, createEmployee)
router.post("/room", verifyToken, createRoom)

router.get("/log", verifyToken, getLogMovements)
router.get("/log/emp/:id", verifyToken, getLogMovementsByEmployee)
router.get("/log/room/:id", verifyToken, getLogMovementsByRoom)

router.post("/log", verifyToken, logMovement)

export default router