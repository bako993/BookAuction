<script>

    import store from "../stores/store.js";
    import Header from "../components/Header.svelte";
    import Footer from "../components/Footer.svelte";


</script>

<Header />

<div class="profile">
    <div class="profile-header">
        <h1>{$store.user.name}</h1>
        <p>ID: {$store.user.id}</p>
        <p>Email: {$store.user.email}</p>
        <p>Admin: {$store.user.isAdmin ? 'Yes' : 'No'}</p>
    </div>
    <div class="profile-bidding-history">
        <h2>Bidding History</h2>
        <ul>

            {#each $store.user.bidding as book}
                <li>
                    <strong>{book.bookName}</strong> by {book.authorName}<br>
                    Start Price: {book.price} <br>
                </li>
            {/each}


        </ul>
        <p>Total number of books I bid on: {$store.user.bidding.length}</p>
    </div>
    <button class="checkout-button">Checkout</button>
</div>






<Footer />
<style>
    .profile {
        display: flex;
        flex-direction: column;
        align-items: center;
    }
    .profile-header {
        width: 50%;
        margin: 1rem 0;
        text-align: center;
        color: #2d545e;
    }
    .profile-header h1 {
        margin: 0;
        font-size: 2.5rem;
    }
    .profile-header h1:hover {
        color: #c89666;
    }
    .profile-header {
        margin: 0.5rem 0;
        font-size: 1.5rem;
    }
    .profile-header :hover {
        color: #c89666;
    }
    .profile-bidding-history {
        width: 80%;
        margin: 1rem 0;
        color: #2d545e;
    }
    .profile-bidding-history :hover {
        color: #c89666;
    }
    .profile-bidding-history h2 {
        margin: 0;
        font-size: 1.5rem;
    }
    .profile-bidding-history ul {
        list-style: none;
        padding: 0;
    }
    .profile-bidding-history li {
        margin: 0.5rem 0;
        font-size: 1.25rem;
    }
    .profile-bidding-history li strong {
        font-weight: bold;
    }
    .checkout-button {
        display: inline-block;
        padding: 0.5rem 1rem;
        border: none;
        border-radius: 0.25rem;
        background-color: #c89666;
        color: #fff;
        font-size: 1.25rem;
        cursor: pointer;
    }

</style>
