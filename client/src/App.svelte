<script>
    import { Router, Route } from "svelte-routing";
    import Login from "./pages/Login.svelte";
    import Register from "./pages/Register.svelte";
    import Home from "./pages/Home.svelte";
    import Profile from "./pages/Profile.svelte";
    import Bid from "./pages/Bid.svelte";
    import Books from "./pages/Books.svelte";
    import Users from "./pages/Users.svelte";
    import Bidding from "./pages/Bidding.svelte";

</script>

<Router>
    <Route path="/" component={Home} />
    <Route path="/login" component={Login} />
    <Route path="/register" component={Register} />
    <Route path="/profile" component={Profile} />
    <Route path="/books" component={Books} />
    <Route path="/bid" component={Bid} />
    <Route path="/users" component={Users} />
    <Route path="/bidding" component={Bidding} />
</Router>
