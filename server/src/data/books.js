import bidData from '../data/bids.js';
let bids = bidData;

export default [
    {
        "id": 1,
        "bookName": "Hadith",
        "authorName": "Bukhari",
        "price": 50,
        "highestBid": 70,
        "startDate": "1/8/2023 4:08:53 AM",
        "endDate": "1/9/2023 4:08:53 AM",
        offers: [
            bids[0]
        ]
    },
    {
        "id": 2,
        "bookName": "Harry Potter",
        "authorName": "J.K Rowling",
        "price": 60,
        "highestBid": 90,
        "startDate": "12/30/2022 4:00:00 PM",
        "endDate": "12/31/2022 4:00:00 PM",
        offers: [
            bids[1],
            bids[3]
        ]
    },
    {
        "id": 3,
        "bookName": "Life",
        "authorName": "Death",
        "price": 60,
        "highestBid": 150,
        "startDate": "1/8/2023 4:09:00 AM",
        "endDate": "1/9/2023 4:09:00 AM",
        offers: [
            bids[2],
            bids[4]
        ]
    },
    {
        "id": 4,
        "bookName": "Dutch Culture",
        "authorName": "Robert",
        "price": 20,
        "highestBid": "",
        "startDate": "1/8/2023 4:09:00 AM",
        "endDate": "1/9/2023 4:09:00 AM",
        offers: []
    },
    {
        "id": 5,
        "bookName": "The city of birds",
        "authorName": "Baxtiar Ali",
        "price": 15,
        "highestBid": "",
        "startDate": "1/8/2023 4:09:00 AM",
        "endDate": "1/9/2023 4:09:00 AM",
        offers: []
    },
];
