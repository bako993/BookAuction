<script>
    import { navigate } from "svelte-routing";
    import Header from "../components/Header.svelte";
    import Footer from "../components/Footer.svelte";
    import store from "../stores/store.js";


    let email;
    let password;
    let error;
    let message;
    let timeout;


    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await fetch('http://localhost:5000/users/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email: email,
                    password: password
                })
            });
            if (!res.ok) {
                throw new Error('Invalid email or password');
            }
            const {accessToken, user} = await res.json();
            $store.token = accessToken;
            $store.user = user;

            message = "🔓 Logged in successfully!";
            timeout = setTimeout(() => {
                message = null;
                navigate("/profile");
            }, 2000);

        } catch (err) {
            error = err.message;
            setTimeout(() => {
                error = null;
            }, 2000);
        }
    }
</script>

<Header />
<section>

    <form on:submit|preventDefault={handleSubmit}>
        <h1>👤</h1>

        <label for="email">Email:</label>
        <input type="email" id="email" name="email" placeholder="name@example.com" bind:value="{email}" required>

        <label for="password">Password:</label>
        <input type="password" id="password" name="password" placeholder="password" bind:value="{password}" required>


        <button type="submit">Log in 🔒</button>
        {#if message}
            <p class="message">{message}</p>
        {/if}
        {#if error}
            <p class="error">{error}</p>
        {/if}
        <p class="member">Not a member? <a class="register" href="/register">Register here</a></p>

    </form>



</section>
<Footer />

<style>
    section {
        height: 100vh;
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;

        background: #c89666;
    }
    form {
        background: #fff;
        padding: 50px;
        width: 250px;
        height: 400px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;

        box-shadow: 0px 20px 14px 8px #2d545e;
    }
    label {
        margin: 10px 0;
        align-self: flex-start;
        font-weight: 500;
    }
    input {
        border: none;
        border-bottom: 1px solid #ccc;
        margin-bottom: 20px;
        transition: all 300ms ease-in-out;
        width: 100%;
    }
    input:focus {
        outline: 0;
        border-bottom: 1px solid #666;
    }
    button {
        margin-top: 20px;

        background: #2d545e;
        color: white;
        padding: 10px 0;
        width: 200px;
        border-radius: 25px;
        text-transform: uppercase;
        font-weight: bold;
        cursor: pointer;
        transition: all 300ms ease-in-out;
    }
    button:hover {
        transform: translateY(-2.5px);

        box-shadow: 0px 1px 10px 0px #2d545e;
    }
    h1 {
        margin: 10px 20px 30px 20px;
        font-size: 40px;
    }
    .member{
        text-align: center;
        padding: 8px;
    }
    .register {
        text-decoration: none;
        color: #2d545e;
        font-weight: 500;
    }
    .error {
        color: red;
    }
</style>


