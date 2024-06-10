<script>
    import {onMount} from "svelte";
    import store from "../stores/store.js";
    import Header from "../components/Header.svelte";
    import Footer from "../components/Footer.svelte";
    import {get} from "svelte/store";

    let bids = [];

    onMount(async () => {
        try {
            const res = await fetch('http://localhost:5000/bids', {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${get(store).token}`
                }
            });
            bids = await res.json();
        }catch (err){
            console.log(err)
        }

    })

    function deleteBid(id) {
        fetch(`http://localhost:5000/bids/${id}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${get(store).token}`
            }
        }).then(()=> {
            bids = bids.filter(bid => bid.id !== id);
        });
    }

</script>


<Header />
<table>
    <tr>
        <th>ID</th>
        <th>User ID</th>
        <th>Username</th>
        <th>Book ID</th>
        <th>Amount</th>
        <th>Date</th>
        <th>Action</th>
    </tr>
    {#each bids as bid}
    <tr>
        <td>{bid.id}</td>
        <td>{bid.userid}</td>
        <td>{bid.user}</td>
        <td>{bid.bookId}</td>
        <td>{bid.amount}</td>
        <td>{bid.date}</td>
        <td><button on:click={() => deleteBid(bid.id)}>Delete</button></td>
    </tr>
        {/each}
</table>

<Footer />
<style>
    table {
        width: 100%;
        border-collapse: collapse;
    }

    td, th {
        border: 1px solid #dddddd;
        text-align: left;
        padding: 8px;
    }

    tr:nth-child(even) {
        background-color: #dddddd;
    }
</style>

