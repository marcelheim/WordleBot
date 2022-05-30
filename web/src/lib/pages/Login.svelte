<script>
    import {auth} from '../../stores'
    import {navigate} from 'svelte-routing'

    let username = ""
    let password = ""

    const submit = async () => {
        let res = await fetch('/api/auth/login', {
            method: 'POST',
            body: JSON.stringify({
                username: username,
                password: password
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        auth.set((await res.json()).access_token)
        console.log(auth)
        if($auth) navigate('/', {replace: true})
    }
</script>

<form on:submit|preventDefault={submit}>
  <div class="mb-4">
    <input bind:value={username} type="text" placeholder="Benutzername"/>
  </div>
  <div class="mb-4">
    <input bind:value={password} type="password" placeholder="Passwort"/>
  </div>
  <div>
    <button type="submit">Anmelden</button>
  </div>
</form>