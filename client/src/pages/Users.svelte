<script>
    import { onMount } from 'svelte';
    import { get } from 'svelte/store';
    import store from '../stores/store.js';
    import Header from "../components/Header.svelte";
    import Footer from "../components/Footer.svelte";

    let users = [];
    let currentUser = {};

    onMount(async () => {

        const response = await fetch('http://localhost:5000/users', {
            headers: {
                'Authorization': `Bearer ${get(store).token}`
            }
        });
        users = await response.json();
        currentUser = get(store).user;
        console.log(currentUser)
    });

    function deleteUser(id) {
            fetch(`http://localhost:5000/users/${id}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${get(store).token}`
                }
            }).then(() => {

                users = users.filter(user => user.id !== id);
            });
    }
</script>

<Header />
<table>
    <tr>
        <th>User ID</th>
        <th>Name</th>
        <th>Email</th>
        <th>Hashed Password</th>
        <th>Is Admin</th>
        <th>Number of Bids</th>
        <th>Delete User</th>
    </tr>
    {#each users as user}

        <tr>
            <td>{user.id}</td>
            <td>{user.name}</td>
            <td>{user.email}</td>
            <td>{user.password}</td>
            <td>{user.isAdmin ? 'Yes' : 'No'}</td>
            <td>{user.bidding.length}</td>
            <td>
                <button on:click={() => deleteUser(user.id)}>Delete</button>
            </td>
        </tr>
    {/each}
</table>
<Footer />


<style>
    table {
        border-collapse: collapse;
    }

    th, td {
        border: 1px solid black;
        padding: 8px;
    }

    th {
        background-color: lightgray;
    }

    tr:nth-child(odd) {
        background-color: lightblue;
    }

    tr:nth-child(even) {
        background-color: white;
    }
</style>
