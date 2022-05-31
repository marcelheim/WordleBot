<script lang="ts">
	import browser from "webextension-polyfill";
	let url = "http://localhost:7777/solver";
	
	const handleCommand = (command) => {
		browser.tabs.query({
			currentWindow: true,
			active: true
		}).then(tabs => {
			for (let tab of tabs) {
				browser.tabs.sendMessage(tab.id, command)
			}
		})
	}
	const readConfig = async () => {
		let config: Config = (await browser.storage.local.get('config')).config
		if(config) url = config.url || url
	}
	const writeConfig = async (config: Config) => await browser.storage.local.set({ config: config })
	const updateConfig = async (config: Config) => {
		await writeConfig(config)
		handleCommand({ command: 'refreshConfig' })
	}
	
	readConfig()
</script>

<main>
	<input bind:value={url}>
	<button on:click={x => updateConfig({ url: url })}>
		Save Config
	</button>
	<button on:click={x => handleCommand({command: 'guessWord'})}>
		Guess
	</button>
</main>

<style>
	main {
		text-align: center;
		padding: 1em;
		max-width: 240px;
		margin: 0 auto;
	}

	h1 {
		color: #ff3e00;
		text-transform: uppercase;
		font-size: 4em;
		font-weight: 100;
	}
</style>