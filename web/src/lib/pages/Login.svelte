<script>
    import {auth} from '../../stores'
    let username = ""
    let password = ""
    let error = false

    const submit = () => {
      fetch('/api/auth/login', {
            method: 'POST',
            body: JSON.stringify({
                username: username,
                password: password
            }),
            headers: {
                'Content-Type': 'application/json'
            }
          }).then((res) => res.json())
            .then(res => {
              localStorage.setItem('auth', res.access_token);
              auth.set(localStorage.getItem('auth'));              
            })
            .catch(() => error = true)
      }

</script>

<div class="w-full h-full">
  <form on:submit|preventDefault={submit} class="mx-auto container px-4">
    <div class="mb-6">
      <label for="username" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Username</label>
      <input type="text" bind:value={username} id="username" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="john.doe" required>
    </div> 
    <div class="mb-6">
      <label for="password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Password</label>
      <input type="password" bind:value={password} id="password" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="•••••••••" required>
    </div>
    <div>
      <button type="submit" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Login</button>
      <p hidden={!error} class="mt-2 text-sm text-red-600 dark:text-red-500">Benutzername oder Passwort falsch!</p>
    </div>
  </form>
</div>

