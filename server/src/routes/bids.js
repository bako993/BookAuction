import {placeBid, getBids, deleteBid} from "../controllers/bids.js";
import express from "express";
import {authenticateToken} from "../helpers/authenticate.js";
import { checkIsAdmin} from "../helpers/checkIsAdmin.js";

const router = express.Router();

router.get('/',authenticateToken,checkIsAdmin,getBids)
router.post('/',authenticateToken,placeBid)
router.delete('/:id',authenticateToken,checkIsAdmin,deleteBid)

export default router;