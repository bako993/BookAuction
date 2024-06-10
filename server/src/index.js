import express from 'express';
import userRoutes from "../src/routes/users.js";
import bookRoutes from "../src/routes/books.js";
import bidRoutes from "../src/routes/bids.js";
import cors from "cors";


const app = express();
const port =5000;

app.use(express.json());
app.use(express.urlencoded({extended: true}))
app.use(cors());



app.use('/users',userRoutes);
app.use('/books',bookRoutes);
app.use('/bids',bidRoutes);




app.listen(port, () => {
  console.log(`Server is running on port ${port}`)
})