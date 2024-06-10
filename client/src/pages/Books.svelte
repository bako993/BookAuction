<script>
    import {onMount} from "svelte";
    import store from "../stores/store.js";
    import Header from "../components/Header.svelte";
    import Footer from "../components/Footer.svelte";
    import {get} from "svelte/store";

    let books = [];
    let showAddBookForm = false;
    let newBook = {
        bookName: '',
        authorName: '',
        price: 0,
        highestBid: 0,
        startDate: '',
        endDate: '',
    };
    let editingBookId = null;

    function toggleAddBookForm() {
        showAddBookForm = !showAddBookForm;
    }

    onMount(async () => {
        const response = await fetch('http://localhost:5000/books', {
            headers: {
                'Content-Type': 'application/json'
            }
        });
        books = await response.json();
    });
    function deleteBook(id) {
        fetch(`http://localhost:5000/books/${id}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${get(store).token}`
            }
        }).then(() => {
            books = books.filter(book => book.id !== id);
        });
    }
    async function editBook(book) {
        try {
            const response = await fetch(`http://localhost:5000/books/${book.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${get(store).token}`
                },
                body: JSON.stringify(book),
            });
            return await response.json();
        } catch (error) {
            console.error(error);
            throw error;
        }
    }
    async function sendBookDataToServer (book) {
        try {
            const response = await fetch('http://localhost:5000/books', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${get(store).token}`
                },
                body: JSON.stringify(book),
            });
            return await response.json();
        } catch (error) {
            console.error(error);
            throw error;
        }
    }
    async function addBook() {
        const book = await sendBookDataToServer(newBook);
        books = [...books, book];
        newBook = {
            bookName: '',
            authorName: '',
            price: 0,
            highestBid: 0,
            startDate: '',
            endDate: '',
        };
        toggleAddBookForm();
    }
</script>

<Header />
<table>
    <tr>
        <th>ID</th>
        <th>Book Name</th>
        <th>Author Name</th>
        <th>Price</th>
        <th>Highest Bid</th>
        <th>Start Date</th>
        <th>End Date</th>
        <th></th>
    </tr>
    {#each books as book}
        {#if editingBookId === book.id}
            <tr>
                <td>{book.id}</td>
                <td>
                    <input type="text" bind:value={book.bookName} />
                </td>
                <td>
                    <input type="text" bind:value={book.authorName} />
                </td>
                <td>
                    <input type="text" bind:value={book.price} />
                </td>
                <td>
                    <input type="text" bind:value={book.highestBid} />
                </td>
                <td>
                    <input type="text" bind:value={book.startDate} />
                </td>
                <td>
                    <input type="text" bind:value={book.endDate} />
                </td>
                <td>
                    <button on:click={async () => {await editBook(book) ;editingBookId = null;}}>Save</button>
                    <button on:click={() => editingBookId = null}>Cancel</button>
                </td>
            </tr>
        {:else}
            <tr>
                <td>{book.id}</td>
                <td>{book.bookName}</td>
                <td>{book.authorName}</td>
                <td>{book.price}</td>
                <td>{book.highestBid}</td>
                <td>{book.startDate}</td>
                <td>{book.endDate}</td>
                <td>
                    <button on:click={() => editingBookId = book.id}>Edit</button>
                    <button on:click={() => deleteBook(book.id)}>Delete</button>
                </td>
            </tr>
        {/if}
    {/each}
</table>
<br>

{#if showAddBookForm}
    <form on:submit|preventDefault={addBook}>
        <label for="book-name">Book Name:</label>
        <input type="text" id="book-name" bind:value={newBook.bookName} />
        <br />
        <label for="author-name">Author Name:</label>
        <input type="text" id="author-name" bind:value={newBook.authorName} />
        <br />
        <label for="price-price">Price:</label>
        <input type="text" id="price-price" bind:value={newBook.price} />
        <br />

        <button type="submit">Save</button>
        <button type="button" on:click={toggleAddBookForm}>Cancel</button>
    </form>
{:else}
    <br>
    <button class="book-adder" on:click={toggleAddBookForm}>Add Book</button>
{/if}

<Footer />

<style>

    table {
        border-collapse: collapse;
        width: 100%;
    }

    th,
    td {
        border: 1px solid #ddd;
        padding: 8px;
    }

    tr:nth-child(even) {
        background-color: white;
    }

    tr:hover {
        color: #c89666;
    }

    th {
        background-color: #c89666;
        color: #2d545e;
    }

    form {
        display: flex;
        flex-direction: column;
        width: 400px;
        padding: 20px;
        border: 1px solid #ccc;
        border-radius: 4px;
        margin: auto;
    }

    label {
        font-weight: bolder;
    }

    input[type="text"]  {
        border: 1px solid #ccc;
        border-radius: 4px;
        padding: 8px;
    }

    button[type="submit"] {
        background-color: #2d545e;
        color: white;
        border: none;
        border-radius: 4px;
        padding: 8px;
        font-size: 14px;
        cursor: pointer;
    }
    button[type="submit"]:hover {
        background-color: #3c7a89;
        color: #f1f1f1;
        transition: 0.3s;
    }

    button[type="button"] {
        background-color: #c89666;
        color: white;
        border: none;
        border-radius: 4px;
        padding: 8px;
        font-size: 14px;
        cursor: pointer;
    }
    button[type="button"]:hover {
        background-color: #e6b899;
        color: #f1f1f1;
        transition: 0.3s;
    }
    .book-adder {
        background-color: #3c7a89;
        color: white;
        display: block;
        margin: auto;
        padding: 15px 30px;
        font-size: 18px;
        border: none;
        border-radius: 20%;
        cursor: pointer;

    }
    .book-adder:hover {
        background-color: #c89666;
        color: #f1f1f1;
        transition: 0.3s;

    }

</style>
