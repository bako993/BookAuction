<script>
    import store from "../stores/store.js";
    import Header from "../components/Header.svelte";
    import Footer from "../components/Footer.svelte";
    import bookStore from "../stores/bookStore.js";

    let userid = $store.user.id;
    let user = $store.user.name;
    let bookId = $bookStore.bookId;
    let amount;

    let error;
    let message;
    let timeout;


    const addBid = async () => {
        const newBid = {userid, user, bookId, amount};
        try {
            const response = await fetch('http://localhost:5000/bids', {
                method: 'POST',
                body: JSON.stringify(newBid),
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${$store.token}`
                },
            });
            if (response.ok) {
                const data = await response.json();
                message = 'Your bid has been added successfully';
                timeout = setTimeout(() => {
                    message = null;
                },3000);

            } else {
                const errorMessage = await response.json();
                message = errorMessage.message;
                timeout = setTimeout(() => {
                    message = null;
                },3000);
            }
        }catch (err) {
            message = err.message;
            timeout = setTimeout(() => {
                message = null;
            },3000);
            message = null;
        }
    }


</script>

<Header />

<div class="bid-card">
    {#if message}
        <p>{message}</p>
    {/if}
    <h2>Place a Bid</h2>
    <form on:submit|preventDefault={addBid}>
        <label for="userid">User ID:</label><br>
        <input type="text" id="userid" name="userid"  bind:value="{userid}" required><br>

        <label for="user">Username:</label><br>
        <input type="text" id="user" name="user" bind:value="{user}" required><br>

        <label for="bookId">Book ID:</label><br>
        <input type="text" id="bookId" name="bookId" bind:value="{bookId}" required><br>

        <label for="amount">Amount:</label><br>
        <input type="text" id="amount" name="amount" bind:value="{amount}" required><br><br>

        <button type="submit">Submit</button>
    </form>
</div>

<Footer />


<style>
    table {
        width: 80%;
    }

    td {
        width: 20%;
    }

    .bid-card {
        width: 50%;
        margin: 0 auto;
        border: 1px solid #ccc;
        border-radius: 5px;
        box-shadow: 2px 2px 5px #c89666;
        padding: 20px;
    }
    .bid-card h2 {
        text-align: center;
        margin-bottom: 20px;
    }
    .bid-card label {
        display: block;
        margin-bottom: 10px;
        font-size: 16px;
        font-weight: 600;
    }
    .bid-card input[type="text"] {
        width: 100%;
        padding: 12px 20px;
        margin: 8px 0;
        box-sizing: border-box;
        border: 1px solid #ccc;
        border-radius: 4px;
        background-color: #f8f8f8;
    }
    .bid-card button[type="submit"] {
        width: 100%;
        background-color: #c89666;
        color: white;
        padding: 14px 20px;
        margin: 8px 0;
        border: none;
        border-radius: 4px;
        cursor: pointer;
    }
</style>














