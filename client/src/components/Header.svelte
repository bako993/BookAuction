<script>
    import {navigate} from "svelte-routing";
    import store from "../stores/store.js";

    const handleUsersClick = () => {
        if ($store.user.isAdmin) {
            navigate('/users');
        }else {
            alert("You must be an admin to access the admin page");
        }
    };
    const handleProfileClick = () => {
        if ($store.token !== "") {
            navigate('/profile');
        }else {
            navigate('/login');
        }
    };
    const handleHomeClick = () => {
        navigate('/');
    };
    const handleBooksClick = () => {
        if ($store.user.isAdmin) {
            navigate('/books');
        } else {
            alert("You must be an admin to access the admin page");
        }
    };
    const handleLogoutClick = () => {
        $store.token = "";
        $store.user = null;
        navigate('/');
    };
    const handleBiddingClick = () => {
        if ($store.user.isAdmin) {
            navigate('/bidding');
        } else {
            alert("You must be an admin to access the admin page");
        }
    }

</script>
<header>
    <h1>Happy Reader</h1>
    <button  class="container" on:click="{handleHomeClick}">Home</button>
    {#if $store.token}
        <button class="admin-button" on:click="{handleUsersClick}">Users</button>
        <button class="admin-button" on:click="{handleBooksClick}">Books</button>
        <button class="admin-button" on:click="{handleBiddingClick}">Bidding</button>
    {/if}
    <button  class="profile-button" on:click="{handleProfileClick}"> <img src="./src/assets/user1.webp" alt="Profile"></button>
    {#if $store.token}
        <button class="logout-button" on:click="{handleLogoutClick}">Log out</button>
    {/if}

</header>

<style>

    header {
        display: flex;
        align-items: center;
        justify-content: center;
        background-color: #3c7a89;
        color: #c89666;
        padding: 20px;
        position: relative;
    }
    .container{
        display: inline-block;
        margin-left: 10px;
        font-size: 20px;
        font-weight: bolder;
        color: #c89666;
        vertical-align: middle;
        text-decoration: none;
        border-radius: 15%;
        border: #2d545e;
    }
    .container:hover {
        box-shadow: 0 6px 8px #c89666;
        transform: translateY(-2px);
    }
    .admin-button{
        display: inline-block;
        margin-left: 10px;
        font-size: 20px;
        font-weight: bolder;
        color: #c89666;
        vertical-align: middle;
        text-decoration: none;
        border-radius: 15%;
        border: #2d545e;

    }
    .admin-button:hover {
        box-shadow: 0 6px 8px #c89666;
        transform: translateY(-2px);
    }


    .logout-button {
        position: absolute;
        top: 15px;
        right: 130px;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 20px;
        font-weight: bolder;
        color: #c89666;
        text-decoration: none;
        border-radius: 40%;
        background-color: #fff;
        box-shadow: 0 4px 6px #c89666;
        transition: all 0.3s ease;
        padding: 0 20px;
        height: 40px;
        border: #2d545e;
    }

    .logout-button:hover {

        box-shadow: 0 6px 8px #c89666;
        transform: translateY(-2px);
    }



    .profile-button {
        position: absolute;
        top: 3px;
        right: 50px;
        width: 60px;
        height: 60px;
        border-radius: 50%;
        background-color: #ffffff;
        display: flex;
        justify-content: center;
        align-items: center;
        box-shadow: 0 4px 6px #c89666;
        transition: all 0.3s ease;
        text-decoration: none;
        margin-left: 10px;
        border: #c89666;
    }
    .profile-button:hover {
        background-color: #e6b899;
        box-shadow: 0 6px 8px #c89666;
        transform: translateY(-2px);
    }
    .profile-button img {
        width: 40px;
        height: 40px;
        border-radius: 50%;
        object-fit: cover;
        border: 4px solid #fff;

    }

    header h1 {
        font-size: 32px;
        margin: 0;
        text-transform: uppercase;
        font-weight: bold;
        letter-spacing: 4px;
        font-family: Roboto;
        position: absolute;
        left: 0;
        padding-left: 10px;
    }
</style>