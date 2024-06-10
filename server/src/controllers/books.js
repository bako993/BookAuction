import bookData from '../data/books.js';
import {isIdNumeric, findHighestId} from "../helpers/id_info.js";
import httpStatus from "http-status-codes";

let books = bookData;


export function getBooks (req, res) {
    return res.json(books);
}
export function getBook (req, res) {
    const found = books.some(user => user.id === parseInt(req.params.id))

    if (!isIdNumeric(parseInt(req.params.id))) {
        return res.status(httpStatus.BAD_REQUEST).send('Id must be numeric')
    }

    if (found) {
        res.json(books.filter(user => user.id === parseInt(req.params.id)))
    }else {
        res.status(httpStatus.NOT_FOUND).send(`Book with the id ${req.params.id} was not found in the list`)
    }
}
export function createBook (req, res) {
    const newBook = {
        id: findHighestId(books) +1,
        bookName: req.body.bookName,
        authorName: req.body.authorName,
        price: req.body.price,
        highestBid: '',
        startDate: new Date().toLocaleDateString() + ' ' + new Date().toLocaleTimeString(),
        endDate: new Date(new Date().getTime() + 24 * 60 * 60 * 1000).toLocaleDateString() + ' ' + new Date(new Date().getTime() + 24 * 60 * 60 * 1000).toLocaleTimeString(),
        offers: []
    }
    if (!newBook.bookName) {
        return res.status(httpStatus.BAD_REQUEST).send('Required information is missing')
    }
    books.push(newBook);
    res.status(httpStatus.CREATED).json(books);
}
export function updateBookInfo (req, res) {
    const found = books.some(book => book.id === parseInt(req.params.id))
    if (!isIdNumeric(parseInt(req.params.id))) {
        return res.status(httpStatus.BAD_REQUEST).send('Id must be numeric')
    }
    if (found) {
        const updateBook = req.body;
        books.forEach(book => {
            if (book.id === parseInt(req.params.id)) {

                book.bookName = updateBook.bookName ? updateBook.bookName: book.bookName
                book.authorName = updateBook.authorName ? updateBook.authorName: book.authorName
                book.price = updateBook.price ? updateBook.price: book.price
                book.startDate = updateBook.startDate ? updateBook.startDate: book.startDate
                book.endDate = updateBook.endDate ? updateBook.endDate: book.endDate

                if (updateBook.bookName || updateBook.authorName || updateBook.price) {
                    book.startDate = new Date().toLocaleDateString('en-US', { year: 'numeric', month: '2-digit', day: '2-digit' }) + ' ' + new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit' });
                    book.endDate = new Date(new Date().getTime() + 24 * 60 * 60 * 1000).toLocaleDateString('en-US', { year: 'numeric', month: '2-digit', day: '2-digit' }) + ' ' + new Date(new Date().getTime() + 24 * 60 * 60 * 1000).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit' });
                }

                res.status(httpStatus.OK).json({message: 'Book has been updated', book})
            }
        })
    } else {
        res.status(httpStatus.NOT_FOUND).send(`Book with id ${req.params.id} does not exist`)
    }
}
export function deleteBook (req, res) {

    if (!isIdNumeric(parseInt(req.params.id))) {
        return res.status(httpStatus.BAD_REQUEST).send('Id must be numeric')
    }

    const findBook = books.some(book => book.id === parseInt(req.params.id));

    if (findBook) {
        books = books.filter(book => book.id !== parseInt(req.params.id));

        res.status(httpStatus.OK).json({
            msg: `Book with id ${req.params.id} has been deleted`,
            books,
        });
    }else {
        res.status(httpStatus.NOT_FOUND).send(`Book with id ${req.params.id} does not exist`)
    }
}

