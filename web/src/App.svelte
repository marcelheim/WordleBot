<script>
import {Router, Link, Route, navigate} from "svelte-routing"  
import Login from "./lib/pages/Login.svelte"
import {auth} from './stores'
if($auth == undefined) navigate('/login', {replace: true})
</script>

<Router url="">
  <Route path="login" component="{Login}"/>
</Router>