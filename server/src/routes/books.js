import express from "express";
import { getBooks, getBook, createBook, updateBookInfo, deleteBook } from "../controllers/books.js";
import { authenticateToken} from "../helpers/authenticate.js";
import { checkIsAdmin} from "../helpers/checkIsAdmin.js";
const router = express.Router();


router.get('/',getBooks);
router.get('/:id',getBook);
router.post('/',authenticateToken,checkIsAdmin,createBook);
router.put('/:id',authenticateToken,checkIsAdmin,updateBookInfo);
router.delete('/:id',authenticateToken,checkIsAdmin,deleteBook);

export default router;