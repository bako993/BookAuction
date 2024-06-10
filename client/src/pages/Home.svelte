<script>
    import { onMount } from 'svelte';
    import { navigate } from 'svelte-routing';
    import Footer from "../components/Footer.svelte";
    import Header from "../components/Header.svelte";
    import store from "../stores/store.js";
    import bookStore from "../stores/bookStore.js";

    let books = [];
    let showError = false;
    let timeout;
    let filBooks = [];
    let filter = '';
    let searchTerm = '';

    let minPrice = 0;
    let maxPrice = 20000;
    let showPriceRanges = false;

    const fetchBooks = async () => {
        try {
            const res = await fetch('http://localhost:5000/books');
            books = await res.json();
            filBooks = books;
            console.log(filBooks);
        } catch (err) {
            console.error(err);
        }
    }
    const bidOnBook = (bookId) => {
        if ($store.token){
            navigate('/bid');
            $bookStore.bookId = bookId;
        }else {
            showError = true;
            timeout = setTimeout(() => {
                showError = false;
            },2000);
        }
    }
    function filteringBook(books, searchTerm, filter, minPrice, maxPrice) {
        return books.filter(book => {
            return book.bookName.toLowerCase().includes(searchTerm.toLowerCase()) &&
                book.authorName.toLowerCase().includes(filter.toLowerCase()) &&
                (book.price >= minPrice && book.price <= maxPrice);
        });
    }
    $: filBooks = filteringBook(books, searchTerm, filter, minPrice, maxPrice);
    function togglePriceRanges() {
        showPriceRanges = !showPriceRanges;
    }
    function handlePriceRange(event) {
        minPrice = event.target.dataset.min;
        maxPrice = event.target.dataset.max;
        showPriceRanges = false;

    }
    function resetFilters() {
        searchTerm = '';
        filter = '';
        minPrice = 0;
        maxPrice = 1000;
    }
    onMount(fetchBooks);

</script>

<body>
<Header />

    <div>
        <input class="search" type="text" bind:value={searchTerm} placeholder="Filter by Book" />
        <input type="text" bind:value={filter} placeholder="Filter by Author..." />
        <button class="filter-reset" on:click={resetFilters}>Cancel</button>

        <button class="price-filter" on:click={togglePriceRanges}>Filter by price</button>
    </div>

{#if showPriceRanges}
    <div class="price-range-filter">
        <button data-min="0" data-max="50" on:click={handlePriceRange}>$0 - $50</button>
        <button data-min="51" data-max="100" on:click={handlePriceRange}>$51 - $100</button>
        <button data-min="101" data-max="200" on:click={handlePriceRange}>$101 - $200</button>
        <button data-min="201" data-max="500" on:click={handlePriceRange}>$201 - $500</button>
    </div>
{/if}


<main>
    <h1>Welcome to Happy Reader and find your treasure here</h1>
    <div class="book-auction">
        {#each filBooks as book}
            <div class="book">
                <div class="book-details">
                    <span class="id">{book.id}</span>
                    <span class="book-name">{book.bookName}</span>
                    <span class="author-name">{book.authorName}</span>
                </div>
                <div class="auction-details">
                    <span class="current-price">Price: ${book.price}</span>
                    <span class="highest-bid">Highest bid: ${book.highestBid}</span>
                    <span class="start-date">Start date: {book.startDate}</span>
                    <span class="end-date">End date: {book.endDate}</span>
                </div>
                <button type="submit" on:click="{bidOnBook(book.id)}">Bid On It</button>

                {#if showError}
                    <p>You must be logged in to bid on a book.</p>
                    {/if}
            </div>
        {/each}

    </div>
</main>

<Footer />
</body>

<style>

    .search {
        width: 200px;
        height: 32px;
        border: 1px solid #ccc;
        border-radius: 5px;
        padding: 0 10px;
        font-size: 14px;
    }

    input[type="text"] {
        width: 200px;
        height: 32px;
        border: 1px solid #ccc;
        border-radius: 5px;
        padding: 0 10px;
        font-size: 14px;
        margin: 10px 0;
    }

    .price-filter, .filter-reset {
        padding: 10px 20px;
        background-color: #3c7a89;
        border: none;
        border-radius: 5px;
        color: white;
        font-size: 14px;
        cursor: pointer;
        margin: 10px 0;
    }
    .price-filter {
        margin-left: 130px;
    }


    .price-filter:hover, .filter-reset:hover {
        background-color: #cc9977;
    }

    .price-range-filter {
        display: flex;
        justify-content: center;
        margin: 20px 0;
    }

    .price-range-filter button {
        padding: 10px 20px;
        background-color: #3c7a89;
        border: none;
        border-radius: 5px;
        color: white;
        font-size: 14px;
        cursor: pointer;
        margin: 0 10px;
    }

    .price-range-filter button:hover {
        background-color: #cc9977;
    }

    main {
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    h1 {
        margin: 0;
        padding: 20px;
        font-size: 24px;
        font-weight: bold;
        text-align: center;
        color: #2d545e;
    }

    .book-auction {
        display: flex;
        flex-wrap: wrap;
        justify-content: space-evenly;
        margin: 20px;
    }
    .book-auction :hover{
        border-color: #c89666;
        box-shadow: 20px 2px 5px #c89666;
    }

    .book {
        display: flex;
        flex-direction: column;
        align-items: center;
        width: 300px;
        height: 400px;
        margin: 10px;
        border: 4px solid #3c7a89;
        border-radius: 5px;
        box-shadow: 2px 2px 5px #2d545e;
    }


    .book-details {
        display: flex;
        flex-direction: column;
        align-items: center;
        margin: 20px;
    }

    .book-name {
        font-size: 18px;
        font-weight: bold;
        margin: 10px 0;
    }

    .author-name {
        font-style: italic;
        font-size: 14px;
        color: #555;
    }

    .auction-details {
        display: flex;
        flex-direction: column;
        align-items: center;
        margin: 20px;
    }

    .current-price, .highest-bid {
        font-size: 14px;
        margin: 10px 0;
    }

    .start-date, .end-date {
        font-size: 12px;
        color: #555;
    }

    button {
        padding: 10px 20px;
        background-color: #3c7a89;
        border: none;
        border-radius: 5px;
        color: white;
        font-size: 14px;
        cursor: pointer;
    }

    button:hover {
        background-color: #cc9977;
    }

    p {
        margin: 10px 0;
        font-size: 14px;
        color: red;
        text-align: center;
    }










</style>
