import bidData from '../data/bids.js';
import bookData from '../data/books.js';
import userData from '../data/users.js';

import {findHighestId, isIdNumeric} from "../helpers/id_info.js";
import httpStatus from "http-status-codes";

let books = bookData;
let bids = bidData;
let users = userData;

export function getBids(req, res) {
    return res.json(bids);
}
export function placeBid(req, res) {
    const {userid, user, bookId, amount} = req.body;

    const findUser = users.find(u => u.id === userid);
    if (!findUser) {
        return res.status(httpStatus.BAD_REQUEST).json({
            message: `You can not place a bid with a non existing ID`
        });
    }
    const book = books.find(b => b.id === bookId);
    if (!book) {
        return res.status(httpStatus.BAD_REQUEST).json({
            message: `You can not place a bid on a book that does not exist`
        });
    }

    if (userid && user && bookId && amount) {
        const book = books.find(b => b.id === bookId);
        const bookIndex = books.indexOf(book);

        const findUser = users.find(u => u.id === userid);
        const userIndex = users.indexOf(findUser);

        if (book.price < amount) {
            if (book.highestBid < amount || book.highestBid === undefined) {
                const bid = {
                    id: findHighestId(bids) + 1,
                    userid: userid,
                    user: user,
                    bookId: bookId,
                    amount: amount,
                    date: new Date().toISOString().slice(0,10)
                };
                bids.push(bid);
                books[bookIndex].offers.unshift(bid);
                books[bookIndex].highestBid = amount;

                users[userIndex].bidding.unshift(bid);

                res.status(httpStatus.OK).json(bid);
            } else {
                res.status(httpStatus.FORBIDDEN).json({
                    message: `Your bid is lower than the highest bid for this auction.`
                });
            }
        } else {
            res.status(httpStatus.FORBIDDEN).json({
                message: `Your bid is lower than the start price for this auction.`
            });
        }
    }else {
        res.status(httpStatus.BAD_REQUEST).json({
            message: `All fields need to be filled to place a bid.`
        });
    }

}
export function deleteBid(req, res) {

    if (!isIdNumeric(parseInt(req.params.id))) {
        return res.status(httpStatus.BAD_REQUEST).send('Id must be numeric')
    }

    const { id } = req.params;
    const bid = bids.find(bid => bid.id === parseInt(id));

    if (bid) {
        bids.splice(bids.indexOf(bid),1);

        const book = books.find(book => book.offers.some(b => b.id === bid.id));
        const bookIndex = books.indexOf(book);
        const bookOffers = books[bookIndex].offers
        bookOffers.splice(bookOffers.indexOf(bid),1);


        const user = users.find(u => u.bidding.some(user => user.id === bid.id));
        const userIndex = users.indexOf(user);
        const userBidding = users[userIndex].bidding
        userBidding.splice(userBidding.indexOf(bid),1);


        if (bookOffers.length > 0) {
            books[bookIndex].highestBid = Math.max.apply(Math,bookOffers.map(function (o){return o.amount;}));
        }else {
            books[bookIndex].highestBid = undefined;
        }

        res.status(httpStatus.OK).json({
            message: `Bid with ID ${req.params.id} has been deleted Successfully.`,
            bids,
        });
    }else {
        res.status(httpStatus.NOT_FOUND).send(`Bid with ID ${req.params.id} does not exist.`)
    }
}
