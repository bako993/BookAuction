import express from "express";
import {getUsers, getUser, updateUserInfo, deleteUser, createUser, loginUser} from "../controllers/users.js";
import { authenticateToken} from "../helpers/authenticate.js";
import { checkIsAdmin} from "../helpers/checkIsAdmin.js";

const router = express.Router();


router.get('/',authenticateToken,getUsers);
router.get('/:id',authenticateToken,getUser);
router.put('/:id',authenticateToken,updateUserInfo);
router.delete('/:id',authenticateToken,checkIsAdmin,deleteUser);

router.post('/register',createUser);
router.post('/login',loginUser);


export default router;


