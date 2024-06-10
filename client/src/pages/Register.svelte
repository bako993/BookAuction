
<script>
    import { navigate } from 'svelte-routing';
    import Header from "../components/Header.svelte";
    import Footer from "../components/Footer.svelte";
    import store from "../stores/store.js";

    let name;
    let email;
    let password;
    let confirmPassword;
    let error;
    let message;
    let timeout;

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            error = 'Passwords do not match';
            timeout = setTimeout(() => {
              error = null;
            },2000);
            message = null;
            return;
        }
        try {
            const res = await fetch('http://localhost:5000/users/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    name: name,
                    email: email,
                    password: password
                })
            });
            if (!res.ok) {
                const data = await res.text();
                if (res.status === 400) {
                    if (data.includes('Email is already taken')) {
                        error = 'Email already taken';
                    } else {
                        error = 'Invalid Email or Password';
                    }
                    timeout = setTimeout(() => {
                        error = null;
                    }, 2000);
                    message = null;
                }

            } else {
                const {accessToken, user} = await res.json();
                $store.token = accessToken;
                $store.user = user;

                message = "Successfully Registered";
                timeout = setTimeout(() => {
                    message = null;
                    navigate('/');
                },2000);
            }
        } catch (err) {
            error = err.message;
            timeout = setTimeout(() => {
                error = null;
            }, 2000);
            message = null;
        }
    }
</script>

<Header />
<section>
    <form on:submit|preventDefault={handleSubmit}>
        <h1>👤</h1>

        <label for="username">Username</label>
        <input id="username" name="username" placeholder="username" bind:value="{name}" required>

        <label for="email">Email</label>
        <input id="email" name="email" placeholder="name@example.com" bind:value="{email}" required>

        <label for="password">Password</label>
        <input id="password" name="password" type="password" placeholder="password" bind:value="{password}" required>

        <label for="confirm-password">Confirm-password</label>
        <input id="confirm-password" name="confirm-password" type="password" placeholder="password" bind:value="{confirmPassword}" required>



        <button type="submit">Register </button>
        {#if message}
            <p class="message">{message}</p>

        {/if}
        {#if error}
            <p class="error">{error}</p>
        {/if}
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
   .error {
       color: red;
   }

</style>


