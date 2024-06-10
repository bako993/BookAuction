import bookData from '../data/books.js';
let books = bookData;

export default [
    {
        id: 1,
        name: "amir",
        email: "amir@gmail.com",
        password: "$2b$10$qbH4FIybEXm/SHj8Fimt.eGguvSMqmgUF0PB5FA48FzU1FysvZ3.q",  // password: 123456aA
        isAdmin: false,
        bidding: [
            books[0],
            books[1],
            books[2]
        ]
    },
    {
        id: 2,
        name: "bako",
        email: "bako@gmail.com",
        password: "$2b$10$d4WKTnwaYQgeQDjDYsGjAufL5DsKP9h2hvf2UvEaSXJjIpN0LPIZ.",  // password: 123456bB
        isAdmin: true,
        bidding: [
            books[1],
            books[2]
        ]
    },
];

