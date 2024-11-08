import { Router } from "express";
import { createUser,updateUser,fetchAllUser,userDetails,deleteUser } from "../controller/UserController.js";


const router = Router()

router.post("/", createUser)
router.put("/:id", updateUser)
router.get("/", fetchAllUser)
router.get("/:id", userDetails)
router.delete("/:id", deleteUser)

export default router